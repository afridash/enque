/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
import Header from './header'
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu. Dashboard',
});
//  <PowerTranslator style={{width:100, height:100}} text={'Good morning'} />
export default class Dashboard extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      translated:'',
      surveys:[{key:1, name:'Richard Igbiriki'},
      {key:2, name:'Richard Igbiriki'},
      {key:3, name:'Richard Igbiriki'},
      {key:7, name:'Richard Igbiriki'},
      {key:8, name:'Richard Igbiriki'},
      {key:9, name:'Richard '},
      {key:10, name:'Richard Imorobebh'},
      {key:11, name:'Richard Imorobebh'},
      {key:12, name:'Richard Imorobebh'},
      {key:13, name:'Richard Imorobebh'},
      {key:14, name:'Richard Imorobebh'},
      {key:15, name:'Richard Imorobebh'},
      {key:16, name:'Richard Imorobebh'},
      {key:17, name:'Richard Imorobebh'}, ]
    }
  }
  renderItem = ({item, index}) => {
    return (
      <View style={{backgroundColor: index%2 ===0 ? '#90caf9' : '#bbdefb', padding:20, flexDirection:'row', justifyContent:'space-between'}}>
        <Text>{item.name}</Text>
        <Text>7 mins</Text>
      </View>
    )
  }
  render () {
    return (
      <View style={styles.container}>
        <Header title='Surveys' upload={true} />
        <View style={styles.secondaryContainer}>
          <FlatList
          style={{flex:1, marginTop:2}}
          data={this.state.surveys}
          renderItem={this.renderItem}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondaryContainer: {
    flex: 2,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
