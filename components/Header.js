import React from 'react'
import { StyleSheet, View, Image} from "react-native";

const Header = () => {
  return (
    <View style={styles.imageContainer}>
      <Image source={require('../assets/RLogo.gif')} style={styles.image}/>
      
    </View>
    
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    height: '10%',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Header