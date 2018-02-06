/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import RadioButton from 'react-native-radio-button';
import * as Animatable from 'react-native-animatable';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu. Dashboard',
});

var sdgImages = [
  require ('../assets/images/1_Poverty_SDG.png'),
  require ('../assets/images/2_ZeroHunger.jpg'),
  require ('../assets/images/3_GoodHealthCare.jpg'),
  require ('../assets/images/4_Education.png'),
  require ('../assets/images/5_Gender.jpg'),
  require ('../assets/images/6_CleanWater.png'),
  require ('../assets/images/7_Energy.jpg'),
  require ('../assets/images/8_DecentWork.png'),
  require ('../assets/images/9_Industry.png'),
  require ('../assets/images/10_ReducedEquality.jpg'),
  require ('../assets/images/11_SustainableCities.png'),
  require ('../assets/images/12_Recycle.png'),
  require ('../assets/images/13_Climate.png'),
  require ('../assets/images/14_LifeBelowWeater.jpg'),
  require ('../assets/images/15_LifeOnLand.png'),
  require ('../assets/images/16_Justice.png'),
  require ('../assets/images/17_Parnerships.png'),
];


export default class SurveyPage2 extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      translated:''
    }
  }

  renderItem = ({item, index}) => {
    return (
      <View style={{flexDirection:'row'}}>
        <Image source={item} style={{width:100, height:100, marginBottom:5}} resizeMode={'stretch'} />
        <Text>Hello World {index}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1, marginTop:20}}>
          <Text style={styles.welcome}>WHICH SIX OF THE FOLLOWING GLOBAL GOALS ARE OF IMMEDIATE CONCERN TO YOU AND YOUR FAMILY?</Text>
          <View>
            <FlatList
              data={sdgImages}
              renderItem={this.renderItem}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
