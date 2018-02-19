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
import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
var ImagePicker = require('react-native-image-picker')
Translation.setConfig(ProviderTypes.Google, key,'ig');
export default class Paper extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      launches: 0,
      somePrimary:'',
      beyondSecondary:'',
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
    }
  }
  componentWillMount () {
    this.launchCamera()
  }
  launchCamera () {
    if (this.state.launches === 3) {
      return Actions.survey1()
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
    let result = await checkForLabels(this.state.dataString)
    await this.setState({returnedText:result.responses[0].textAnnotations[0].description, isLoading:false, done:true})
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
    this.parseCity()
    this.parseEmail()
    this.parseNumber()
    this.parseDisability()
  }
  getDisabilityType () {
    var physicalLocation = this.state.returnedText.indexOf('Physical')
    var visionLocation = this.state.returnedText.indexOf('Vision')
    var hearingLocation = this.state.returnedText.indexOf('Hearing')
    var speakingLocation = this.state.returnedText.indexOf('Speaking')
    var othersLocation = this.state.returnedText.lastIndexOf('Others')

    var physical = this.state.returnedText.substr(physicalLocation+8, 5).trim()
    var vision = this.state.returnedText.substr(visionLocation+6, 5).trim()
    var hearing = this.state.returnedText.substr(hearingLocation+7, 5).trim()
    var speaking = this.state.returnedText.substr(speakingLocation+8, 5).trim()
    var others = this.state.returnedText.substr(othersLocation+6, 5).trim()

    this.setState({physical:physical, vision:vision, hearing:hearing, speaking:speaking, others:others})
  }
  parseDisability () {
    var disabilityLocation = this.state.returnedText.indexOf('Disability: ')
    var disability = this.state.returnedText.substr(disabilityLocation+11, 5).trim()
    if (disability.toLowerCase() === 'yes') {
      this.getDisabilityType()
    } else {
      this.setState({physical:'No', vision:'No', hearing:'No', speaking:'No', others:'No'})
    }
    this.setState({disability:disability})
  }
  parseNumber () {
    var phoneLocation = this.state.returnedText.indexOf('Number: ')
    var remainder = this.state.returnedText.substr(phoneLocation + 8)
    var endLocation = remainder.indexOf('\n')
    var phone = remainder.substring(0, endLocation)
    this.setState({phone:phone})
  }
  parseEmail () {
    var cityLocation = this.state.returnedText.indexOf('Email: ')
    var remainder = this.state.returnedText.substr(cityLocation + 7)
    var endLocation = remainder.indexOf('\n')
    var email = remainder.substring(0, endLocation)
    this.setState({email:email})
  }
  parseCity () {
    var cityLocation = this.state.returnedText.indexOf('Village: ')
    var remainder = this.state.returnedText.substr(cityLocation + 9)
    var endLocation = remainder.indexOf('\n')
    var city = remainder.substring(0, endLocation)
    this.setState({city:city})
  }
  parseState () {
    var stateLocation = this.state.returnedText.indexOf('State: ')
    var remainder = this.state.returnedText.substr(stateLocation + 7)
    var endLocation = remainder.indexOf(' ')
    var state = remainder.substring(0, endLocation)
    this.setState({state:state})
  }
  parseCountry () {
    var countryLocation = this.state.returnedText.indexOf('Country: ')
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
      this.setState({gender:'Male', male:'Yes'})
    }else {
      var femaleLocation = this.state.returnedText.indexOf('Female')
      var female = this.state.returnedText.substr(femaleLocation + 6, 5)
      if (female.toLowerCase() === 'yes')
      this.setState({gender:'Female', female:'Yes'})
    }
  }
  parseEducation () {
    var somePrimaryLocation = this.state.returnedText.indexOf('Some Primary')
    var somePrimary = this.state.returnedText.substr(somePrimaryLocation+12, 5).trim()
    if (somePrimary.toLowerCase() === 'yes') {
      this.setState({somePrimary:'Yes'})
    }else {
      var finishedPrimaryLocation = this.state.returnedText.indexOf('Finished Primary')
      var finishedPrimary = this.state.returnedText.substr(finishedPrimaryLocation+16, 5).trim()
      if (finishedPrimary.toLowerCase() === 'yes') {
        this.setState({finishedPrimary:'Yes'})
      }else {
        var someSecondaryLocation = this.state.returnedText.indexOf('Finished Secondary')
        var someSecondary = this.state.returnedText.substr(someSecondaryLocation+14, 5).trim()
        if (someSecondary.toLowerCase() === 'yes') {
          this.setState({someSecondary:'Yes'})
        }else {
          var beyondSecondaryLocation = this.state.returnedText.indexOf('Beyond Secondary')
          var beyondSecondary = this.state.returnedText.substr(beyondSecondaryLocation+18, 5).trim()
          if (beyondSecondary.toLowerCase() === 'yes') {
            this.setState({beyondSecondary:'Yes'})
          }
        }
      }
    }
  }
  editData () {
    this.setState({editData:true})
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
            <Button style={{backgroundColor:'#1eaaf1', height:40, width:100, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}}>Continue</Button>
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
              {this.state.gender === 'Male' && <Text style={styles.textListing}>Male: {this.state.male}</Text> }
              {this.state.gender === 'Female' && <Text style={styles.textListing}>Female: {this.state.female}</Text> }
              <Text style={styles.textListing}>Age: {this.state.age}</Text>
              {this.state.somePrimary !== '' && <Text style={styles.textListing}>Some Primary: {this.state.somePrimary}</Text> }
              {this.state.finishedPrimary !== '' && <Text style={styles.textListing}>Finished Primary: {this.state.finishedPrimary}</Text> }
              {this.state.someSecondary !== '' && <Text style={styles.textListing}>Some Secondary: {this.state.someSecondary}</Text> }
              {this.state.beyondSecondary !== '' && <Text style={styles.textListing}>Beyond Secondary: {this.state.beyondSecondary}</Text> }
              <Text style={styles.textListing}>Country: {this.state.country}</Text>
              <Text style={styles.textListing}>State: {this.state.state}</Text>
              <Text style={styles.textListing}>City/Village: {this.state.city}</Text>
              <Text style={styles.textListing}>Email: {this.state.email}</Text>
              <Text style={styles.textListing}>Phone: {this.state.phone}</Text>
              <Text style={styles.textListing}>Disability: {this.state.disability}</Text>
              <Text style={styles.textListing}>Others: {this.state.others}</Text>
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
        <View style={{flex:1.5, flexDirection:'row'}}>
          <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
            <Button style={{backgroundColor:'#27ae60', height:40, width:100, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}} onPress={Actions.submit}>Submit</Button>
          </View>
          <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
            <Button onPress={()=> this.editData()} style={{backgroundColor:'#3498db', height:40, width:100, borderColor:'transparent', margin: 10}} textStyle={{fontSize: 18, color:'white'}}>Edit</Button>
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
          console.log('success');
            return response.json();
        }, (err) => {
            console.error('promise rejected')
            console.error(err)
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
