import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { colors } from '../constants/colors';
import IconButton from '../components/UI/IconButton';
import { useSelector } from 'react-redux';
import ProductCard from '../components/UI/Dashboard/ProductCard';
import Badge from '../components/UI/Badge';
import Corousel from '../components/UI/Dashboard/Corousel';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

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

  const renderItem = ({ item }) => (
    <ProductCard product={item} navigation={navigation} />
  );

  // show loader in case of loading
  if (isLoading) {
    return (
      <View style={styles.fallBack}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: colors.white }}>
      <View style={styles.topContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.header}>Hey Rahul,</Text>
          <View>
            {cartItems.length > 0 && <Badge count={cartItems.length} />}
            <IconButton
              icon='shopping-cart'
              size={24}
              color={colors.white}
              onPress={() => navigation.navigate('Cart')}
            />
          </View>
        </View>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.textBox}
            placeholder='Search Products or store'
            placeholderTextColor={colors.white}
          />
        </View>
        <View style={styles.deliveryDetails}>
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
      <Corousel />
      <Text style={styles.header1}>Recommended</Text>
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
  fallBack: {
    marginVertical: '70%',
  },
  topContainer: {
    height: 280,
    paddingTop: '15%',
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.white,
  },
  header1: {
    fontSize: 30,
    fontWeight: '300',
    marginLeft: 15,
    marginTop: 10,
  },
  searchBox: {
    borderRadius: 30,
    height: '25%',
    paddingHorizontal: 20,
    marginHorizontal: 15,
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
  },
  textBox: {
    color: colors.white,
  },
  deliveryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  info: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.buttonDisabled,
  },
  data: {
    fontSize: 14,
    color: colors.white,
  },
});
