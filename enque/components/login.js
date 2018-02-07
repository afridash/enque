import React from 'react';
import {
  StyleSheet,
  Text,
  View ,
  Image,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Button from 'apsl-react-native-button'

export default class Login extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      email:'',
      password:'',
      isLoading: false,
    }
  }
  componentWillMount () {
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#15354e'} barStyle='light-content' />
        <Image source={require('../assets/images/icon.png')} resizeMode={'contain'} style={styles.logo} />
        <View style={{flex:1}}>
          <View style={{width:300, flex:1}}>
            <TextInput
              style={{
                height:40,
                fontSize:14,
                color:'white',
                margin:20,
                padding:10,
                borderColor:'gray',
                borderWidth:1,
              }}
              keyboardType='default'
              placeholder='Email'
              autoCapitalize='none'
              autoCorrect={false}
              placeholderTextColor={'white'}
              onChangeText={(email) => this.setState({email})}
              onSubmitEditing={() => { this.passwordinput.focus() }}
              returnKeyType='next'
            />
          </View>
          <View style={{flex:1, width:300, marginTop:30}}>
            <TextInput
              style={{
                fontSize:14,
                color:'white',
                height:40,
                margin:20,
                padding:10,
                borderColor:'gray',
                borderWidth:1,
              }}
              returnKeyType='go'
              ref={(input) => this.passwordinput = input}
              autoCorrect={false}
              autoCapitalize='none'
              keyboardAppearance='dark'
              placeholder={'Password '}
              placeholderTextColor={'white'}
              onSubmitEditing={() => { this.login() }}
              onChangeText={(password) => this.setState({password})}
              secureTextEntry
            />
          </View>
        </View>
        <Button onPress={Actions.entryMethod} style={{backgroundColor: '#1eaaf1', borderWidth:0, borderColor:'transparent', margin:70}} textStyle={{fontSize: 20, color:'white'}}>
          Login
        </Button>
        <View style={styles.app}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d4869',
  },
  logo: {
    flex:3,
    alignItems:'center',
    justifyContent:'center',
    marginTop: 30,
  },
  app: {
    flex:1.5,
  },
});
