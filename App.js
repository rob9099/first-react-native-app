import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList, Text, TextInput, Alert } from "react-native";
import ToDoItems from "./components/ToDoItems";
import ToDoInput from "./components/ToDoInput";
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
  const [searchTerm, setSearchTerm] = useState('');
  const [errorSpecialCharacters, setErrorSpecialCharacters] = useState(false);

  

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



  const searchTermHandler = searchTerm => {
    if(searchTerm.match(/[|\\/~^:,;?!&%$@*+]/)){
      setErrorSpecialCharacters(true);
    }else{
      setSearchTerm(searchTerm);
      searchDatabase(searchTerm);
    };
  }
  if(errorSpecialCharacters){
    Alert.alert('Specialteckenfel', 'Tyvärr, inga specialtecken tillåtna!', [{text: 'Okej', style: 'destructive', onPress: setErrorSpecialCharacters(false)}]);
  }



  const searchDatabase = searchTerm => {
    axios.post('http://192.168.1.42:5000/search', {searchTerm: searchTerm})
    .then ((response) => {
      console.log(response.data)
      setToDoList([]), setInProgressList([]), setDoneList([])
      response.data.map((item) => {
        if(item.category == 'toDo'){
          setToDoList(currentArray => [...currentArray, item])
        }else if(item.category == 'inProgress'){
          setInProgressList(currentArray => [...currentArray, item])
        }else{
          setDoneList(currentArray => [...currentArray, item])
        }
      })
    })
    .catch (function (error){
      console.log(error)
    })
  }





  
  return (
    <View style={styles.screen}>
      <Button title='Tryck här för att lägga till!' onPress={() => setaddButton(true)}/>
      <View style={styles.searchContainer}>
        <TextInput style={styles.search} placeholder='sök...' onChangeText={searchTermHandler} value={searchTerm}/>
      </View>
      <ToDoInput visible={addButton} onAddNewToDoHandler={addNewToDoHandler} onCancel={cancelButtonHandler}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Att göra</Text>
      </View>
      <FlatList data={toDoList} keyExtractor={(item, key) => item._id} renderItem={toDoItem => <ToDoItems title={toDoItem.item} onDelete={deleteToDoItemHandler} onTransferCategoryHandler={ props => {
        transferCategoryHandler(props);
        }} />}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Pågående</Text>
      </View>
      <FlatList data={inProgressList} keyExtractor={(item, key) => item._id} renderItem={inProgressItem => <ToDoItems title={inProgressItem.item} onDelete={deleteToDoItemHandler} onTransferCategoryHandler={ props => {
        transferCategoryHandler(props);
        }}/>}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Klart</Text>
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