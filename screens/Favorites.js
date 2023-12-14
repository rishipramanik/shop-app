import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const Favorites = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {},
  header: {
    marginHorizontal: 15,
    marginTop: 45,
    fontSize: 30,
    color: colors.primary,
  },
});
