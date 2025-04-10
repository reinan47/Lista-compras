import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const formatar = (value) => {
  return Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const MyComponent = ({ total }) => {
  return (
    <View style={styles.container}>
      <View style={[
        styles.textContainer,
        styles.shadowBox,
        { backgroundColor: total >= 600 ? 'red' : '#4de44d' }
      ]}>
        <Text style={styles.totalText}>R$ {formatar(total)}</Text>
      </View>
      <View style={styles.iconContainer}>
        <MaterialIcons name="add" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    bottom: 12
  },
  textContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    top: 12,
    left: 40
  },
  totalText: {
    color: '#fff',
    fontFamily: 'Roboto_700Bold',
    fontSize: 13,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30, // tamanho fixo pro botão
    height: 30,
  },
  shadowBox: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MyComponent;
