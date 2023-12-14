import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../constants/colors';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';

// Function to calculate the total amount in the cart
const calculateTotal = (cartItems) => {
  return cartItems
    .map((item) => item.price * item.quantity)
    .reduce((total, item) => total + item, 0);
};

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [total, setTotal] = useState(() => calculateTotal(cartItems));

  const handleAddition = (item) => {
    dispatch(addToCart(item));
  };
  const handleDeletion = (item) => {
    dispatch(removeFromCart(item.id));
  };

  //update total each time the cartitem gets updated
  useEffect(() => {
    setTotal(calculateTotal(cartItems));
  }, [cartItems]);

  const renderItem = ({ item }) => (
    <View style={styles.cartItems}>
      <View style={styles.itemDetails}>
        <View styles={styles.thumbImage}>
          <Image style={styles.itemImage} source={{ uri: item.thumbnail }} />
        </View>
        <View styles={styles.itemDetails}>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.text}>${item.price}</Text>
        </View>
      </View>
      <View style={styles.quantity}>
        <Pressable style={styles.update} onPress={() => handleAddition(item)}>
          <Text style={styles.text}>+</Text>
        </Pressable>
        <View>
          <Text style={styles.text}>{item.quantity}</Text>
        </View>
        <Pressable style={styles.update} onPress={() => handleDeletion(item)}>
          <Text style={styles.text}>-</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: colors.white }}>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noText}>No Items</Text>
      )}
      <View style={styles.totalContainer}>
        <View style={styles.totalTextContainer}>
          <Text style={styles.text}>Subtotal:</Text>
          <Text style={styles.text}>${total}</Text>
        </View>
        {total !== 0 && (
          <>
            <View style={styles.totalTextContainer}>
              <Text style={styles.text}>Delivery:</Text>
              <Text style={styles.text}>$2</Text>
            </View>
            <View style={styles.totalTextContainer}>
              <Text style={styles.text}>Total:</Text>
              <Text style={styles.text}>${total + 2}</Text>
            </View>
          </>
        )}
        <Pressable style={styles.proceed}>
          <Text style={styles.ptext}>Proceed to Checkout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartItems: {
    height: 70,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemDetails: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  text: {
    fontSize: 16,
  },
  ptext: {
    fontSize: 16,
    color: colors.white,
  },
  noText: {
    fontSize: 18,
    color: colors.primary,
    marginHorizontal: '40%',
    marginVertical: 30,
  },
  quantity: {
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  update: {
    width: 40,
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: colors.greyScale,
  },
  totalContainer: {
    backgroundColor: colors.greyScale,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 250,
    borderRadius: 10,
    alignItems: 'center',
    background: colors.greyScale,
  },
  totalTextContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  proceed: {
    width: 327,
    height: 56,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
