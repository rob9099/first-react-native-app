import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";



const CustomButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{...styles.buttonContainer, ...props.style}}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
      justifyContent: 'center',
      backgroundColor:'#b40000',
      padding: 10,
      borderRadius: 20,
      borderBottomWidth: 2,
      borderBottomColor:'black'
    },
    buttonText: {
      color: 'white',
      textAlign: 'center'
    }
  })

export default CustomButton