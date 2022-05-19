import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native'



const ToDoItems = props => {
  
  const [itemCategory, setItemCategory] = useState('');


  useEffect(() => {
    setItemCategory(props.category);
  }, []);
  

  
  
  return (
    <TouchableOpacity onPress={() => {
      if(props.category == 'transferToInProgress'){
        props.onTransferToInProgress(props.title)
      }else{
        props.onTransferToDone(props.title)
      }
      }}>
      <View style={styles.listItemContainer}>
        <View style={styles.listItem}>
            <Text>{props.title.value}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title='radera' color='#b40000' onPress={() => props.onDelete(props.title.key)}/>
        </View>
      </View>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  listItemContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },  
  listItem: {
    width: '70%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
    },
  buttonContainer: {
    justifyContent: 'center'
  }
  });

export default ToDoItems