import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image source={require('./logo.png')} style={{ width: 30, height: 30, marginLeft: 8 }} />
    );
  }
}

class DetailsScreen extends React.Component {

  render() {
    const { navigation } = this.props;
    const school = navigation.getParam('school', null);

    return (
      <View>
        <Text>{this.school.name}</Text>
        <Image source={require('./logo.png')} style={{ width: 120, height: 100 }} />
        <Text>{this.school.address}</Text>
        <Text>{this.school.phone}</Text>
        <Text>{this.school.description}</Text>
      </View>
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

  onPressItem = (item) => this.props.navigation.navigate('DetailsScreen', {school:item})

  renderItem = ({ item }) => (<ListItem
                                onPress={this.onPressItem}
                                title={item.name}
                                avatar={{ uri: item.picture_url }}
                                subtitle={item.address}
                              />)

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
    Home: ListScreen,
    Details: DetailsScreen,
  },
  {
  initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#7158e2',
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
