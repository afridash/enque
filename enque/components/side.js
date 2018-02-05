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
  AsyncStorage,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux'
export default class Side extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      translated:''
    }
  }
  componentWillMount () {
    this.checkInternet()
  }
  async checkInternet () {
    var status = await AsyncStorage.getItem('status')
    if (status === 'true') {
      this.setState({upload:true})
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sdg}>
          <TouchableHighlight onPress={Actions.sustainable} style={{flex:1.5}}>
            <View style={{flex:1, flexDirection:'row'}}>
              <Image source={require('../assets/images/sus.png')} resizeMode={'contain'} style={styles.sdgImage} />
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={Actions.dashboard} style={styles.category}>
          <Text style={styles.text}>Surveys</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={Actions.myworld} style={styles.category}>
          <Text style={styles.text}>My World 2030</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={Actions.partners} style={styles.category}>
          <Text style={styles.text}>Partners</Text>
        </TouchableHighlight>
        <TouchableHighlight  style={styles.category} onPress={Actions.about}>
            <Text style={styles.text}>About Enque</Text>
        </TouchableHighlight>
        {this.state.upload &&
        <View style={styles.upload}>
          <Text style={styles.uploadButton}>Upload Surveys</Text>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  sdg: {
    flex:1,
    borderColor:'#15354e',
    borderTopWidth:25,
    borderBottomWidth:3,
  },
  sdgImage:{
    height:150,
    flex:1,
  },
  text: {
    fontSize:20,
    flex:1,
    fontWeight:'400',
  },
  category: {
    flex:0.5,
    flexDirection:'row',
    borderColor:'#15354e',
    padding:10,
    borderBottomWidth:3,
  },
  enque: {
    flex:1,
    backgroundColor:'purple'
  },
  upload: {
    flex:2,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-end'
  },
  uploadButton: {
    backgroundColor:'#1eaaf1',
    color:'white',
    fontSize:20,
    marginBottom:1,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    padding:10,
    textAlign:'center',
    height:50,
  },
});
