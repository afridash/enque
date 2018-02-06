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
  Image,
  StatusBar,
} from 'react-native';

import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
import Button from 'apsl-react-native-button'
import {Actions} from 'react-native-router-flux'

var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig');
//<PowerTranslator style={{width:100, height:100}} text={'Good morning'} />
export default class Index extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      translated:''
    }
  }
  componentDidMount () {
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#15354e'} barStyle='light-content' />
        <Image source={require('../assets/images/icon.png')} resizeMode={'contain'} style={styles.logo} />
        <View style={styles.app}>
          <Text style={styles.title}>
            Enque
          </Text>
          <Text style={styles.subtitle}>
            ~Voices Heard~
          </Text>
          <Button onPress={Actions.dashboard} style={{backgroundColor: '#1eaaf1', borderWidth:0, borderColor:'transparent'}} textStyle={{fontSize: 18, color:'white'}}>
            Begin
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d4869',
  },
  logo: {
    flex:2,
    alignItems:'center',
    justifyContent:'center',
    margin: 10,
  },
  app: {
    flex:1.2,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
    fontSize:50
  },
  subtitle: {
    textAlign:'center',
    fontSize:20,
    color:'white',
    margin:10,
  }
});
