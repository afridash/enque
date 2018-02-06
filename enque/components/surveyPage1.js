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
  Button,
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

export default class SurveyPage1 extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      translated:''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1, marginTop:20}}>
          <Text style={styles.welcome}>
          ARE YOU AWARE OF THE SUSTAINABLE DEVELOPMENT GOALS
          OR 'GLOBAL GOALS' SIGNED BY 193 WORLD LEADERS AT THE UN IN 2015?
          </Text>
          <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'row', margin:50}}>
              <Text style={{fontSize:20}}>YES</Text>
              <RadioButton
                animation={'bounceIn'}
                isSelected = {this.state.chosen}
                onPress={() => this.setState({chosen:!this.state.chosen, selected:false})}
              />
            </View>

            <View style={{flexDirection:'row', margin:50}}>
              <RadioButton
                animation={'bounceIn'}
                isSelected = {this.state.selected}
                onPress={() => this.setState({selected:!this.state.selected, chosen:false})}
              />
              <Text style={{fontSize:20}}>N0</Text>
            </View>
          </View>
          <View style={styles.info}>
            {this.state.selected && <Text style={{fontSize:18, color:'white',justifyContent:'center', textAlign:'justify', margin:10, lineHeight:30}}>
              World Leaders have committed in September 2015 to seventeen Sustainable Development Goals to achieve
              three extraordinary things in the next 15 years. End extreme poverty. Fight inequality & injustice.
              Fix climate change. These Goals build on the success of the Millennium Development Goals and could
              get these things done. In all countries. For all people.
            </Text>
          }
          </View>
          <Button
            //onPress={onPressLearnMore}
            title="NEXT"
            color="#212121"
            accessibilityLabel="This button takes you to the next page"
          />
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  info: {
    flex: 1,
    backgroundColor: '#00AFF0',
  },
});
