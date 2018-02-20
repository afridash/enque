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
import Button from 'apsl-react-native-button'
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
import SurveyPage2 from './surveyPage2'
import Header from './header'
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig')
export default class SurveyPage1 extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      translated:''
    }
  }

  //Contains the actual survey - oh well, page 1 of it!
  showPage1 () {
    return (
      <ScrollView style={{flex:1, marginTop:20}}>
        <Text style={styles.welcome}>
        ARE YOU AWARE OF THE SUSTAINABLE DEVELOPMENT GOALS
        OR 'GLOBAL GOALS' SIGNED BY 193 WORLD LEADERS AT THE UN IN 2015?
        </Text>
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'row', margin:50}}>
            <Text style={{fontSize:20}}>YES </Text>
            <RadioButton
              animation={'bounceIn'}
              isSelected = {this.state.chosen}
              onPress={() => this.setState({chosen:!this.state.chosen, selected:false, status:'yes'})}
            />
          </View>

          <View style={{flexDirection:'row', margin:50}}>
            <RadioButton
              animation={'bounceIn'}
              isSelected = {this.state.selected}
              onPress={() => this.setState({selected:!this.state.selected, chosen:false, status:'no'})}
            />
            <Text style={{fontSize:20}}> N0</Text>
          </View>
        </View>
        <View style={styles.info}>
          {this.state.selected && <Text style={styles.textContainer}>
            World Leaders have committed in September 2015 to seventeen Sustainable Development Goals to achieve
            three extraordinary things in the next 15 years. End extreme poverty. Fight inequality & injustice.
            Fix climate change. These Goals build on the success of the Millennium Development Goals and could
            get these things done. In all countries. For all people.
          </Text>
        }
      </View>
      {(()=>{
        if (this.state.selected || this.state.chosen) {
          return (
            <Button style={styles.submit} textStyle={{fontSize: 18, color:'white'}} onPress={()=>this.setState({showNext:true})}>Continue</Button>

          )
        }
      })()}
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title='New Survey' backButton={true} noAdd={true} />
        <View style={styles.secondaryContainer}>
          {this.state.showNext ?
          <SurveyPage2 status={this.state.status} /> : this.showPage1 () }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'justify',
    lineHeight:30,
  },
  submit:{
    backgroundColor:'red',
     height:40,
    borderColor:'transparent',
    marginRight: 10,

  },
  secondaryContainer:{
    margin:10,
    flex:1
  },
  info: {
    flex: 1,
    backgroundColor: '#00AFF0',
    marginBottom:5,
  },
  textContainer:{
    fontSize:18,
    color:'white',
    justifyContent:'center',
    textAlign:'justify',
    margin:10,
    lineHeight:30
  },
});
