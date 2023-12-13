import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const Categories = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Categories</Text>
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {},
  header: {
    marginHorizontal: 15,
    marginTop: 15,
    fontSize: 30,
    color: colors.primary,
  },
});
