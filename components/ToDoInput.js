import React from 'react'
import { useState } from 'react'
import {View, TextInput, StyleSheet, Button, Modal} from 'react-native'




const ToDoInput = props => {

    const [newToDo, setNewToDo] = useState('');
    

    const newToDoHandler = (enteredText) => {
    setNewToDo(enteredText);
    }
    

  return (
    <Modal visible={props.visible} animationType='slide'>
      <View style={styles.inputcontainer}>
        <TextInput
            placeholder="Att göra"
            style={styles.textInput}
            onChangeText={newToDoHandler}
            value={newToDo}
          />
        <Button title="lägg till" onPress={() => props.onAddToDoHandler(newToDo)}/>
      </View>
    </Modal>
  )
}





const styles = StyleSheet.create({
    inputcontainer: {
        flex: 1,
        justifyContent: "center",
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