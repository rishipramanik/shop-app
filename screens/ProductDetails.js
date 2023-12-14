import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { updateFavorite } from '../store/slices/favoritesSlice';
import Carousel from 'react-native-snap-carousel';
import IconButton from '../components/UI/IconButton';
import Badge from '../components/UI/Badge';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const favItems = useSelector((state) => state.fav.items);
  const favs = useMemo(
    () => favItems.map((item) => item.id).sort((a, b) => a - b),
    [favItems]
  );

  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleUpdateFav = (item) => {
    dispatch(updateFavorite(item));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleBuyNow = (item) => {
    handleAddToCart(item);
    navigation.navigate('Cart');
  };

  //fetch the product details with the productId
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
  }, [id]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.itemImage} />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.fallBack}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.navigationBar}>
          <IconButton
            icon='arrow-back-ios'
            size={24}
            color={colors.primary}
            onPress={() => navigation.navigate('Home')}
          />
          <View>
            {cartItems.length > 0 && <Badge count={cartItems.length} />}
            <IconButton
              icon='shopping-cart'
              size={24}
              color={colors.primary}
              onPress={() => navigation.navigate('Cart')}
            />
          </View>
        </View>
        <View style={styles.titleContainer}>
          {productDetails?.title?.length > 11 ? (
            <>
              <Text style={styles.title}>
                {productDetails.title.substr(0, 11)}
              </Text>
              <Text style={styles.title2}>
                {productDetails.title.substr(11)}
              </Text>
            </>
          ) : (
            <Text style={styles.title}>{productDetails.title}</Text>
          )}
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.favBtn}>
            <IconButton
              icon={
                favs.find((f) => f === productDetails.id)
                  ? 'favorite'
                  : 'favorite-border'
              }
              size={24}
              color={colors.customColor2}
              onPress={() => handleUpdateFav(productDetails)}
            />
          </View>
          <Carousel
            data={productDetails.images}
            renderItem={renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width - 40}
            loop={true}
            autoplay={true}
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
            onPress={() => handleBuyNow(productDetails)}
          >
            <Text style={styles.pText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>Details</Text>
          <Text style={styles.description}>{productDetails.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  fallBack: {
    marginVertical: '70%',
  },
  container: {
    backgroundColor: colors.white,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 30,
  },
  titleContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: '700',
  },
  title2: {
    fontSize: 50,
    fontWeight: '300',
  },
  imageContainer: {
    width: '100%',
  },
  middleContainer: {
    alignItems: 'flex-end',
  },
  favBtn: {
    backgroundColor: colors.white,
    width: 70,
    height: 50,
    borderRadius: 10,
  },
  itemImage: {
    width: '100%',
    height: 207,
    objectFit: 'contain',
  },
  price: {
    marginVertical: 15,
    marginHorizontal: 20,
    fontSize: 24,
    fontWeight: '600',
  },
  detailsContainer: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
  description: {
    marginVertical: 10,
    fontSize: 15,
  },
  buttonContainer: {
    marginHorizontal: 20,
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
