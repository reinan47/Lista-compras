import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Header = ({ itemName, setItemName, addItem, total }) => {
  const inputRef = useRef(null);

  const ManterFocoInput = () => {
    addItem();
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 20); 
  };
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={styles.title}>Lista de Compras</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef} 
          placeholder="Digite um Item da Lista"
          value={itemName}
          onSubmitEditing={ManterFocoInput}
          onChangeText={text => setItemName(text)}
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity onPress={ManterFocoInput} style={styles.addButton}>
          <MaterialIcons style={{ bottom: 2 }} name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* Barra de progresso com porcentagem */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(total / 600) * 100}%`,
                backgroundColor: total >= 600 ? '#E02426' : '#32cd32',
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingBottom: 5,
    paddingTop: 20,
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    fontFamily: 'Roboto_400Regular',
    height: 35
  },
  inputContainer: {
    flexDirection: 'row',
    paddingBottom: 6,
    borderRadius: 0,
  },
  addButton: {
    backgroundColor: '#215FFF',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 8,
    height: 35,
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: 0,
    marginBottom: 22
  },
  progressBar: {
    height: 10,
    backgroundColor: '#C2C2C2',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },

});
