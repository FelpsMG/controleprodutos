import React, { Component } from 'react';
import { View, Alert,FlatList,TouchableOpacity,Text,StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';
import  axios  from 'axios';
import { withNavigationFocus } from 'react-navigation';

 class TelaInicial extends Component {
  static navigationOptions = {
    title: 'Controle de Produtos',
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
    },
  };
  componentDidMount(){
    this.loadData('')
  }

componentDidUpdate(prevProps,prevState){
  if(prevProps.isFocused!==this.props.isFocused && this.props.isFocused){
    this.loadData('')
  }
}
   constructor(props){
    super(props);
    this.state = { 
      dados: [],
      possuidados: false,
      text: '',}
  }

  excluirProduto = async (idd) =>{
    const api = axios.create();
    const response = await api.post(
      'https://us-central1-reactnativebasics-5a8a4.cloudfunctions.net/api1/testes/excluir', 
      {id: idd}
      )
      this.loadData("");
      this.setState({possuidados: false});
    };

  loadData = async (texto) => {
    const api = axios.create();
    const response = await api.post(
      'https://us-central1-reactnativebasics-5a8a4.cloudfunctions.net/api1/testes/busca', 
      {nome: texto}
    )
    this.setState({possuidados: true , dados:response.data})
    };
    loadDataI = async () => {
      const api = axios.create();
      const response = await api.get(
        'https://us-central1-reactnativebasics-5a8a4.cloudfunctions.net/api1/testes'
      )
      this.setState({possuidados: true , dados:response.data})
      };
      renderItem =({item})=>(
        <View style={styles.productContainer}>
          <Text style={styles.productTitle}>{item.nome}</Text>
          <Text style={styles.produtoqtd}>{item.quantidade}</Text>
          <TouchableOpacity style={styles.botoes}
          onPress={()=>{Alert.alert(
            'EXCLUIR',
            'TEM CERTEZA QUE QUER EXCLUIR???',
            [
              {text: 'NÃO', onPress: () => {}},
              {text: 'SIM', onPress: () => this.excluirProduto(item.id)},
            ],
            { cancelable: false }
          );
        }
          }>
            <Text style={styles.productbuttontext}>Excluir</Text>
          </TouchableOpacity>
          </View>
      )
  render(){
    return (
      <View style={{ flex: 1, marginHorizontal:20,marginVertical:20}}>
        <TouchableOpacity style={styles.botoes}
          onPress={() => {this.props.navigation.navigate('Cadastrar')}}>
              <Text style={styles.productbuttontext}>Cadastrar Item</Text>
            </TouchableOpacity>
         <TextInput
              style={{marginVertical:20}}
              label ='Buscar Produto'
              mode='outlined'
              value = {this.state.text}
              theme={{
                    roundness: 50,
                    colors: {
                      primary:'#8B0000',
                      underlineColor:'black',
                      
                    }}}
              onChangeText={(text) =>
              {this.loadData(text);{this.setState({ text: text })}}}
          />
          <FlatList 
          contentContainerStyle ={styles.list}
          data = {this.state.dados}
          keyExtractor = {( item => item.id) }
          renderItem = {this.renderItem}
          />
          </View>)
  }
}

export default withNavigationFocus(TelaInicial);

const styles = StyleSheet.create({
  botoes:{
      height:42,
      borderRadius:5,
      borderWidth:2,
      borderColor:"#8B0000",
      backgroundColor:'transparent',
      justifyContent:"center",
      alignItems:"center",
      marginTop:10
  },
  productbuttontext:{
      fontSize:16,
      color:"#8B0000",
      fontWeight:'bold'
  },
  list:{
      padding:20,

  },
  productContainer:{
      backgroundColor: "#fff",
      borderWidth:1,
      borderColor:"#8B0000",
      borderRadius:5,
      padding:20,
      marginBottom:20
  },
  productTitle:{
      fontSize:18,
      fontWeight: 'bold',
      color:"#333"
  },
  produtoqtd:{
      fontSize:16,
      color:"#999",
      marginTop:5,
      lineHeight:24
  }
})