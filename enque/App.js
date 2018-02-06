import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, NetInfo} from 'react-native';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';
import DrawerContent from './components/side'
import Index from './components/index'
import Dashboard from './components/dashboard'
import Submit from './components/submit'
import Form from './components/form'
import Subscribe from './components/subscribe'
import About from './components/about'
import Partners from './components/partners'
import MyWorld from './components/myworld'
import Sustainable from './components/sdgs'
import Countries from './components/countries'
import PaperSurvey from './components/papersurvey'
import Paper from './components/paper'


import Survey from './components/survey'
import MenuIcon from './assets/images/menu_burger.png';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
};
export default class App extends React.Component {
  async componentWillMount () {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
  }
  _handleConnectionChange = (isConnected) => {
    AsyncStorage.setItem('status', isConnected.toString())
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange)
  }
  render() {
    return (
      <Router
        createReducer={reducerCreate}
        >
        <Overlay>
            <Lightbox>
              <Stack
                hideNavBar
                key="root"
              >
                <Scene key='index'  component={Index} />
                <Drawer
                  hideNavBar
                  initial
                  key="drawer"
                  contentComponent={DrawerContent}
                  drawerImage={MenuIcon}
                >
                  {/*
                    Wrapper Scene needed to fix a bug where the tabs would
                    reload as a modal ontop of itself
                  */}

                  <Scene hideNavBar>
                      <Scene key="dashboard"  component={Dashboard} />
                      <Scene key="form"   component={Form}/>
                      <Scene key="about" component={About} />
                      <Scene key="submit"  component={Submit} />
                      <Scene key="subscribe"  component={Subscribe} />
                      <Scene key="partners" component={Partners} />
                      <Scene key="myworld" component={MyWorld} />
                      <Scene key="sustainable" component={Sustainable} />
                      <Scene key="survey" component={Survey} />
                      <Scene key="countries" component={Countries} />
                      <Scene key="papersurvey" component={PaperSurvey} />
                      <Scene key="paper" initial component={Paper} />
                  </Scene>
                </Drawer>
              </Stack>
            </Lightbox>
        </Overlay>
      </Router>
    );
  }
}
const customStyles = StyleSheet.create({
  navBarTitle:{
    color:'#FFFFFF'
  },
  barButtonTextStyle:{
      color:'#FFFFFF'
  },
  barButtonIconStyle:{
      tintColor:'rgb(255,255,255)'
  },
  backButtonTextStyle: {
    tintColor: 'white'
  },
})
