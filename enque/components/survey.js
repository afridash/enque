import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import Header from './header'
export default class Survey extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Header title="Survey" backButton={true} noAdd={true}/>
        <Text style={styles.start}>Start New</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  start: {
    marginTop:10,
    textAlign:'justify'
  },
})
