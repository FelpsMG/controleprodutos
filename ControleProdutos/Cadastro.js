import React, { Component } from 'react';
import { View, Button,Alert,ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import  axios  from 'axios';
export default class Cadastro extends Component {
  
  static navigationOptions = {
    title: 'Cadastrar Item',
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  
  constructor(props){
    super(props);
    this.state = { 
      nome: '',
      quantidade: ''
    }
  }

_getButton = async() =>{
    const api = axios.create();
      const response = await api.post(
        'https://us-central1-reactnativebasics-5a8a4.cloudfunctions.net/api1/testes/cadastro', 
        {
          nome : this.state.nome,
          quantidade : this.state.quantidade
        }
      )
    this.props.navigation.navigate('Home')
}

render(){
    return(
     <ScrollView
      style={{ flex: 1, marginHorizontal:20,marginVertical:20}}
      >
         <TextInput
              style={{marginVertical:20}}
              label ='Nome'
              mode='outlined'
              value = {this.state.nome}
              theme={{
                    roundness: 50,
                    colors: {
                      primary:'#8B0000',
                      underlineColor:'black',
                      
                    }}}
              onChangeText={text => this.setState({ nome: text })}
          />
          <TextInput
              style={{marginVertical:20}}
              label ='Quantidade'
              mode='outlined'
              value = {this.state.quantidade}
              theme={{
                    roundness: 50,
                    colors: {
                      primary:'#8B0000',
                      underlineColor:'black',
                      
                    }}}
              onChangeText={text => this.setState({ quantidade: text })}
          />
        <View style={{margin:20}}>
                <Button 
                title='Cadastrar'
                color = '#8B0000'
                onPress={() => {this._getButton()}}
                /></View>
                </ScrollView>
            )
}}