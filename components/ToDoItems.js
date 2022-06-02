import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native'
import CustomButton from "./CustomButton";



const ToDoItems = props => {
  

  return (
    <TouchableOpacity onPress={() => {
      if(props.title.category == 'toDo' || props.title.category == 'inProgress'){
          props.onTransferCategoryHandler(props.title)
        }else{
          props.onDelete(props.title._id)
      }
    }}>
      <View style={styles.listItemContainer}>
        <View style={styles.listItem}>
            <Text>{props.title.value}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton onPress={() => props.onDelete(props.title._id)}>Radera</CustomButton>
        </View>
      </View>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  listItemContainer:{
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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