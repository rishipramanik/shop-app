import { View, StyleSheet, Image } from 'react-native';
import React from 'react';

const SlideItem = ({ item }) => {
  return (
    <View style={styles.imageContainer} horizontal>
      <Image source={{ uri: item }} style={styles.itemImage} />
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  imageContainer: {
    width: 400,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: '100%',
    height: 207,
    objectFit: 'contain',
  },
});
