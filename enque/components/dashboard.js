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
  FlatList,
} from 'react-native';

import { PowerTranslator, ProviderTypes, Translation } from 'react-native-power-translator';
import Header from './header'
import {queryAll} from '../databases/schemas'
import realm from '../databases/schemas'
import moment from 'moment'
var key = 'AIzaSyCRBOQE2ZcuttQDxreNI1BbxBMDbX0XGEo'
Translation.setConfig(ProviderTypes.Google, key,'ig');
//  <PowerTranslator style={{width:100, height:100}} text={'Good morning'} />
export default class Dashboard extends Component<{}> {
  constructor (props) {
    super (props)
    this.state = {
      translated:'',
      surveys:[],
    }
    realm.addListener('change', ()=> {
      this.reload()
    })
  }
  componentWillMount () {
    this.reload()
  }
  reload () {
    queryAll().then((surveys)=> {
      this.setState({surveys})
    }).catch((error)=> {
      alert('error')
      this.setState({surveys:[]})
    })
  }
  renderItem = ({item, index}) => {
    return (
      <View style={{backgroundColor: index%2 ===0 ? '#90caf9' : '#bbdefb', padding:20, flexDirection:'row', justifyContent:'space-between'}}>
        <Text>Survey {index+1}</Text>
        <Text>{moment(item.submission_date).format('lll')}</Text>
      </View>
    )
  }
  _keyExtractor = (item) => item.id
  render () {
    return (
      <View style={styles.container}>
        <Header title='Surveys' upload={true} />
        <View style={styles.secondaryContainer}>
          <FlatList
          style={{flex:1, marginTop:2}}
          data={this.state.surveys}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}/>

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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
