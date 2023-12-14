import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import IconButton from '../IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorite } from '../../../store/slices/favoritesSlice';
import colors from '../../../constants/colors';

const ProductCard = ({ product, navigation }) => {
  const fav = useSelector((state) => state.fav.items);
  const dispatch = useDispatch();
  const favs = fav.map((item) => item.id).sort((a, b) => a - b);

  const handleUpdateFav = (item) => {
    dispatch(updateFavorite(item));
  };
  return (
    <View style={styles.Item}>
      <View style={styles.heart}>
        <IconButton
          icon={
            favs.find((f) => f === product.id) ? 'favorite' : 'favorite-border'
          }
          size={24}
          color={colors.customColor2}
          onPress={() => handleUpdateFav(product)}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', { id: product.id })
        }
      >
        <Image source={{ uri: product.thumbnail }} style={styles.Image} />
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.title}>{product.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  Item: {
    width: 170,
    height: 195,
    borderRadius: 10,
    backgroundColor: colors.greyScale,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  heart: {
    alignItems: 'flex-start',
  },
  Image: {
    height: 68,
    width: 68,
    marginHorizontal: 50,
    marginVertical: 15,
    borderRadius: 5,
  },
  price: {
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 10,
  },
  title: {
    marginLeft: 10,
    fontWeight: '400',
    color: colors.textLight,
  },
});
