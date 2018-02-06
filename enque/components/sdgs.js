import React, {Component} from 'react'
import {
  WebView,
  View,
  StyleSheet,
  Text,
} from 'react-native'
import Header from './header'

export default class SDG extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <View style={styles.container}>
        <Header title='SDGs' />
        <WebView
         source={{uri: 'https://sdgactioncampaign.org/'}}
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
