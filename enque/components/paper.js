/*
  Author: Richard Igbiriki
  @2018

  Paper scans are performed here.

  Scans are either edited for appropriate fields then passed to form.js as params
  Or they are submitted directly to the databases (offline/online)

  Text parsing is based on criteria searches...
*/
import React, { Component } from 'react';
import {Platform,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableHighlight,
  ScrollView,
  TextInput,
  Picker,
  KeyboardAvoidingView,} from 'react-native';
import Button from 'apsl-react-native-button'
import Header from './header'
import { Actions } from 'react-native-router-flux';
import {insertSurvey} from '../databases/schemas'
import realm from '../databases/schemas'
var ImagePicker = require('react-native-image-picker')

export default class Paper extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      launches: 0,
      somePrimary:'',
      beyondSecondary:'',
      user_id:'',
      partner_id:'',
      editData:false,
      someSecondary:'',
      finishedPrimary:'',
      images:[
        {
          key:1,
          image: require ('../assets/images/1_Poverty_SDG.png'),
          selected:false,
          color:'#EB1C2E',
          title:'Poverty',
          description:'End poverty in all its forms everywhere',
          score:0,
       },
        {
          key:2,
          image: require ('../assets/images/2_ZeroHunger.jpg'),
          selected:false,
          color:'#DDA73A',
          title:'Zero Hunger',
          description:'End hunger, achieve food security and improved nutrition and promote sustainable agriculture',
          score:0,
        },
        {
          key:3,
          image: require ('../assets/images/3_GoodHealthCare.jpg'),
          selected:false,
          color:'#49A341',
          title: 'Good Health and Well-Being',
          description:'Ensure healthy lives and promote well-being for all at all ages',
          score:0,
        },
        {
          key:4,
          image: require ('../assets/images/4_Education.png'),
          selected:false,
          color:'#C21F32',
          title:'Quality Education',
          description:'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all',
          score:0
        },
        {
          key:5,
          image: require ('../assets/images/5_Gender.jpg'),
          selected:false,
          color:'#EF402D',
          title:'Gender Equality',
          description:'Achieve gender equality and empower all women and girls',
          score:0
        },
        {
          key:6,
          image: require ('../assets/images/6_CleanWater.png'),
          selected:false,
          color:'#01AED9',
          title:'Clean Water and Sanitation',
          description:'Ensure availability and sustainable management of water and sanitation for all',
          score:0
        },
        {
          key:7,
          image: require ('../assets/images/7_Energy.jpg'),
          selected:false,
          color:'#FBC412',
          title:'Affordable and Clean Energy',
          description:'Ensure access to affordable, reliable, sustainable and modern energy for all',
          score:0
        },
        {
          key:8,
          image: require ('../assets/images/8_DecentWork.png'),
          selected:false,
          color:'#8F1838',
          title:'Decent Work & Economic Growth',
          description:'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all',
          score:0
        },
        {
          key:9,
          image: require ('../assets/images/9_Industry.png'),
          selected:false,
          color:'#F36D24',
          title:'Industry, Innovation, and Infrastructure',
          description:'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation',
          score:0
        },
        {
          key:10,
          image: require ('../assets/images/10_ReducedEquality.jpg'),
          selected:false,
          color:'#DE1768',
          title:'Reduced Inequalities',
          description:'Reduce inequality within and among countries',
          score:0
        },
        {
          key:11,
          image: require ('../assets/images/11_SustainableCities.png'),
          selected:false,
          color:'#FA9D26',
          title:'Sustainable Cities and Communities',
          description:'Make cities and human settlements inclusive, safe, resilient and sustainable',
          score:0
        },
        {
          key:12,
          image: require ('../assets/images/12_Recycle.png'),
          selected:false,
          color:'#CD8D29',
          title:'Responsible Consumption & Production',
          description:'Ensure sustainable consumption and production patterns',
          score:0
        },
        {
          key:13,
          image: require ('../assets/images/13_Climate.png'),
          selected:false,
          color:'#47773D',
          title:'Climate Action',
          description:'Take urgent action to combat climate change and its impacts',
          score:0
        },
        {
          key:14,
          image: require ('../assets/images/14_LifeBelowWeater.jpg'),
          selected:false,
          color:'#1F97D4',
          title:'Life Below Water',
          description:'Conserve and sustainably use the oceans, seas and marine resources for sustainable development',
          score:0
        },
        {
          key:15,
          image: require ('../assets/images/15_LifeOnLand.png'),
          selected:false,
          color:'#3DB04B',
          title:'Life on Land',
          description:'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss',
          score:0
        },
        {
          key:16,
          image: require ('../assets/images/16_Justice.png'),
          selected:false,
          color:'#025589',
          title:'Peace, Justice and Strong Institutions',
          description:'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels',
          score:0
        },
        {
          key:17,
          image: require ('../assets/images/17_Parnerships.png'),
          selected:false,
          color:'#183668',
          title:'Partnerships for the Goals',
          description:'Strengthen the means of implementation and revitalize the global partnership for sustainable development',
          score:0
        }
      ],
    }
  }
  async componentWillMount () {
    var partner_id = await AsyncStorage.getItem('partner_id')
    var user_id = await AsyncStorage.getItem('user_id')
    this.setState({partner_id, user_id})
    this.launchCamera()
  }
  componentDidMount () {
    this.checkInternet()
  }
  async checkInternet () {
    var status = await AsyncStorage.getItem('status')
    if (status === 'true') {
      this.setState({upload:true})
    }
  }
  launchCamera () {
    //After four camera launches, continue to manual survey entry
    if (this.state.launches === 3) {
      return Actions.survey()
    }else {
      this.startCamera()
    }
  }
  startCamera () {
    this.setState({launches: this.state.launches + 1, submittable:false})
    var options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.launchCamera(options, (response)  => {
      if (response.didCancel) {
      }
      else if (response.error) {
      }
      else {
        let source = { uri: response.uri }
        let b64 = response.data
        this.setState({
          profilePicture: source.uri,
          dataString:b64,
          done:false
        })
      }
    });
  }
  async uploadImage () {
    this.setState({isLoading:true})
    //Call Google Cloud Vision Api to return text labels of image
    let result = await checkForLabels(this.state.dataString)
    await this.setState({returnedText:result.responses[0].textAnnotations[0].description, isLoading:false, done:true})
    //Format user info based on text returned
    this.getUserDetails()
    this.getQ1()
    this.getQ2()
    this.getQ3()
  }
  getQ3 () {
    var startLocation = this.state.returnedText.indexOf('Better')
    var string = this.state.returnedText.substring(startLocation + 6)
    var scores = string.split('\n')
    var g1 = this.checkCharacters( scores[1].substring( scores[1].indexOf(':') + 1 ).trim() )
    var g2 = this.checkCharacters ( scores[2].substring( scores[2].indexOf(':') + 1 ).trim() )
    var g3 = this.checkCharacters ( scores[3].substring( scores[3].indexOf(':') + 1 ).trim() )
    var g4 = this.checkCharacters ( scores[4].substring( scores[4].indexOf(':') + 1 ).trim() )
    var g5 = this.checkCharacters ( scores[5].substring( scores[5].indexOf(':') + 1 ).trim() )
    var g6 = this.checkCharacters ( scores[6].substring( scores[6].indexOf(':') + 1 ).trim() )

    this.setState({
      s1:g1,
      s2:g2,
      s3:g3,
      s4:g4,
      s5:g5,
      s6:g6
    })
  }
  getQ2 () {
    var startLocation = this.state.returnedText.indexOf('17)')
    var endLocation = this.state.returnedText.indexOf('3.')
    var string = this.state.returnedText.substring(startLocation+3, endLocation)
    var scores = string.split("\n")
    var g1 = this.checkCharacters ( scores[1].substring( scores[1].indexOf(':') + 1 ).trim() )
    var g2 = this.checkCharacters ( scores[2].substring( scores[2].indexOf(':') + 1 ).trim() )
    var g3 = this.checkCharacters ( scores[3].substring( scores[3].indexOf(':') + 1 ).trim() )
    var g4 = this.checkCharacters ( scores[4].substring( scores[4].indexOf(':') + 1 ).trim() )
    var g5 = this.checkCharacters ( scores[5].substring( scores[5].indexOf(':') + 1 ).trim() )
    var g6 = this.checkCharacters ( scores[6].substring( scores[6].indexOf(':') + 1 ).trim() )

    if (g1 && g3 && g3 && g4 && g5 && g6) {
      this.setState({
        g1:g1,
        g2:g2,
        g3:g3,
        g4:g4,
        g5:g5,
        g6:g6,
        submittable:true
      })
    }
  }
  checkCharacters (char) {
    if (char === 'Z' || char ==='z') return '7'
    if (char === 'I' || char === 'i') return '1'
    if (char === 'S') return '5'
    if (char === '+' ) return '4'
    if (char.toLowerCase() === 'o') return '0'
    if (char.toLowerCase() === 'b') return '6'
    if (Number (char)) return Math.abs(char).toString()
    return '1'
  }
  getQ1 () {
    var startLocation = this.state.returnedText.indexOf('2015?')
    var q1 = this.state.returnedText.substr(startLocation + 5, 5).trim()
    this.setState({q1:q1.toLowerCase()})
  }
  getUserDetails () {
    this.parseGender ()
    this.parseEducation ()
    this.parseAge()
    this.parseCountry()
    this.parseState()
    this.parseDisability()
  }
  getDisabilityType () {
    var physicalLocation = this.state.returnedText.indexOf('Physical')
    var physical = this.state.returnedText.substr(physicalLocation+8, 5).trim()
    if (physical.toLowerCase() === 'yes' ) {
      this.setState({disability_type:'1'})
    }else {
      var visionLocation = this.state.returnedText.indexOf('Vision')
      var vision = this.state.returnedText.substr(visionLocation+6, 5).trim()
      if (vision.toLowerCase()) {
        this.setState({disability_type:'2'})
      }else {
        var hearingLocation = this.state.returnedText.indexOf('Hearing')
        var hearing = this.state.returnedText.substr(hearingLocation+7, 5).trim()
        if (hearing.toLowerCase() === 'yes' ) {
          this.setState({disability_type:'3'})
        }else {
          var speakingLocation = this.state.returnedText.indexOf('Speaking')
          var speaking = this.state.returnedText.substr(speakingLocation+8, 5).trim()
          if (speaking.toLowerCase() === 'yes' ) {
            this.setState({disability_type:'4'})
          }else {
            this.setState({disability_type:'5'})
          }
        }
      }
    }
  }
  parseDisability () {
    var disabilityLocation = this.state.returnedText.indexOf('Disability: ')
    var disability = this.state.returnedText.substr(disabilityLocation+11, 5).trim()
    if (disability.toLowerCase() === 'yes') {
      this.getDisabilityType()
      this.setState({disability:'yes'})
    } else {
      this.setState({disability:'no', disability_type:'0'})
    }
  }
  parseState () {
    var stateLocation = this.state.returnedText.indexOf('State: ')
    var remainder = this.state.returnedText.substr(stateLocation + 7)
    var endLocation = remainder.indexOf(' ')
    var state = remainder.substring(0, endLocation)
    this.setState({state:state})
  }
  parseCountry () {
    var countryLocation = this.state.returnedText.indexOf('Country ')
    var remainder = this.state.returnedText.substr(countryLocation + 9)
    var endLocation = remainder.indexOf(' ')
    var country = remainder.substring(0, endLocation)
    this.setState({country:country})
  }
  parseAge () {
      var ageLocation = this.state.returnedText.indexOf('Age:')
      var age = this.state.returnedText.substr(ageLocation + 4, 3).trim()
      this.setState({age:age})
  }
  parseGender () {
    var maleLocation = this.state.returnedText.indexOf('Male')
    var male = this.state.returnedText.substr(maleLocation + 4, 5).trim()
    if (male.toLowerCase() === 'yes') {
      this.setState({gender:'male'})
    }else {
      var femaleLocation = this.state.returnedText.indexOf('Female')
      var female = this.state.returnedText.substr(femaleLocation + 6, 5)
      if (female.toLowerCase() === 'yes') {
          this.setState({gender:'female'})
        } else {
          this.setState({gender:''})
        }
      }
  }
  parseEducation () {
    var somePrimaryLocation = this.state.returnedText.indexOf('Some Primary')
    var somePrimary = this.state.returnedText.substr(somePrimaryLocation+12, 5).trim()
    if (somePrimary.toLowerCase() === 'yes') {
      this.setState({education:'1', educationTitle:'Some Primary' })
    }else {
      var finishedPrimaryLocation = this.state.returnedText.indexOf('Finished Primary')
      var finishedPrimary = this.state.returnedText.substr(finishedPrimaryLocation+16, 5).trim()
      if (finishedPrimary.toLowerCase() === 'yes') {
        this.setState({education:'2', educationTitle:'Finished Primary'})
      }else {
        var someSecondaryLocation = this.state.returnedText.indexOf('Finished Secondary')
        var someSecondary = this.state.returnedText.substr(someSecondaryLocation+14, 5).trim()
        if (someSecondary.toLowerCase() === 'yes') {
          this.setState({education:'3', educationTitle:'Finished Secondary' })
        }else {
          var beyondSecondaryLocation = this.state.returnedText.indexOf('Beyond Secondary')
          var beyondSecondary = this.state.returnedText.substr(beyondSecondaryLocation+18, 5).trim()
          if (beyondSecondary.toLowerCase() === 'yes') {
            this.setState({education:'4', educationTitle:' Beyond Secondary'})
          }else {
            this.setState({education:''})
          }
        }
      }
    }
  }
  editData () {
    this.setState({editData:true})
  }
  async updateImages () {
    //Working with the knowledge that goals keys are one more than the index in state
    //Update selected goals
    var clone = this.state.images
    clone[ Number (this.state.g1) - 1].selected = true
    clone[ Number (this.state.g2) - 1].selected = true
    clone[ Number (this.state.g3) - 1].selected = true
    clone[ Number (this.state.g4) - 1].selected = true
    clone[ Number (this.state.g5) - 1].selected = true
    clone[ Number (this.state.g6) - 1].selected = true
    //Update scores for selected goals
    clone[ Number (this.state.g1) - 1 ].score = Number (this.state.s1)
    clone[ Number (this.state.g2) - 1 ].score = Number (this.state.s2)
    clone[ Number (this.state.g3) - 1 ].score = Number (this.state.s3)
    clone[ Number (this.state.g4) - 1 ].score = Number (this.state.s4)
    clone[ Number (this.state.g5) - 1 ].score = Number (this.state.s5)
    clone[ Number (this.state.g6) - 1 ].score = Number (this.state.s6)

    await this.setState({images:clone})
  }
  continue (type) {
    this.updateImages()
    var q1 = this.state.q1

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

    var q3_goal1 = this.state.images[0].score
    var q3_goal2 = this.state.images[1].score
    var q3_goal3 = this.state.images[2].score
    var q3_goal4 = this.state.images[3].score
    var q3_goal5 = this.state.images[4].score
    var q3_goal6 = this.state.images[5].score
    var q3_goal7 = this.state.images[6].score
    var q3_goal8 = this.state.images[7].score
    var q3_goal9 = this.state.images[8].score
    var q3_goal10 = this.state.images[9].score
    var q3_goal11 = this.state.images[10].score
    var q3_goal12 = this.state.images[11].score
    var q3_goal13 = this.state.images[12].score
    var q3_goal14 = this.state.images[13].score
    var q3_goal15 = this.state.images[14].score
    var q3_goal16 = this.state.images[15].score
    var q3_goal17 = this.state.images[16].score
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
    var userInfo = {
      gender:this.state.gender,
      age:this.state.age,
      education:this.state.education,
      country:this.state.country,
      city:this.state.city,
      email:this.state.email,
      phone:this.state.phone,
      disability:this.state.disability_type
    }
    if (type === 'edit') {
      Actions.replace('form', {data:data,userInfo: userInfo})
    } else {
      this.saveSurvey(data, userInfo)
    }
  }
  saveSurvey (data, userInfo) {
    this.setState({loading:true})
    var auth = this.authenticateData()
    if (auth) {
      if (userInfo.disability === '0') {
        data['disability'] = 'no'
        data['disability_type'] = 0
      }else {
        data['disability'] = 'yes'
        data['disability_type'] = Number(userInfo.disability)
      }
      data['gender'] = this.state.gender
      data['education_level'] = Number(this.state.education)
      data['city'] = this.state.city
      data['age'] = Number(this.state.age)
      data['country'] = this.state.country
      data['partner_id'] = this.state.partner_id
      data['user_id'] = this.state.user_id
      data['start'] = Date.now()
      data['end'] = Date.now()
      data['method'] = 'online'
      data['submission_date'] = Date.now()
      data['id'] = Math.floor(Date.now()/1000)
      if (this.state.upload) {
        this.saveOnline(data)
      }else {
        insertSurvey(data).then(()=>{
          this.setState({loading:false})
          return Actions.subscribe({email:this.state.email})
        }).catch((error)=> {
          this.setState({loading:false})
           alert(`Insert error ${error}`)
        })
      }
    }else {
      alert('Incomplete form. Fill all fields.')
      this.setState({loading:false})
    }
  }
  authenticateData () {
    return this.state.disability && this.state.gender && this.state.education && this.state.age && this.state.country && this.state.city
  }
  async saveOnline (data) {
    let response = await fetch('https://afridash.com/enque/saveToMysql.php',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })
    let responseJson = await response.json()
    if (responseJson.success === '1') {
      this.setState({loading:false})
      return Actions.subscribe({email:this.state.email})
    }else {
      alert(responseJson.success)
      insertSurvey(data).then(()=>{
        this.setState({loading:false})
        return Actions.subscribe({email:this.state.email})
      }).catch((error)=> {
        this.setState({loading:false})
         alert(`Insert error ${error}`)
      })
    }
  }
  showEdit () {
    return (
      <View style={{margin:10, flex:1}}>
           <ScrollView style={{flex:2}}>
            <View style={{flex:1}}>
              <View style={styles.header}>
                <Text style={{alignItems:'center', flexDirection:'row', justifyContent:'center', fontSize:20}}>Questions </Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textListing}>Q1: </Text>
                <Picker
                  style={{flex:1}}
                  selectedValue={this.state.q1}
                  onValueChange={(itemValue, itemIndex) => this.setState({q1: itemValue})}>
                  <Picker.Item value='' label='' />
                  <Picker.Item label="Yes" value="yes" />
                  <Picker.Item label="No" value="no" />
                </Picker>
              </View>

              <View style={styles.header}>
                <Text style={{alignItems:'center', flexDirection:'row', justifyContent:'center', fontSize:20}}>Question 2 </Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.textListing}>Goal 1: </Text>
                <TextInput keyboardType='numeric' defaultValue={this.state.g1} maxLength={2} onChangeText={(g1)=>this.setState({g1})} style={styles.input} placeholder={this.state.g1}/>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textListing}>Goal 2: </Text>
                <TextInput keyboardType='numeric' defaultValue={this.state.g2} maxLength={2} onChangeText={(g2)=>this.setState({g2})} style={styles.input} placeholder={this.state.g2}/>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textListing}>Goal 3: </Text>
                <TextInput keyboardType='numeric' defaultValue={this.state.g3} maxLength={2} onChangeText={(g3)=>this.setState({g3})} style={styles.input} placeholder={this.state.g3}/>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textListing}>Goal 4: </Text>
                <TextInput keyboardType='numeric' defaultValue={this.state.g4} maxLength={2} onChangeText={(g4)=>this.setState({g4})} style={styles.input} placeholder={this.state.g4}/>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textListing}>Goal 5: </Text>
                <TextInput keyboardType='numeric' defaultValue={this.state.g5} maxLength={2} onChangeText={(g5)=>this.setState({g5})} style={styles.input} placeholder={this.state.g5}/>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textListing}>Goal 6: </Text>
                <TextInput keyboardType='numeric' defaultValue={this.state.g6} maxLength={2} onChangeText={(g6)=>this.setState({g6})} style={styles.input} placeholder={this.state.g6}/>
              </View>

              <View style={styles.header}>
                <Text style={{fontSize:20}}>Question 3 </Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.textListing}>Goal 1: </Text>
                <TextInput keyboardType='numeric' defaultValue={this.state.s1} maxLength={1} onChangeText={(s1)=>this.setState({s1})} style={styles.input} placeholder={this.state.s1}/>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.textListing}>Goal 2: </Text>
                <TextInput keyboardType='numeric' defaultValue={this.state.s2} maxLength={1} onChangeText={(s2)=>this.setState({s2})} style={styles.input} placeholder={this.state.s2}/>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.textListing}>Goal 3: </Text>
                <TextInput keyboardType='numeric' defaultValue={this.state.s3} maxLength={1} onChangeText={(s3)=>this.setState({s3})} style={styles.input} placeholder={this.state.s3}/>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.textListing}>Goal 4: </Text>
                <TextInput keyboardType='numeric' defaultValue={this.state.s4} maxLength={1} onChangeText={(s4)=>this.setState({s4})} style={styles.input} placeholder={this.state.s4}/>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.textListing}>Goal 5: </Text>
                <TextInput keyboardType='numeric' defaultValue={this.state.s5} maxLength={1} onChangeText={(s5)=>this.setState({s5})} style={styles.input} placeholder={this.state.s5}/>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.textListing}>Goal 6: </Text>
                <TextInput keyboardType='numeric' defaultValue={this.state.s6} maxLength={1} onChangeText={(s6)=>this.setState({s6})} style={styles.input} placeholder={this.state.s6}/>
              </View>

            </View>
          </ScrollView>
        <View style={{flexDirection:'row'}}>
          <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
            <Button onPress={()=> this.continue('edit')} style={{backgroundColor:'#1eaaf1', height:40, width:100, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}}>Continue</Button>
          </View>
        </View>
    </View>
    )
  }
  cameraView () {
    return (
      <View style={{margin:10, flex:1}}>
      <View style={{flex:10, borderRadius:5, borderColor:'grey',borderWidth:2}}>
          {this.state.done ? <ScrollView style={{flex:1}}>
            <View style={{flex:1}}>
              <Text style={styles.textListing}>Gender: {this.state.gender}</Text>
              <Text style={styles.textListing}>Age: {this.state.age}</Text>
              <Text style={styles.textListing}>Education: {this.state.educationTitle}</Text>
              <Text style={styles.textListing}>Country: {this.state.country}</Text>
              <Text style={styles.textListing}>State: {this.state.state}</Text>
              <Text style={styles.textListing}>City/Village: {this.state.city}</Text>
              <Text style={styles.textListing}>Phone: {this.state.phone}</Text>
              <Text style={styles.textListing}>Disability: {this.state.disability}</Text>
              <Text style={styles.textListing}>Type: {this.state.disability_type}</Text>
              <Text style={{alignItems:'center', flexDirection:'row', justifyContent:'center', fontSize:18}}>Questions </Text>
              <Text style={styles.textListing}>Question 1</Text>
              <Text style={styles.textListing}>Q1: {this.state.q1}</Text>
              <Text style={styles.textListing}>Question 2</Text>
              <Text style={styles.textListing}>Goal 1: {this.state.g1}</Text>
              <Text style={styles.textListing}>Goal 2: {this.state.g2}</Text>
              <Text style={styles.textListing}>Goal 3: {this.state.g3}</Text>
              <Text style={styles.textListing}>Goal 4: {this.state.g4}</Text>
              <Text style={styles.textListing}>Goal 5: {this.state.g5}</Text>
              <Text style={styles.textListing}>Goal 6: {this.state.g6}</Text>
              <Text style={styles.textListing}>Question 3</Text>
              <Text style={styles.textListing}>Goal 1: {this.state.s1}</Text>
              <Text style={styles.textListing}>Goal 2: {this.state.s2}</Text>
              <Text style={styles.textListing}>Goal 3: {this.state.s3}</Text>
              <Text style={styles.textListing}>Goal 4: {this.state.s4}</Text>
              <Text style={styles.textListing}>Goal 5: {this.state.s5}</Text>
              <Text style={styles.textListing}>Goal 6: {this.state.s6}</Text>
            </View>
          </ScrollView>
           : <Image source={{uri: this.state.profilePicture}} style={{flex:1}} resizeMode={'stretch'} />}
      </View>
    <View style={{flex:1.5, flexDirection:'row'}}>
      {this.state.submittable &&
        <View style={{flex:1.5, flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
            <Button isLoading={this.state.loading} style={{backgroundColor:'#27ae60', height:40, flex:1,  borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}} onPress={()=>this.continue('save')}>Submit</Button>
          </View>
          <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
            <Button onPress={()=> this.editData()} style={{backgroundColor:'#3498db', flex:1, height:40, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}}>Edit</Button>
          </View>
        </View>
      }
      <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
        <Button onPress={()=>this.launchCamera()} style={{backgroundColor:'#EB1C2E', height:40, width:100, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}} >Retake</Button>
      </View>
      {!this.state.done &&
        <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
          <Button isLoading={this.state.isLoading} onPress={()=>this.uploadImage()} style={{backgroundColor:'#49A341', height:40, width:100, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}}>Upload</Button>
        </View>
      }
    </View>
    </View>
    )
  }
  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
        <Header backButton={true} title='Paper Scan' noAdd={true} />
        {this.state.editData ? this.showEdit() :
        this.cameraView()
      }
      </KeyboardAvoidingView>
    );
  }
}
async function checkForLabels(base64) {
  return await
        fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo', {
            method: 'POST',
            body: JSON.stringify({
                "requests": [
                    {
                        "image": {
                            "content": base64
                        },
                        "features": [
                            {
                                "type": "TEXT_DETECTION"
                            }
                        ]
                    }
                ]
            })
        }).then((response) => {
            return response.json();
        }, (err) => {
            console.error('promise rejected')
        });
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list:{
    flex:1,
  },
  text:{
    margin:10,
    fontSize: 20,
    flex:5,
    },
    home:{
      resizeMode: 'contain',
      width: 30,
      height: 30,
      alignItems:'flex-end',
      margin:10,
    },
    textListing :{
      margin:10,
      padding:5,
      fontSize:18
    },
    inputContainer:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      borderBottomWidth:0.5,
      borderColor:'lightgrey'
    },
    input:{
      flex:1,
      margin:5,
      height:40,
      fontSize:18,
     },
     header:{
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'center',
       padding:10
     },
});
