import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import colors from '../../constants/colors';

const Badge = ({ count }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: 26,
    width: 16,
    height: 16,
    left: 10,
    borderRadius: 8,
    backgroundColor: colors.customColor2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
  },
});
