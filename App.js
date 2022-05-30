import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList, Text, TouchableWithoutFeedback, Keyboard} from "react-native";
import ToDoItems from "./components/ToDoItems";
import ToDoInput from "./components/ToDoInput";
import Search from "./components/Search";
import axios from "axios";


export default function App() {
  
  useEffect(() => {
    setToDoList([]), setInProgressList([]), setDoneList([])
    getToDoItems();
  },[]);
  

  const [toDoList, setToDoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [addButton, setaddButton] = useState(false);

  

  const getToDoItems = () => {
  
    fetch("http://192.168.1.42:5000/getToDoItems")
      .then(response => response.json())
      .then((responseJson) => {
        responseJson.map((item) => {
          if(item.category == 'toDo'){
            setToDoList(currentArray => [...currentArray, item])
          }else if(item.category == 'inProgress'){
            setInProgressList(currentArray => [...currentArray, item])
          }else{
            setDoneList(currentArray => [...currentArray, item])
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }


  
  const addNewToDoHandler = props => {
    setaddButton(false);
    axios.post('http://192.168.1.42:5000/newToDo', {value: props})
    .then ((response) => {
      console.log(response)
      setToDoList([]), setInProgressList([]), setDoneList([])
      getToDoItems()
    })
    .catch (function (error){
      console.log(error)
    })
  }



  const deleteToDoItemHandler = toDoKey => {
    axios.post('http://192.168.1.42:5000/deleteOneToDo', {_id: toDoKey})
    .then ((response) => {
      console.log(response)
      setToDoList([]), setInProgressList([]), setDoneList([])
      getToDoItems()
    })
    .catch (function (error){
      console.log(error)
    })
  }


  const cancelButtonHandler = () => {
    setaddButton(false);
  };


  const transferCategoryHandler = toDoItem => {
    
    let category;
    if(toDoItem.category == 'toDo'){
      category = 'inProgress'
    }else{
      category = 'done'
    }

    axios.patch('http://192.168.1.42:5000/changeCategory', {_id: toDoItem._id, category: category})
      .then ((response) => {
        console.log(response)
        setToDoList([]), setInProgressList([]), setDoneList([])
        getToDoItems()
      })
      .catch (function (error){
        console.log(error)
      })
  }


  const searchHandler = props => {
    setToDoList([]), setInProgressList([]), setDoneList([])
      props.map((item) => {
        if(item.category == 'toDo'){
          setToDoList(currentArray => [...currentArray, item])
        }else if(item.category == 'inProgress'){
          setInProgressList(currentArray => [...currentArray, item])
        }else{
          setDoneList(currentArray => [...currentArray, item])
        }
      })
  }

{/*<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>*/}
{/*</TouchableWithoutFeedback>*/}


  
  return (
    
      <View style={styles.screen}>
        <Button title='Tryck här för att lägga till!' onPress={() => setaddButton(true)}/>
        <Search onSearchHandler={searchHandler}/>
        <ToDoInput visible={addButton} onAddNewToDoHandler={addNewToDoHandler} onCancel={cancelButtonHandler}/>
        <View style={styles.categoryHeaderContainer}>
          <Text style={styles.categoryHeader}>Att göra</Text>
        </View>
        <FlatList data={toDoList} keyExtractor={(item, key) => item._id} renderItem={toDoItem => <ToDoItems title={toDoItem.item} onDelete={deleteToDoItemHandler} onTransferCategoryHandler={ props => {
          transferCategoryHandler(props);
          }} />}/>
        <View style={styles.categoryHeaderContainer}>
          <Text style={styles.categoryHeader}>Pågående</Text>
        </View>
        <FlatList data={inProgressList} keyExtractor={(item, key) => item._id} renderItem={inProgressItem => <ToDoItems title={inProgressItem.item} onDelete={deleteToDoItemHandler} onTransferCategoryHandler={ props => {
          transferCategoryHandler(props);
          }}/>}/>
        <View style={styles.categoryHeaderContainer}>
          <Text style={styles.categoryHeader}>Klart</Text>
        </View>
        <FlatList data={doneList} keyExtractor={(item, key) => item._id} renderItem={inProgressItem => <ToDoItems title={inProgressItem.item} onDelete={deleteToDoItemHandler}/>}/>
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
  categoryTitleContainer: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 50,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  categoryHeader: {
    textAlign: 'center',
    marginVertical: 10
  }
});