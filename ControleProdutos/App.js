import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TelaInicial from './TelaInicial';
import Cadastro from './Cadastro';

const AppNavigator = createStackNavigator({
  Home: {
    screen: TelaInicial,
  },
  Cadastrar: {
    screen: Cadastro,
  },
  initialRouteName: 'Home',
});
const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component { 
  render() {
    return <AppContainer />;
  }
}

