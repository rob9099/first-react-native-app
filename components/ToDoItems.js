import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native'



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
          <Button title='radera' color='#b40000' onPress={() => props.onDelete(props.title._id)}/>
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