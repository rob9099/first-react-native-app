import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Alert, Text} from 'react-native';
import axios from "axios";


const Search = props => {

    const [searchTerm, setSearchTerm] = useState('');
    const [errorSpecialCharacters, setErrorSpecialCharacters] = useState(false);
    const [emptyResult, setEmptyResult] = useState('');
  
    
    const searchTermHandler = searchTerm => {
        if(searchTerm.match(/[|\\/~^:,;?!&%$@*+]/)){
          setErrorSpecialCharacters(true);
        }else{
          setSearchTerm(searchTerm);
          searchDatabase(searchTerm);
        };
      }
      if(errorSpecialCharacters){
        Alert.alert('Specialteckenfel', 'Tyvärr, inga specialtecken tillåtna!', [{text: 'Okej', style: 'destructive', onPress: setErrorSpecialCharacters(false)}]);
      }
    
    
    
      const searchDatabase = searchTerm => {
        axios.post('http://192.168.1.42:5000/search', {searchTerm: searchTerm})
        .then ((response) => {
          props.onSearchHandler(response.data)
          if(response.data.length == 0){
            setEmptyResult('Sorry, no result(s)')
          }else{
            setEmptyResult('')
          }
        })
        .catch (function (error){
          console.log(error)
        })
      }
  
  
    return (
        <View style={styles.searchContainer}>
            <TextInput style={styles.search} placeholder='sök...' onChangeText={searchTermHandler} value={searchTerm}/>
            <Text style={styles.errorMessage}>{emptyResult}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    searchContainer: {
      alignItems: "center"
    },
    search: {
      width: '60%',
      borderColor: 'red',
      borderWidth: 1,
      margin: 10,
      paddingHorizontal: 5
    },
    errorMessage: {
        color: 'red'
    }
  });

export default Search;