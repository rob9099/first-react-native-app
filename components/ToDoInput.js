import React from 'react'
import { useState } from 'react'
import {View, TextInput, StyleSheet, Button} from 'react-native'




const ToDoInput = props => {

    const [newToDo, setNewToDo] = useState('');
    

    const newToDoHandler = (enteredText) => {
    setNewToDo(enteredText)
    }
    

  return (
    <View style={styles.inputcontainer}>
      <TextInput
          placeholder="Att göra"
          style={styles.textInput}
          onChangeText={newToDoHandler}
          value={newToDo}
        />
      <Button title="Lägg till" onPress={() => props.onAddToDoHandler(newToDo)}/>
    </View>
  )
}





const styles = StyleSheet.create({
    inputcontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      textInput: {
        width: "60%",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        padding: 5,
      }
  });

export default ToDoInput