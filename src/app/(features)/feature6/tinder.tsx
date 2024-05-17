import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TinderCard from '@/components/feature6/TinderCard';
import { Stack } from 'expo-router';

const dummyUsers = [
    {
      id: 1,
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg',
      name: 'Dani',
    },
    {
      id: 2,
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/2.jpg',
      name: 'Jon',
    },
    {
      id: 3,
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/3.jpg',
      name: 'Dani',
    },
    {
      id: 4,
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/4.jpeg',
      name: 'Alice',
    },
    {
      id: 5,
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/5.jpg',
      name: 'Dani',
    },
    {
      id: 6,
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/6.jpg',
      name: 'Kelsey',
    },
  ];

const Tinder = () => {
    const [users, setUsers] =  useState(dummyUsers)
    
  return (
    <View style={styles.page}>
        <Stack.Screen options={{ headerShown: false }} />

      {users.map((user, index) => (
        <TinderCard key={user.id} user={user} numOfCards={users.length} index={index}  />
      ))}
    </View>
  )
}

export default Tinder

const styles = StyleSheet.create({  
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})