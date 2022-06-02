import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList, TouchableWithoutFeedback, Keyboard, ScrollView, LogBox} from "react-native";
import Header from "./components/Header";
import ToDoItems from "./components/ToDoItems";
import ToDoInput from "./components/ToDoInput";
import CategoryHeader from "./components/CategoryHeader";
import Search from "./components/Search";
import axios from "axios";
import CustomButton from "./components/CustomButton";



export default function App() {
  
  useEffect(() => {
    setToDoList([]), setInProgressList([]), setDoneList([])
    getToDoItems();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
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



  
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Header />
        <CustomButton style={styles.button} onPress={() => setaddButton(true)}>Tryck här för att lägga till!</CustomButton>
        <Search onSearchHandler={searchHandler}/>
        <ToDoInput visible={addButton} onAddNewToDoHandler={addNewToDoHandler} onCancel={cancelButtonHandler}/>
        <ScrollView>
          <CategoryHeader>Att göra</CategoryHeader>
          <FlatList data={toDoList} keyExtractor={(item, key) => item._id} renderItem={toDoItem =>
            <ToDoItems
              title={toDoItem.item}
              onDelete={deleteToDoItemHandler}
              onTransferCategoryHandler={ props => {
                transferCategoryHandler(props);
              }}
            />
          }/>
          <CategoryHeader>Pågående</CategoryHeader>
          <FlatList data={inProgressList} keyExtractor={(item, key) => item._id} renderItem={inProgressItem =>
            <ToDoItems
              title={inProgressItem.item}
              onDelete={deleteToDoItemHandler}
              onTransferCategoryHandler={ props => {
                transferCategoryHandler(props);
              }}
            />
          }/>
          <CategoryHeader>Klart</CategoryHeader>
          <FlatList data={doneList} keyExtractor={(item, key) => item._id} renderItem={doneItem =>
            <ToDoItems
              title={doneItem.item}
              onDelete={deleteToDoItemHandler}/>
          }/>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}




const styles = StyleSheet.create({
  screen: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#4655BD'
  }
});