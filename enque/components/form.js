import React, { Component } from 'react';
import {Platform, StyleSheet,Text,View,Image, TextInput,Picker, TouchableHighlight} from 'react-native';
import Button from 'apsl-react-native-button'
import { Actions } from 'react-native-router-flux';
import Header from './header'
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig');

export default class Form extends Component<{}> {
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
        <Header  title='Form' />
        <View style={styles.secondaryContainer}>
        <View style={{flex:1}}>
          <Text style={styles.welcome}>
            Almost There...
          </Text>
          <Text style={styles.text}>
            Your votes will remain anonymous, but this basic data will help us understand you better
          </Text>
        </View>
        <View style={styles.list}>
          <View style={{flex:1, borderBottomWidth:1,marginBottom:20, flexDirection:'row', alignItems:'center'}}>
            <Image source={require('../assets/images/Gender.png')} style={styles.home}/>
            <TextInput style={{flex:1}} placeholder='Gender'/>
          </View>
          <View style={{flex:1,borderBottomWidth:1, marginBottom:20,flexDirection:'row', alignItems:'center'}}>
            <Image source={require('../assets/images/edu.png')} style={styles.home}/>
            <TextInput style={{flex:1}} placeholder='Education Level'/>
          </View>
          <View style={{flex:1,borderBottomWidth:1,marginBottom:20,flexDirection:'row', alignItems:'center'}}>
            <Image source={require('../assets/images/building.png')} style={styles.home}/>
            <TextInput style={{flex:1}} placeholder='City/Town'/>
          </View>
          <View style={{flex:1,borderBottomWidth:1,marginBottom:20,flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../assets/images/18.png')} style={styles.home}/>
            <TextInput style={{flex:1}} placeholder='Age'/>
          </View>
          <TouchableHighlight style={{flex:1,borderBottomWidth:1,marginBottom:20,flexDirection:'row',alignItems:'center'}} onPress={Actions.countries}>
            <View style={{flex:1,flexDirection:'row', justifyContent:'space-between'}} >
              <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
                <Image source={require('../assets/images/loc.png')} style={styles.home}/>
                <Text>Country</Text>
              </View>
              <Image  source={require('../assets/images/rightarrow.png')} style={styles.right}/>
          </View>
        </TouchableHighlight>

          <View style={{flex:1,borderBottomWidth:1,flexDirection:'row', alignItems:'center'}}>
            <Image source={require('../assets/images/disability.png')} style={styles.home}/>
            <TextInput style={{flex:1}} placeholder='Disability'/>
          </View>
        </View>
        <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
          <Button style={styles.submit} textStyle={{fontSize: 18, color:'white'}} onPress={Actions.subscribe}>Submit</Button>
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
  secondaryContainer: {
    flex: 1,
    margin:10,
  },
  list:{
    flex:2,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
  },
  submit:{
    backgroundColor:'#1eaaf1',
     height:40,
    width:100,
    borderColor:'transparent',
    margin: 10,
  },
  home:{
    resizeMode: 'contain',
    width: 30,
    height: 30,
    alignItems:'flex-end',
    margin:10,
  },
  right:{
    resizeMode: 'contain',
    width: 20,
    height: 20,
    alignItems:'flex-end',
    tintColor:'grey',
  },
  text:{
    fontSize: 20,
    },
});
