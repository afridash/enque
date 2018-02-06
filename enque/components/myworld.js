import React, {Component} from 'react'
import {
  WebView,
  View,
  StyleSheet,
  Text,
} from 'react-native'
import Header from './header'

export default class MyWorld extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <View style={styles.container}>
        <Header title='My World 2030' />
        <WebView
         source={{uri: 'https://myworld2030.org/'}}
         style={{marginTop: 20}}
       />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1
  }
})
