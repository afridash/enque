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
                <Scene key='index' component={Index} />
                <Drawer
                  initial
                  hideNavBar
                  key="drawer"
                  contentComponent={DrawerContent}
                  drawerImage={MenuIcon}
                >
                  {/*
                    Wrapper Scene needed to fix a bug where the tabs would
                    reload as a modal ontop of itself
                  */}

                  <Scene hideNavBar>
                      <Scene key="dashboard" initial component={Dashboard} />
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
