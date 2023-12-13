import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { colors } from '../constants/colors';
import IconButton from '../components/UI/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorite } from '../store/slices/favoritesSlice';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fav = useSelector((state) => state.fav.items);
  const dispatch = useDispatch();
  const favs = fav.map((item) => item.id).sort((a, b) => a - b);
  console.log(fav);

  useEffect(() => {
    // Fetch products from the API
    const fetchProductList = async () => {
      setIsLoading(true);
      try {
        const request = await fetch('https://dummyjson.com/products');
        const response = await request.json();
        setProducts(response?.products);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductList();
  }, []);

  const handleUpdateFav = (item) => {
    dispatch(updateFavorite(item));
  };

  const renderItem = ({ item }) => (
    <View style={styles.Item}>
      <View style={styles.heart}>
        <IconButton
          icon={
            favs.find((f) => f === item.id) ? 'favorite' : 'favorite-border'
          }
          size={24}
          color={colors.customColor2}
          onPress={() => handleUpdateFav(item)}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
      >
        <Image source={{ uri: item.thumbnail }} style={styles.Image} />
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator size='large' />;
  }

  return (
    <View style={{ backgroundColor: colors.white }}>
      <View style={styles.TopContainer}>
        <View style={styles.NameContainer}>
          <Text style={styles.Header}>Hey Rahul,</Text>
          <IconButton
            icon='shopping-cart'
            size={24}
            color={colors.white}
            onPress={() => navigation.navigate('Cart')}
          />
        </View>

        <TextInput
          style={styles.SearchBox}
          placeholder='Search Products or store'
        />
        <View style={styles.DeliveryDetails}>
          <View>
            <Text style={styles.info}>DELIVERY TO</Text>
            <Text style={styles.data}>Green Way 3000, Sylhet</Text>
          </View>
          <View>
            <Text style={styles.info}>WITHIN</Text>
            <Text style={styles.data}>1 Hour</Text>
          </View>
        </View>
      </View>
      <Text style={styles.Header1}>Recommended</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  TopContainer: {
    height: '25%',
    paddingTop: '15%',
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
  },
  NameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  Header: {
    fontSize: 30,
    fontWeight: 800,
    color: colors.white,
  },
  Header1: {
    fontSize: 30,
    fontWeight: 800,
    marginLeft: 15,
    marginTop: 10,
  },
  SearchBox: {
    borderRadius: 30,
    height: '25%',
    paddingHorizontal: 20,
    marginHorizontal: 15,
    backgroundColor: colors.primaryDark,
  },
  DeliveryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  info: {
    fontSize: 12,
    fontWeight: 800,
    color: colors.buttonDisabled,
  },
  data: {
    fontSize: 14,
    color: colors.white,
  },
  Item: {
    width: 160,
    height: 195,
    borderRadius: 10,
    backgroundColor: colors.greyScale,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  heart: {
    alignItems: 'left',
  },
  Image: {
    height: 68,
    width: 68,
    marginHorizontal: 40,
    marginVertical: 15,
    borderRadius: 5,
  },
  price: {
    fontWeight: 600,
    fontSize: 14,
    marginLeft: 10,
  },
  title: {
    marginLeft: 10,
    fontWeight: 400,
    color: '#616A7D',
  },
});
