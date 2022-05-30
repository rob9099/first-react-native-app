import React from 'react'
import { StyleSheet, View, Text} from "react-native";


const TitleHeader = props => {
  return (
    <View style={styles.categoryHeaderContainer}>
        <Text style={styles.categoryHeader}>{props.children}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    categoryHeaderContainer: {
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 50,
      shadowOpacity: 0.5,
      elevation: 5,
    },
    categoryHeader: {
      textAlign: 'center',
      marginVertical: 10
    }
  });

export default TitleHeader