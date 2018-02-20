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
import Button from 'apsl-react-native-button'
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
import SurveyPage2 from './surveyPage2'
import Header from './header'
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig')

//Array Variable below holds the images of the 17 SDGs
var sdgImages = [
  {
    key:1,
    image: require ('../assets/images/1_Poverty_SDG.png'),
    selected:false,
    color:'#EB1C2E',
    title:'Poverty',
    description:'End poverty in all its forms everywhere'
 },
  {
    key:2,
    image: require ('../assets/images/2_ZeroHunger.jpg'),
    selected:false,
    color:'#DDA73A',
    title:'Zero Hunger',
    description:'End hunger, achieve food security and improved nutrition and promote sustainable agriculture'
  },
  {
    key:3,
    image: require ('../assets/images/3_GoodHealthCare.jpg'),
    selected:false,
    color:'#49A341',
    title: 'Good Health and Well-Being',
    description:'Ensure healthy lives and promote well-being for all at all ages'
  },
  {
    key:4,
    image: require ('../assets/images/4_Education.png'),
    selected:false,
    color:'#C21F32',
    title:'Quality Education',
    description:'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all'
  },
  {
    key:5,
    image: require ('../assets/images/5_Gender.jpg'),
    selected:false,
    color:'#EF402D',
    title:'Gender Equality',
    description:'Achieve gender equality and empower all women and girls'
  },
  {
    key:6,
    image: require ('../assets/images/6_CleanWater.png'),
    selected:false,
    color:'#01AED9',
    title:'Clean Water and Sanitation',
    description:'Ensure availability and sustainable management of water and sanitation for all'
  },
  {
    key:7,
    image: require ('../assets/images/7_Energy.jpg'),
    selected:false,
    color:'#FBC412',
    title:'Affordable and Clean Energy',
    description:'Ensure access to affordable, reliable, sustainable and modern energy for all'
  },
  {
    key:8,
    image: require ('../assets/images/8_DecentWork.png'),
    selected:false,
    color:'#8F1838',
    title:'Decent Work & Economic Growth',
    description:'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all'
  },
  {
    key:9,
    image: require ('../assets/images/9_Industry.png'),
    selected:false,
    color:'#F36D24',
    title:'Industry, Innovation, and Infrastructure',
    description:'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation'
  },
  {
    key:10,
    image: require ('../assets/images/10_ReducedEquality.jpg'),
    selected:false,
    color:'#DE1768',
    title:'Reduced Inequalities',
    description:'Reduce inequality within and among countries'
  },
  {
    key:11,
    image: require ('../assets/images/11_SustainableCities.png'),
    selected:false,
    color:'#FA9D26',
    title:'Sustainable Cities and Communities',
    description:'Make cities and human settlements inclusive, safe, resilient and sustainable'
  },
  {
    key:12,
    image: require ('../assets/images/12_Recycle.png'),
    selected:false,
    color:'#CD8D29',
    title:'Responsible Consumption & Production',
    description:'Ensure sustainable consumption and production patterns'
  },
  {
    key:13,
    image: require ('../assets/images/13_Climate.png'),
    selected:false,
    color:'#47773D',
    title:'Climate Action',
    description:'Take urgent action to combat climate change and its impacts',
  },
  {
    key:14,
    image: require ('../assets/images/14_LifeBelowWeater.jpg'),
    selected:false,
    color:'#1F97D4',
    title:'Life Below Water',
    description:'Conserve and sustainably use the oceans, seas and marine resources for sustainable development'
  },
  {
    key:15,
    image: require ('../assets/images/15_LifeOnLand.png'),
    selected:false,
    color:'#3DB04B',
    title:'Life on Land',
    description:'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss'
  },
  {
    key:16,
    image: require ('../assets/images/16_Justice.png'),
    selected:false,
    color:'#025589',
    title:'Peace, Justice and Strong Institutions',
    description:'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels'
  },
  {
    key:17,
    image: require ('../assets/images/17_Parnerships.png'),
    selected:false,
    color:'#183668',
    title:'Partnerships for the Goals',
    description:'Strengthen the means of implementation and revitalize the global partnership for sustainable development'
  }
];

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
          {this.state.selected && <Text style={{fontSize:18, color:'white',justifyContent:'center', textAlign:'justify', margin:10, lineHeight:30}}>
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
          <SurveyPage2 images={sdgImages} status={this.state.status} /> : this.showPage1 () }
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
});
