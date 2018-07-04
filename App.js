import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./logo.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}

class ListScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };

  constructor(props){
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null
    };
  }

  renderItem = ({ item }) => (<ListItem title={item.name} avatar={{ uri: item.picture_url }} subtitle={`${item.address} - ${item.city} - ${item.uf}`}/>)

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.email}
      />
    );
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData = () => {
    const url = "https://api-v1-escolas.herokuapp.com/schools.json";
    this.setState({loading: true});
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          loading: false
        });
      })
      .catch(error => {
        this.setState({error, loading: false });
      });
   };
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: ListScreen,
    },
    // Details: {
      // screen: DetailsScreen,
    // },
  },
  {
  initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ff6b6b',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends React.Component {
  render(){
    return <RootStack />;
  }
}
  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#fff',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
// });
