import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const ToDoItems = props => {
  return (
    <View style={styles.listItem}>
        <Text>{props.children}</Text>
    </View>
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