import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCart } from '../store/slices/cartSlice';
// import Carousel from 'react-native-reanimated-carousel';
// import Swiper from 'react-native-swiper';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();

  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // const items = useSelector((state) => state.cart);

  // const addedItems = items.map((ele) => ele.id);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const request = await fetch(`https://dummyjson.com/products/${id}`);
        const response = await request.json();
        setProductDetails(response);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.fallBack}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.white }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{productDetails.title}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: productDetails.thumbnail }}
          style={styles.itemImage}
        />
      </View>

      <Text style={styles.price}>${productDetails.price}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.sBtn}
          onPress={() => handleAddToCart(productDetails)}
        >
          <Text style={styles.sText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pBtn}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.pText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Details</Text>
        <Text style={styles.description}>{productDetails.description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  fallBack: {
    marginVertical: '70%',
  },
  titleContainer: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 50,
    fontWeight: 700,
  },
  wrapper: {},
  // slide: {
  //   // flex: 1,
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  // },
  imageContainer: {
    width: '100%',
  },
  itemImage: {
    width: '100%',
    height: 207,
    objectFit: 'cover',
  },
  price: {
    margin: 15,
    fontSize: 24,
    fontWeight: 600,
  },
  detailsContainer: {
    margin: 15,
  },
  description: {
    marginVertical: 10,
    fontSize: 15,
  },
  buttonContainer: {
    marginHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sBtn: {
    width: 143,
    height: 56,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pBtn: {
    width: 169,
    height: 56,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sText: {
    color: colors.primary,
    fontSize: 16,
  },
  pText: {
    color: colors.white,
    fontSize: 16,
  },
});
