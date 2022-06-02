import React from 'react'
import { useState } from 'react'
import {View, TextInput, StyleSheet, Button, Modal, TouchableWithoutFeedback, Keyboard, Text, Alert} from 'react-native'
import CustomButton from './CustomButton';




const ToDoInput = props => {

  

    const [newToDo, setNewToDo] = useState('');
    const [errorSpecialCharacters, seterrorSpecialCharacters] = useState(false)
    const [errorEmptyInput, setErrorEmptyInput] = useState(false)


    let errorMessage;
    const newToDoHandler = (enteredText) => {
      if(enteredText.match(/[|\\/~^:,;?!&%$@*+]/)){
        seterrorSpecialCharacters(true);
      }else{
        setNewToDo(enteredText);
      };
    };
    if(errorSpecialCharacters){
      Alert.alert('Specialteckenfel', 'Tyvärr, inga specialtecken tillåtna!', [{text: 'Okej', style: 'destructive', onPress: seterrorSpecialCharacters(false)}]);
    }else if(errorEmptyInput){
      errorMessage = <Text>Kan inte lägga in tom uppgift!</Text>;
    };
    


    const addToDoHandler = () => {
      if(newToDo.length === 0){
        setErrorEmptyInput(true);
      }else{
        props.onAddNewToDoHandler(newToDo);
        setNewToDo('');
        seterrorSpecialCharacters(false);
        setErrorEmptyInput(false);
      };
    };
  
    

  return (
    <Modal visible={props.visible} animationType='slide'>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.inputContainer}>
          <TextInput
              placeholder="Att göra"
              style={styles.textInput}
              onChangeText={newToDoHandler}
              value={newToDo}
          />
          {errorMessage}
          <View style={styles.buttonAllContainer}>
            <View style={styles.buttonContainer}>
              <CustomButton onPress={() => {
                props.onCancel();
                setNewToDo('');
                seterrorSpecialCharacters(false)
                setErrorEmptyInput(false)
                }}>Avbryt</CustomButton>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton style={styles.clearButton} onPress={() => {
                setNewToDo('')
                seterrorSpecialCharacters(false)
                setErrorEmptyInput(false)
                }}>Rensa</CustomButton>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton style={styles.addButton} onPress={addToDoHandler}>Lägg till</CustomButton>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    buttonAllContainer: {
      flexDirection: 'row',
      width: '70%',
      justifyContent: 'space-between'
    },
    buttonContainer: {
      width: '30%'
    },
    clearButton: {
      backgroundColor: '#E7E214'
    },
    addButton: {
      backgroundColor: '#194D33'
    }
  });
  

export default ToDoInput