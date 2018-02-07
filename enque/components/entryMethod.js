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
  Image,
  ScrollView,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
import Header from './header'
import { Actions } from 'react-native-router-flux'
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig');
//  <PowerTranslator style={{width:100, height:100}} text={'Good morning'} />
export default class EntryMethod extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
    }
  }

  render () {
    return (

        <View style={styles.container}>
          <Header noAdd={true} icon={true} />
          <View style={styles.secondaryContainer}>
            <View style={{flex:1}}>
              <TouchableHighlight style={{flex:1}} underlayColor='transparent' onPress={Actions.survey1}>
                <View style={{backgroundColor:'#BF360C', margin:10, flex:1, justifyContent:'space-between'}}>
                  <View>
                    <Text style={styles.title}>Entry Method</Text>
                    <Text style={styles.subtitle}>Pre-uploaded survey questions </Text>
                  </View>
                  <View>
                    <Text style={styles.title}>Collection </Text>
                    <Text style={styles.subtitle}>Answers are directly entered here! </Text>
                  </View>
                  <View style={{backgroundColor:'#F5F5F5'}}>
                    <Text  style={{fontSize:25, color:'black', padding:5, marginTop:5}}>Inbuilt Survey</Text>
                  </View>
                </View>
              </TouchableHighlight>
             <TouchableHighlight style={{flex:1}} underlayColor='transparent' onPress={Actions.papersurvey}>
              <View style={{backgroundColor:'black', margin:10, flex:1, justifyContent:'space-between'}}>
                <View>
                  <Text style={styles.title}>Entry Method</Text>
                  <Text style={styles.subtitle}>Questions exists on paper</Text>
                </View>
                <View>
                  <Text style={styles.title}>Collection </Text>
                  <Text style={styles.subtitle}>Scan the paper to collect answers! </Text>
                </View>
                <View style={{backgroundColor:'#F5F5F5'}}>
                  <Text style={{fontSize:25, color:'black', padding:5, marginTop:5}}>Paper Scan Survey</Text>
                </View>
              </View>
            </TouchableHighlight>
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
    flex: 2,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 25,
    fontWeight:'bold',
    textAlign: 'justify',
    padding:5,
    color: 'white',
    marginTop: 10,
  },
  subtitle: {
    fontSize:18,
    color:'white',
    marginBottom:10,
    padding:5,
  },
});
