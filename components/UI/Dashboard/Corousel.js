import { View, Dimensions, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Card from '../../../assets/Card.png';
import React from 'react';

const corouselItems = [Card, Card];

const Corousel = () => {
  const renderItems = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={item} style={styles.itemImage} />
      </View>
    );
  };
  return (
    <View>
      <Carousel
        data={corouselItems}
        renderItem={renderItems}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width - 100}
        loop={true}
      />
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
    width: '100%',
    height: 140,
    objectFit: 'contain',
    borderRadius: 30,
  },
});
