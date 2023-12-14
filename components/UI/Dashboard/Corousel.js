import { View, StyleSheet, Image, ScrollView } from 'react-native';
import Card from '../../../assets/Card.png';
import React from 'react';

const Corousel = ({ images }) => {
  const corouselItems = images ? images : [Card, Card];
  return (
    <View>
      <ScrollView style={styles.imageContainer} horizontal>
        {corouselItems.map((item, i) => (
          <Image key={i} source={item} style={styles.itemImage} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Corousel;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    marginVertical: 20,
  },
  itemImage: {
    width: 300,
    height: 140,
    objectFit: 'cover',
    borderRadius: 30,
    marginHorizontal: 20,
  },
});
