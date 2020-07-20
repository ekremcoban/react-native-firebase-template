/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';


class App extends Component {
  state = {
    users: []
  };

  constructor(props) {
    super(props);
    this.getUser();
    this.getUsers();

    this.subscriber =
      firestore()
        .collection('users')
        .onSnapshot(docs => {
          let users = []
          docs.forEach(doc => {
            users.push(doc.data())
          })
          this.setState({ users });
          console.log(users)
        })


    //   this.subscriber = 
    // firestore()
    // .collection('users')
    //   .doc('J2koHRR3k202PLsSfNAP').onSnapshot(doc => {
    //     this.setState({
    //       user: {
    //         name: doc.data().name,
    //       }
    //     })
    //   })
  };

  getUser = async () => {
    const userDocument = await firestore().collection("users")
      .doc("J2koHRR3k202PLsSfNAP").get();

    console.log(userDocument);
  };

  getUsers = async () => {
    const users = await firestore()
      .collection('users')
      .where('age', '>', 19)
      .get()

    console.log(users);
  };

  addUser = async () => {
    let name = Math.random().toString(36).substring(7);
    firestore().collection('users').add({
      name,
      age: 20,
    })
  };

  deleteUsers = async () => {
    const usersQuerySnapshot = await firestore()
      .collection('users')
      .get()

    const batch = firestore().batch();

    usersQuerySnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    batch.commit();
  }

  render() {
    const array = this.state.users.map((user, index) =>
      <View key={index}>
        <Text>{user.name}</Text>
      </View>)

    return (
      <View style={styles.container}>
        <Button title='Hepsini Sil' onPress={this.deleteUsers} />
        <Button title='Ekle' onPress={this.addUser} />
        {array}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
