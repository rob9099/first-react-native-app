import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import ToDoItems from "./components/ToDoItems";
import ToDoInput from "./components/ToDoInput";


export default function App() {
  

  const [toDoList, setToDoList] = useState([]);
  const [startButton, setStartButton] = useState(false)


  const addToDoHandler = toDoItemProps => {
    setToDoList(currentArray => [...currentArray, {key: Math.random().toString(), value: toDoItemProps}]);
    setStartButton(false);
  }


  const deleteToDoItemHandler = toDoKey => {
    setToDoList(currentArray => {
      return currentArray.filter((toDoItem) => toDoItem.key !== toDoKey)
    })
  }

  const cancelButtonHandler = () => {
    setStartButton(false);
  }



  
  return (
    <View style={styles.screen}>
      <Button title='Tryck här för att lägga till!' onPress={() => setStartButton(true)}/>
      <ToDoInput visible={startButton} onAddToDoHandler={addToDoHandler} onCancel={cancelButtonHandler}/>
      <FlatList data={toDoList} renderItem={toDo => <ToDoItems title={toDo.item} onDelete={deleteToDoItemHandler}/>}/>
    </View>
  );
}




const styles = StyleSheet.create({
  screen: {
    padding: 50,
  }
});
