/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import RadioButton from 'react-native-radio-button';
import RadioForm, {RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import * as Animatable from 'react-native-animatable';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  FlatList,
  Image,
  TouchableHighlight,
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Button from 'apsl-react-native-button'
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig');
var radio_props = [
  {label: '1', value: 1 },
  {label: '2', value: 2 },
  {label: '3', value: 3 },
  {label: '4', value: 4 },
  {label: '5', value: 5 },
];
export default class SurveyPage2 extends Component {
  constructor (props) {
    super (props)
    this.state = {
      translated:'',
      images:[
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
      ],
      selectedImages:[],
      value:0,
    }
    this.selected = 0
    this.selectedImages = []
    this.feedbacks = []
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
  componentWillUnmount () {
    this.setState({images:[], selectedImages:[]})
  }
  toggleSelected (item, index) {
     if (item.selected) {
       this.selected--
       this.setSelected(item, index)
       this.selectedImages = this.selectedImages.filter((i)=> i.key !== item.key)
       this.setState({selectedImages:this.selectedImages})
     } else if (!item.selected && this.selected < 6) {
       this.selected++
       this.setSelected(item, index)
       this.selectedImages.push(item)
       this.setState({selectedImages:this.selectedImages})
     }
     if (this.selected === 6) {
       this.setState({selectionDone:true})
     }
  }
  async setSelected (item, index) {
    item.selected = !item.selected
    var clone = this.state.images
    clone[index] = item
    await this.setState({images:clone})
  }
  handleRadio (sdgId, score) {
    this.feedbacks[sdgId] = score
  }
  renderItem = ({item, index}) => {
    return (
      <TouchableHighlight onPress={()=>this.toggleSelected(item, index)}
         key={index} style={{flexDirection:'row', alignItems:'center', marginBottom:5}}>
        <View style={{flex:1, flexDirection:'row', backgroundColor: (item.selected) ? item.color : 'white', alignItems:'center'}}>
          <View style={{flexDirection:'row'}}>
            <Image source={item.image} style={{width:100, height:100,}} resizeMode={'stretch'} />
          </View>
            <Text style={{padding:5, flex:1, textAlign:'justify'}}>{item.description}</Text>
          <Image source={require('../assets/images/mark.png')} style={{width:20, height:20, tintColor: item.selected ? 'white' : 'lightgrey'}} resizeMode={'contain'} />
        </View>
      </TouchableHighlight>
    )
  }
  renderSelected = ({item, index}) => {
    return (
       <View
         key={index} style={{justifyContent:'center', marginBottom:5}}>
        <View style={{flex:1, flexDirection:'row', backgroundColor: (item.selected) ? item.color : 'white', alignItems:'center'}}>
          <Image source={item.image} style={{width:100, height:100,}} resizeMode={'stretch'} />
          <Text style={{fontSize:20, fontWeight:'600', color:'white', flex:1}}>{item.title}</Text>
        </View>
        <View style={{padding:5, flexDirection:'row', justifyContent:'space-between'}}>
          <Text>1. Got Worse </Text>
          <Text>3. Stayed the same </Text>
          <Text>5. Got better</Text>
        </View>
        <View style={{flex:1, padding:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <RadioForm
            style={{flex:1, flexDirection:'row'}}
            formHorizontal={true}
            labelHorizontal={true}
            animation={true}
            radio_props={radio_props}
            initial={0}
            onPress={(value) => this.handleRadio(item.key, value)}
          />
          </View>
        </View>
    )
  }
  listFooter = () => {
    return (<Button style={styles.submit} textStyle={{fontSize: 18, color:'white'}} onPress={()=>this.setState({selectionDone:true})}>NEXT</Button>)
  }
  showList () {
    return (
      <View style={{flex:1}}>
        <Text style={styles.question}>WHICH SIX OF THE FOLLOWING GLOBAL GOALS ARE OF IMMEDIATE CONCERN TO YOU AND YOUR FAMILY?</Text>
          <FlatList
            data={this.state.images}
            renderItem={this.renderItem}
            extraData={this.state}
            ListFooterComponent={this.listFooter}
          />
      </View>
    )
  }
  renderFooter = () => {
    return (<Button style={styles.submit} textStyle={{fontSize: 18, color:'white'}} onPress={()=>this.saveTemp()}>Continue</Button>)
  }
  showQuestions () {
    return (
      <View style={{flex:1}}>
        <Text style={{textAlign:'center', color:'red', justifyContent:'center', fontSize:16, padding:10}} onPress={()=>this.setState({selectionDone:false})}>Show Goals</Text>
        <Text style={styles.question}>WOULD YOU SAY THE SITUATION ON YOUR CHOSEN GOAL HAS GOT BETTER, STAYED THE SAME OR GOT WORSE OVER THE PAST 12 MONTHS?</Text>
        <View style={{flex:1}}>
          <FlatList
            data={this.state.selectedImages}
            renderItem={this.renderSelected}
            extraData={this.state}
            style={{marginBottom:10}}
            ListFooterComponent={this.renderFooter}
          />
        </View>
      </View>
    )
  }
  saveTemp (demo) {
    var q1 = this.props.status

    var q2_goal1 = this.state.images[0].selected ? 1 : 0
    var q2_goal2 = this.state.images[1].selected ? 1 : 0
    var q2_goal3 = this.state.images[2].selected ? 1 : 0
    var q2_goal4 = this.state.images[3].selected ? 1 : 0
    var q2_goal5 = this.state.images[4].selected ? 1 : 0
    var q2_goal6 = this.state.images[5].selected ? 1 : 0
    var q2_goal7 = this.state.images[6].selected ? 1 : 0
    var q2_goal8 = this.state.images[7].selected ? 1 : 0
    var q2_goal9 = this.state.images[8].selected ? 1 : 0
    var q2_goal10 = this.state.images[9].selected ? 1 : 0
    var q2_goal11 = this.state.images[10].selected ? 1 : 0
    var q2_goal12 = this.state.images[11].selected ? 1 : 0
    var q2_goal13 = this.state.images[13].selected ? 1 : 0
    var q2_goal14 = this.state.images[14].selected ? 1 : 0
    var q2_goal15 = this.state.images[15].selected ? 1 : 0
    var q2_goal16 = this.state.images[15].selected ? 1 : 0
    var q2_goal17 = this.state.images[16].selected ? 1 : 0

    var q3_goal1 = q2_goal1 !== 0 ? this.feedbacks[1] : 0
    var q3_goal2 = q2_goal2 !== 0 ? this.feedbacks[2] : 0
    var q3_goal3 = q2_goal3 !== 0 ? this.feedbacks[3] : 0
    var q3_goal4 = q2_goal4 !== 0 ? this.feedbacks[4] : 0
    var q3_goal5 = q2_goal5 !== 0 ? this.feedbacks[5] : 0
    var q3_goal6 = q2_goal6 !== 0 ? this.feedbacks[6] : 0
    var q3_goal7 = q2_goal7 !== 0 ? this.feedbacks[7] : 0
    var q3_goal8 = q2_goal8 !== 0 ? this.feedbacks[8] : 0
    var q3_goal9 = q2_goal9 !== 0 ? this.feedbacks[9] : 0
    var q3_goal10 = q2_goal10 !== 0 ? this.feedbacks[10] : 0
    var q3_goal11 = q2_goal11 !== 0 ? this.feedbacks[11] : 0
    var q3_goal12 = q2_goal12 !== 0 ? this.feedbacks[12] : 0
    var q3_goal13 = q2_goal13 !== 0 ? this.feedbacks[13] : 0
    var q3_goal14 = q2_goal14 !== 0 ? this.feedbacks[14] : 0
    var q3_goal15 = q2_goal15 !== 0 ? this.feedbacks[15] : 0
    var q3_goal16 = q2_goal16 !== 0 ? this.feedbacks[16] : 0
    var q3_goal17 = q2_goal17 !== 0 ? this.feedbacks[17] : 0
    var data = {
      q1: q1,
      q2_goal1: q2_goal1,
      q2_goal2: q2_goal2,
      q2_goal3: q2_goal3,
      q2_goal4: q2_goal4,
      q2_goal5: q2_goal5,
      q2_goal6: q2_goal6,
      q2_goal7: q2_goal7,
      q2_goal8: q2_goal8,
      q2_goal9: q2_goal9,
      q2_goal10: q2_goal10,
      q2_goal11: q2_goal11,
      q2_goal12: q2_goal12,
      q2_goal13: q2_goal13,
      q2_goal14: q2_goal14,
      q2_goal15: q2_goal15,
      q2_goal16: q2_goal16,
      q2_goal17: q2_goal17,
      q3_goal1: q3_goal1,
      q3_goal2: q3_goal2,
      q3_goal3: q3_goal3,
      q3_goal4: q3_goal4,
      q3_goal5: q3_goal5,
      q3_goal6: q3_goal6,
      q3_goal7: q3_goal7,
      q3_goal8: q3_goal8,
      q3_goal9: q3_goal9,
      q3_goal10: q3_goal10,
      q3_goal11: q3_goal11,
      q3_goal12: q3_goal12,
      q3_goal13: q3_goal13,
      q3_goal14: q3_goal14,
      q3_goal15: q3_goal15,
      q3_goal16: q3_goal16,
      q3_goal17: q3_goal17,
    }
    this.setState({images:[], selectedImages:[]})
    Actions.replace('form', {data:data})
  }
  render () {
    return (
      <View style={styles.container}>
        {this.state.selectionDone ? this.showQuestions() : this.showList() }
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
  },
  question: {
    fontSize: 20,
    textAlign: 'justify',
    lineHeight:30,
    padding:5
  },
  submit:{
    backgroundColor:'#49A341',
     height:40,
    borderColor:'transparent',
    marginRight: 10,

  },
  next:{
    backgroundColor:'#49A341',
     height:40,
    borderColor:'transparent',
    marginRight: 10,

  },
});
