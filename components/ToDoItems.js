import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'


const ToDoItems = props => {
  return (
    <TouchableOpacity onPress={() => props.onDelete(props.title.key)}>
      <View style={styles.listItem}>
          <Text>{props.title.value}</Text>
      </View>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
    listItem: {
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#ccc',
      borderColor: 'black',
      borderWidth: 1
    }
  });

export default ToDoItems