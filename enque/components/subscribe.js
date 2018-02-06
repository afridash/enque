import React, { Component } from 'react';
import {Platform, StyleSheet,Text,View,Image, TextInput} from 'react-native';
import Button from 'apsl-react-native-button'
import Header from './header'
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig');

export default class Subscribe extends Component<{}> {
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
        <Header backButton={true} title='Subscribe' />
        <View style={{margin:10, flex:1}}>
        <View style={{flex:1}}>
          <Text style={styles.welcome}>
             Thank you for Voting
          </Text>
          <Text style={styles.text}>
            Leave your email to stay in touch and join a network of citizens sharing their views with the United Nations
          </Text>
        </View>
        <View style={styles.list}>
          <View style={{flex:1, borderBottomWidth:1,marginBottom:20, flexDirection:'row', alignItems:'center'}}>
            <Text >Email address: &nbsp; &nbsp;</Text>
            <TextInput style={{flex:1}} placeholder='Email'/>
          </View>
          <View style={{flex:1, borderBottomWidth:1,marginBottom:20, flexDirection:'row', alignItems:'center'}}>
            <Text >Mobile Number:&nbsp; &nbsp;</Text>
            <TextInput style={{flex:1}} placeholder='Mobile Number'/>
          </View>
        </View>
        <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:2}}>
          <Button style={{backgroundColor:'#1eaaf1', height:40, width:100, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}}>Subscribe</Button>
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list:{
    flex:1,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
  },
  text:{
    fontSize: 20,
    },
});
