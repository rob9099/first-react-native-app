import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList, Text } from "react-native";
import ToDoItems from "./components/ToDoItems";
import ToDoInput from "./components/ToDoInput";
import axios from "axios";


export default function App() {
  
  useEffect(() => {
    getToDoItems();
    getInProgressItems();
    getDoneItems();
  },[]);
  

  const [toDoList, setToDoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [startButton, setStartButton] = useState(false);
  console.log(doneList)

  
  
  const addNewToDo = props => {
    axios.post('http://localhost:5000/newToDO', {toDo: props})
    .then (function (response){
      console.log(response)
      getToDoItems()
    })
    .catch (function (error){
      console.log(error)
    })
  }


  const addNewInProgress = props => {
    axios.post('http://localhost:5000/newInProgress', {inProgress: props.toDo})
    .then (function (response){
      console.log(response)
    })
    .catch (function (error){
      console.log(error)
    })
  }


  const addNewDone = props => {
    axios.post('http://localhost:5000/newDone', {done: props.inProgress})
    .then (function (response){
      console.log(response)
    })
    .catch (function (error){
      console.log(error)
    })
  }



  const getToDoItems = () => {
    axios.get('http://localhost:5000/getToDoItems')
    .then (function (response){
      setToDoList(response.data)
      console.log(response)
    })
    .catch (function (error){
      console.log(error)
    })
  }

  
  const getInProgressItems = () => {
    axios.get('http://localhost:5000/getInProgressItems')
    .then (function (response){
      setInProgressList(response.data)
      console.log(response)
    })
    .catch (function (error){
      console.log(error)
    })
  }

  const getDoneItems = () => {
    axios.get('http://localhost:5000/getDoneItems')
    .then (function (response){
      setDoneList(response.data)
      console.log(response)
    })
    .catch (function (error){
      console.log(error)
    })
  }



  /*const addToDoHandler = toDoItemProps => {
    setToDoList(currentArray => [...currentArray, {key: Math.random().toString(), value: toDoItemProps}]);
    setStartButton(false);
  };*/

  const addToDoHandler = toDoItemProps => {
    addNewToDo(toDoItemProps)
    setStartButton(false);
  };




  /*const deleteToDoItemHandler = toDoKey => {
    if(toDoList.filter((toDoItem) => toDoItem.key === toDoKey).length > 0){
      setToDoList(currentArray => {
        return currentArray.filter((toDoItem) => toDoItem.key !== toDoKey)
      })
    }else if(inProgressList.filter((toDoItem) => toDoItem.key === toDoKey).length > 0){
      setInProgressList(currentArray => {
        return currentArray.filter((toDoItem) => toDoItem.key !== toDoKey)
      })
    }else {
      setDoneList(currentArray => {
        return currentArray.filter((toDoItem) => toDoItem.key !== toDoKey)
      })
    }
  };*/


  const deleteToDoItemHandler = toDoKey => {
    axios.post('http://localhost:5000/deleteOneToDo', {_id: toDoKey})
    .then (function (response){
      console.log(response)
      getToDoItems()
      getInProgressItems();
    })
    .catch (function (error){
      console.log(error)
    })
  }


  const deleteInProgressItemHandler = toDoKey => {
    axios.post('http://localhost:5000/deleteOneInProgress', {_id: toDoKey})
    .then (function (response){
      console.log(response)
      getInProgressItems();
      getDoneItems();
    })
    .catch (function (error){
      console.log(error)
    })
  }


  const deleteDoneItemHandler = toDoKey => {
    axios.post('http://localhost:5000/deleteOneDone', {_id: toDoKey})
    .then (function (response){
      console.log(response)
      getDoneItems();
    })
    .catch (function (error){
      console.log(error)
    })
  }


  const cancelButtonHandler = () => {
    setStartButton(false);
  };


  const transferToInProgress = toDoItem => {
    addNewInProgress(toDoItem);
    deleteToDoItemHandler(toDoItem)
  }


  const transferToDone = inProgressItem => {
    addNewDone(inProgressItem);
    deleteInProgressItemHandler(inProgressItem);
  }

  /*const transferToInProgress = toDoItem => {
    setInProgressList(currentArray => [...currentArray, toDoItem]);
  }*/

  /*const transferToDone = inProgressItem => {
    setDoneList(currentArray => [...currentArray, inProgressItem]);
  }*/





  
  return (
    <View style={styles.screen}>
      <Button title='Tryck här för att lägga till!' onPress={() => setStartButton(true)}/>
      <ToDoInput visible={startButton} onAddToDoHandler={addToDoHandler} onCancel={cancelButtonHandler}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Att göra</Text>
      </View>
      <FlatList data={toDoList} keyExtractor={(item, key) => item._id} renderItem={toDoItem => <ToDoItems title={toDoItem.item} category='toDo' onDelete={deleteToDoItemHandler} onTransferToInProgress={ props => {
        transferToInProgress(props);
        }}/>}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Pågående</Text>
      </View>
      <FlatList data={inProgressList} keyExtractor={(item, key) => item._id} renderItem={inProgressItem => <ToDoItems title={inProgressItem.item} category='inProgress' onDelete={deleteInProgressItemHandler} onTransferToDone={ props => {
        transferToDone(props);
        }}/>}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Klart</Text>
      </View>
      <FlatList data={doneList} keyExtractor={(item, key) => item._id} renderItem={inProgressItem => <ToDoItems title={inProgressItem.item} category='done' onDelete={deleteDoneItemHandler}/>}/>
    </View>
  );
}




const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  titleContainer: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 80,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10
  }
});
