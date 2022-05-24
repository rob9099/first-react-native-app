import React from 'react'
import { useState } from 'react'
import {View, TextInput, StyleSheet, Button, Modal, TouchableWithoutFeedback, Keyboard, Text, Alert} from 'react-native'




const ToDoInput = props => {

  

    const [newToDo, setNewToDo] = useState('');
    const [errorSpecialCharacters, seterrorSpecialCharacters] = useState(false)
    const [errorEmptyInput, seterrorEmptyInput] = useState(false)


    let errorMessage;
    const newToDoHandler = (enteredText) => {
      if(enteredText.match(/[|\\/~^:,;?!&%$@*+]/)){
        seterrorSpecialCharacters(true);
      }else{
        setNewToDo(enteredText);
      };
    };


    const addToDoHandler = () => {
      if(newToDo.length === 0){
        seterrorEmptyInput(true);
      }else{
        props.onAddToDoHandler(newToDo);
        setNewToDo('');
        seterrorSpecialCharacters(false);
        seterrorEmptyInput(false);
      };
    };
    

    if(errorSpecialCharacters){
      Alert.alert('Specialteckenfel', 'Tyvärr, inga specialtecken tillåtna!', [{text: 'Okej', style: 'destructive', onPress: seterrorSpecialCharacters(false)}]);
    }else if(errorEmptyInput){
      errorMessage = <Text>Kan inte lägga in tom uppgift!</Text>;
    };
    

  return (
    <Modal visible={props.visible} animationType='slide'>
      {/*<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>*/}
        <View style={styles.inputContainer}>
          <TextInput
              placeholder="Att göra"
              style={styles.textInput}
              onChangeText={newToDoHandler}
              value={newToDo}
          />
          {errorMessage}
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title='avbryt' color='#b40000' onPress={() => {
                props.onCancel();
                setNewToDo('');
                seterrorSpecialCharacters(false)
                seterrorEmptyInput(false)
                }}/>
            </View>
            <View style={styles.button}>
              <Button title='rensa' color='#E7E214' onPress={() => {
                setNewToDo('')
                seterrorSpecialCharacters(false)
                seterrorEmptyInput(false)
                }}/>
            </View>
            <View style={styles.button}>
              <Button title="lägg till" onPress={addToDoHandler}/>
            </View>
          </View>
        </View>
      {/*</TouchableWithoutFeedback>*/}
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