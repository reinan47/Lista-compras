import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MyComponent = ({total}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.textContainer, styles.shadowBox]}>
        <Text style={{color: '#fff', fontFamily: 'Roboto_700Bold', fontSize: 14,}}>
          {(total.toFixed(2) - total.toFixed(0)) == 0 ? total.toFixed(0) : total.toFixed(2)}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <MaterialIcons name="add" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 50,  
    height: 50,  
  },
  textContainer: {
    position: 'absolute',
    left: 30,
    bottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 30,
    width: 40, 
    height: 25,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  shadowBox: {
    width: 40,  
    height: 25,
    borderRadius: 30,
    shadowColor: 'black',
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MyComponent;
