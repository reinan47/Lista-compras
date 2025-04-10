import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Header = ({
  itemName,
  setItemName,
  addItem,
  total,
  setMostrarFiltros,
  mostrarFiltros,
  filtroAtivo,
  setFiltroAtivo
}) => {
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
      <View style={{ flexDirection: 'column', paddingVertical: 2 }}>
        <View style={[styles.progressContainer, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 5 }]}>
          <TouchableOpacity
            onPress={() => {
              setMostrarFiltros(prev => !prev);
            }}
          >
            <View style={{
              borderWidth: .5, 
              borderRadius: 3,
              backgroundColor: `${mostrarFiltros ? '#215FFF' : 'transparent'}`
            }}>
              <MaterialIcons name='filter-list' size={25} color={`${mostrarFiltros ? '#efefef' : '#292929'}`} />
            </View>
          </TouchableOpacity>
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
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 3,
          display: mostrarFiltros ? 'flex' : 'none'
        }}>
          <TouchableOpacity style={[styles.filtterButton, {
            backgroundColor: `${filtroAtivo === null ? '#215FFF' : 'transparent'}`
          }]}
            onPress={() => {
              setFiltroAtivo(null);
            }}
          >
            <Text style={[styles.font, {
              color: `${filtroAtivo === null ? 'white' : 'black'}`
            }]}>Padrão</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filtterButton, {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: `${filtroAtivo === 'A-Z' ? '#215FFF' : 'transparent'}`
          }]}
            onPress={() => {
              setFiltroAtivo('A-Z');
            }}>
            <Text style={[styles.font, {
              color: `${filtroAtivo === 'A-Z' ? 'white' : 'black'}`
            }]}>A - Z</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filtterButton, {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: `${filtroAtivo === 'PrecoDesc' ? '#215FFF' : 'transparent'}`
          }]}
            onPress={() => {
              setFiltroAtivo('PrecoDesc');
            }}
          >
            <MaterialIcons name='arrow-upward' style={{ color: `${filtroAtivo === 'PrecoDesc' ? 'white' : 'black'}` }} />
            <Text style={[styles.font, {
              color: `${filtroAtivo === 'PrecoDesc' ? 'white' : 'black'}`
            }]}> Preço</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filtterButton, {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: `${filtroAtivo === 'PrecoAsc' ? '#215FFF' : 'transparent'}`
          }]}
            onPress={() => {
              setFiltroAtivo('PrecoAsc');
            }}
          >
            <MaterialIcons name='arrow-downward' style={{ color: `${filtroAtivo === 'PrecoAsc' ? 'white' : 'black'}` }} />
            <Text style={[styles.font, {
              color: `${filtroAtivo === 'PrecoAsc' ? 'white' : 'black'}`
            }]}> Preço</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filtterButton, {
            backgroundColor: `${filtroAtivo === 'Faltantes' ? '#215FFF' : 'transparent'}`
          }]}
            onPress={() => {
              setFiltroAtivo('Faltantes');
            }}
          >
            <Text style={[styles.font, {
              color: `${filtroAtivo === 'Faltantes' ? 'white' : 'black'}`
            }]}>Faltantes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filtterButton, {
            backgroundColor: `${filtroAtivo === 'Comprados' ? '#215FFF' : 'transparent'}`
          }]}
            onPress={() => {
              setFiltroAtivo('Comprados');
            }}
          >
            <Text style={[styles.font, {
              color: `${filtroAtivo === 'Comprados' ? 'white' : 'black'}`
            }]}>Comprados</Text>
          </TouchableOpacity>
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
    borderRadius: 3,
    padding: 8,
    fontFamily: 'Roboto_400Regular',
    height: 35
  },
  font: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: '#215FFF',
    justifyContent: 'center',
    borderRadius: 3,
    padding: 8,
    height: 35,
    marginLeft: 4,
  },
  filtterButton: {
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: .5,
    paddingHorizontal: 8,
    height: 25,
  },
  progressContainer: {
    marginTop: 0,
  },
  progressBar: {
    height: 10,
    width: '90%',
    backgroundColor: '#C2C2C2',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },

});
