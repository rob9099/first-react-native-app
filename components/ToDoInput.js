import React from 'react'
import { useState } from 'react'
import {View, TextInput, StyleSheet, Button, Modal} from 'react-native'




const ToDoInput = props => {

    const [newToDo, setNewToDo] = useState('');
    

    const newToDoHandler = (enteredText) => {
    setNewToDo(enteredText);
    }

    const addToDoHandler = () => {
      if(newToDo.length === 0){
        return;
      }else{
        props.onAddToDoHandler(newToDo);
        setNewToDo('');
      }
    }
    

  return (
    <Modal visible={props.visible} animationType='slide'>
      <View style={styles.inputContainer}>
        <TextInput
            placeholder="Att göra"
            style={styles.textInput}
            onChangeText={newToDoHandler}
            value={newToDo}
          />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='avbryt' color='#b40000' onPress={props.onCancel}/>
          </View>
          <View style={styles.button}>
            <Button title='rensa' color='#E7E214' onPress={() => setNewToDo('')}/>
          </View>
          <View style={styles.button}>
            <Button title="lägg till" onPress={addToDoHandler}/>
          </View>
        </View>
      </View>
    </Modal>
  )
}





const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    textInput: {
      width: "80%",
      borderBottomColor: "black",
      borderBottomWidth: 1,
      padding: 5,
      marginBottom: 10
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '70%',
      justifyContent: 'space-between'
    },
    button: {
      width: '30%'
    }
  });

export default ToDoInput