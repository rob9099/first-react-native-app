import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList } from "react-native";
import ToDoItems from "./components/ToDoItems";
import ToDoInput from "./components/ToDoInput";


export default function App() {
  

  const [toDoList, setToDoList] = useState([])
  var test = []
  const [newToDo, setNewToDo] = useState('')


  /*const addToDoHandler = toDoProps => {
    console.log(toDoProps);
    setToDoList(currentArray => [...currentArray, {key: Math.random().toString(), value: toDoProps}])
    setToDoList(currentArray => [...currentArray, toDoProps])
    setToDoList([...toDoList, toDoProps])
    setToDoList({ toDoList: [...this.state.toDoList, toDoProps] })
    setToDoList(  
       {myArray: [...toDoList.myArray, toDoProps]}
    )
    //var myNewArray = toDoList.slice();
    //myNewArray.push(toDoProps)
    //setToDoList(toDoList => [toDoProps,...toDoList] );
    //console.log(myNewArray)
    //setToDoList([myNewArray])
    //setToDoList((curArr) => {return curArr.concat(toDoProps)})
    //setToDoList(test.push(toDoProps))
    console.log(toDoList)
  }*/


  const newToDoHandler = (enteredToDO) => {
    setNewToDo(enteredToDO)
  }

  const addNewToDoHandler = () => {
    setToDoList(currentToDoList => [...currentToDoList, newToDo])
    console.log(toDoList)
  }



  
  return (
    <View style={styles.screen}>
      {/*<ToDoInput onAddToDoHandler={addToDoHandler}/>*/}
      <View style={styles.inputcontainer}>
        <TextInput
            placeholder="Att göra"
            style={styles.textInput}
            onChangeText={newToDoHandler}
            value={newToDo}
          />
        <Button title="Lägg till" onPress={addNewToDoHandler}/>
      </View>

        <FlatList data={toDoList} renderItem={toDo => <ToDoItems />}/>
    </View>
  );
}






const styles = StyleSheet.create({
  screen: {
    padding: 50,
  }
});
