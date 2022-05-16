import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList, Text } from "react-native";
import ToDoItems from "./components/ToDoItems";
import ToDoInput from "./components/ToDoInput";


export default function App() {
  

  const [toDoList, setToDoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [startButton, setStartButton] = useState(false);


  const addToDoHandler = toDoItemProps => {
    setToDoList(currentArray => [...currentArray, {key: Math.random().toString(), value: toDoItemProps}]);
    setStartButton(false);
  };


  const deleteToDoItemHandler = toDoKey => {
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
  };


  const cancelButtonHandler = () => {
    setStartButton(false);
  };


  const transferToInProgress = toDoItem => {
    setInProgressList(currentArray => [...currentArray, toDoItem]);
  }

  const transferToDone = toDoItem => {
    setDoneList(currentArray => [...currentArray, toDoItem]);
  }





  
  return (
    <View style={styles.screen}>
      <Button title='Tryck här för att lägga till!' onPress={() => setStartButton(true)}/>
      <ToDoInput visible={startButton} onAddToDoHandler={addToDoHandler} onCancel={cancelButtonHandler}/>
      <Text style={styles.title}>Att göra</Text>
      <FlatList data={toDoList} renderItem={toDoItem => <ToDoItems title={toDoItem.item} category='transferToInProgress' onDelete={deleteToDoItemHandler} onTransferToInProgress={ props => {
        transferToInProgress(props);
        deleteToDoItemHandler(props.key);
        }}/>}/>
      <Text style={styles.title}>Pågående</Text>
      <FlatList data={inProgressList} renderItem={inProgressItem => <ToDoItems title={inProgressItem.item} category='transferToDone' onDelete={deleteToDoItemHandler} onTransferToDone={ props => {
        transferToDone(props);
        deleteToDoItemHandler(props.key);
        }}/>}/>
      <Text style={styles.title}>Klart</Text>
      <FlatList data={doneList} renderItem={inProgressItem => <ToDoItems title={inProgressItem.item} onDelete={deleteToDoItemHandler}/>}/>
    </View>
  );
}




const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  title: {
    textAlign: 'center'
  }
});
