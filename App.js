import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList, Text, TextInput } from "react-native";
import ToDoItems from "./components/ToDoItems";
import ToDoInput from "./components/ToDoInput";
import axios from "axios";


export default function App() {
  
  useEffect(() => {
    getToDoItems();
  },[]);
  

  const [toDoList, setToDoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [addButton, setaddButton] = useState(false);
  const [searchQuery, setsearchQuery] = useState('');

  

  const getToDoItems = () => {
  
    fetch("http://192.168.1.42:5000/getToDoItems")
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        setToDoList(responseJson)
      })
      .catch(error => {
        console.log(error)
      })
  }


  
  const addNewToDo = props => {
    axios.post('http://192.168.1.42:5000/newToDOv2', {value: props})
    .then (function (response){
      console.log(response)
      getToDoItems()
    })
    .catch (function (error){
      console.log(error)
    })
  }


  const addNewInProgress = props => {
    axios.post('http://192.168.1.42:5000/newInProgress', {inProgress: props.toDo})
    .then (function (response){
      console.log(response)
    })
    .catch (function (error){
      console.log(error)
    })
  }


  const addNewDone = props => {
    axios.post('http://192.168.1.42:5000/newDone', {done: props.inProgress})
    .then (function (response){
      console.log(response)
    })
    .catch (function (error){
      console.log(error)
    })
  }


  const addToDoHandler = toDoItemProps => {
    addNewToDo(toDoItemProps)
    setaddButton(false);
  };


  const deleteToDoItemHandler = toDoKey => {
    axios.post('http://192.168.1.42:5000/deleteOneToDo', {_id: toDoKey})
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
    axios.post('http://192.168.1.42:5000/deleteOneInProgress', {_id: toDoKey})
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
    axios.post('http://192.168.1.42:5000/deleteOneDone', {_id: toDoKey})
    .then (function (response){
      console.log(response)
      getDoneItems();
    })
    .catch (function (error){
      console.log(error)
    })
  }


  const cancelButtonHandler = () => {
    setaddButton(false);
  };


  const transferToInProgressHandler = toDoItem => {
    addNewInProgress(toDoItem);
    deleteToDoItemHandler(toDoItem)
  }


  const transferToDoneHandler = inProgressItem => {
    addNewDone(inProgressItem);
    deleteInProgressItemHandler(inProgressItem);
  }


  const searchQueryHandler = inProgressItem => {
    axios.get('http://192.168.1.42:5000/search')
    .then (function (response){
      console.log(response)
      
    })
    .catch (function (error){
      console.log(error)
    })
  }





  
  return (
    <View style={styles.screen}>
      <Button title='Tryck här för att lägga till!' onPress={() => setaddButton(true)}/>
      <View style={styles.searchContainer}>
        <TextInput placeholder='sök...' style={styles.search}/>
      </View>
      <ToDoInput visible={addButton} onAddToDoHandler={addToDoHandler} onCancel={cancelButtonHandler}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Att göra</Text>
      </View>
      <FlatList data={toDoList} keyExtractor={(item, key) => item._id} renderItem={toDoItem => {
        {console.log(toDoItem.item.category)}
        if(toDoItem.item.category == 'toDo'){
          <ToDoItems title={toDoItem.item}
            onDelete={deleteToDoItemHandler}
            onTransferToInProgress={ props => {
              transferToInProgressHandler(props);
            }}
        />
        }
      }}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Pågående</Text>
      </View>
      <FlatList data={inProgressList} keyExtractor={(item, key) => item._id} renderItem={inProgressItem => <ToDoItems title={inProgressItem.item} onDelete={deleteInProgressItemHandler} onTransferToDone={ props => {
        transferToDoneHandler(props);
        }}/>}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Klart</Text>
      </View>
      <FlatList data={doneList} keyExtractor={(item, key) => item._id} renderItem={inProgressItem => <ToDoItems title={inProgressItem.item} onDelete={deleteDoneItemHandler}/>}/>
    </View>
  );
}




const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  searchContainer: {
    alignItems: "center"
  },
  search: {
    width: '60%',
    borderColor: 'red',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 5
  },
  titleContainer: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 50,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10
  }
});


  /*const getToDoItems = () => {
    axios.get('http://localhost:5000/getToDoItems')
    .then (function (response){
      setToDoList(response.data)
      console.log(response)
    })
    .catch (function (error){
      console.log(error)
    })
  }*/


    /*const getInProgressItems = () => {
    axios.get('http://192.168.1.42:5000/getInProgressItems')
    .then (function (response){
      setInProgressList(response.data)
      console.log(response)
    })
    .catch (function (error){
      console.log(error)
    })
  }*/

  /*const getDoneItems = () => {
    axios.get('http://192.168.1.42:5000/getDoneItems')
    .then (function (response){
      setDoneList(response.data)
      console.log(response)
    })
    .catch (function (error){
      console.log(error)
    })
  }*/


  /*const addToDoHandler = toDoItemProps => {
    setToDoList(currentArray => [...currentArray, {key: Math.random().toString(), value: toDoItemProps}]);
    setaddButton(false);
  };*/


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


    /*const transferToInProgressHandler = toDoItem => {
    setInProgressList(currentArray => [...currentArray, toDoItem]);
  }*/

  /*const transferToDoneHandler = inProgressItem => {
    setDoneList(currentArray => [...currentArray, inProgressItem]);
  }*/