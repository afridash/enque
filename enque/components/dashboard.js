import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import Header from './header'
import {queryAll} from '../databases/schemas'
import realm from '../databases/schemas'
import moment from 'moment'
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
      if (surveys.length > 0)
      this.setState({surveys, noSurveys:false})
      else this.setState({noSurveys:true})
    }).catch((error)=> {
      alert('error')
      this.setState({surveys:[], noSurveys:true})
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
          {this.state.noSurveys ? <View style={styles.none}>
            <Text style={{fontSize:16, fontWeight:'500'}}>No Offline Surveys</Text>
          </View>: <FlatList
          style={{flex:1, marginTop:2}}
          data={this.state.surveys}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}/>}
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
  none:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});
