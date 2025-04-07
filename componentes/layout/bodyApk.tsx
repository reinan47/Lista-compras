import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListaLocal from '../componenteBody/listaLocal'

  const formatarNumero = (value) => {
    let numStr = value.toString().replace(/\D/g, '');
  
    if (numStr === '') return '';
  
    let inteiro = numStr.slice(0, -2);
    let centavos = numStr.slice(-2);
  
    if (inteiro === '') inteiro = '0';
  
    inteiro = parseInt(inteiro).toLocaleString('pt-BR');
    if(inteiro === '0' && centavos === '0') return `${'0'},${'00'}`
  
    return `${inteiro},${centavos}`;
  };

  const formatar = (value) => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

interface Item {
  name: string;
  price: number | string;
  quantity: number;
  total: number;
  selected: boolean;
  local: string;
}

interface ItensListaProps {
  items: { [key: string]: Item };
  toggleItemSelection: (itemId: string) => void;
  setCorView: (value: boolean) => void;
  setSelectedLocal: (value: string) => void;
  setItems: (items: { [key: string]: Item }) => void;
  updateItem: (itemId: string, price: string, quantity: number) => void;
  setValorInputs: (inputs: { [key: string]: any }) => void;
  valorInputs: { [key: string]: any };
  setSelectedItemId: (itemId: string) => void;
  setModalApagaItemVisible: (visible: boolean) => void;
  modalApagaItemVisible: boolean;
  setModalApagaListaVisible: (visible: boolean) => void;
  modalApagaListVisible: boolean;
  clearAllItems: () => void;
  selectedItemId: string;
  removeItem: () => void;
}

 
const ItensLista: React.FC<ItensListaProps> = ({
  items,
  toggleItemSelection,
  setCorView,
  setSelectedLocal,
  setItems,
  updateItem,
  setValorInputs,
  valorInputs,
  setSelectedItemId,
  setModalApagaItemVisible,
  modalApagaItemVisible,
  setModalApagaListaVisible,
  modalApagaListVisible,
  clearAllItems,
  selectedItemId,
  removeItem,
}) => (
  <View style={{ paddingHorizontal: 16, maxHeight: 'auto' ,bottom: 15}}>
    {Object.keys(items).length === 0 ? (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>Sem Itens na Lista !</Text>
        <Icon name="frown-o" size={50} color="#E02426" />
      </View>
    ) : (
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        {Object.entries(items).map(([itemId, itemData]) => (
          <View key={itemId} style={{ paddingBottom: 6 }}>
            <TouchableOpacity
              onPress={() => {
                if(itemData.quantity > 0 && parseFloat(itemData.price.toString()) > 0){
                  toggleItemSelection(itemId);
                }
              }}
              onPressIn={() => {
                if(itemData.quantity > 0 && parseFloat(itemData.price.toString()) > 0){
                  itemData.selected ? setCorView(true) : setCorView(false);
                }
              }}
              style={[
                styles.itemContainer,
                {
                  borderRadius: 1,
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  borderBottomRightRadius: 8,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#F2C939',
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 1,
                  paddingTop: 3,
                  height: 22,
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <MaterialIcons name="shopping-cart" size={15} color='#807240' style={{ paddingLeft: 8 }} />
                  <Text style={[styles.textItem, { textAlignVertical: 'bottom', color: '#807240' }]}> {itemData.name}</Text>
                </View>
                <ListaLocal
                  setSelectedLocal={setSelectedLocal}
                  setItems={setItems}
                  items={items}
                  itemId={itemId}
                  itemData={itemData}
                />
              </View>
            </TouchableOpacity>
            <View
              style={[
                styles.shadowBox,
                {
                  backgroundColor: itemData.quantity > 0 ? `${itemData.selected ? '#4de44d' : '#FCFCFC'}` : "#FCFCFC",
                  borderBottomRightRadius: 8,
                },
              ]}
            >
              <View
                style={[
                  styles.row,
                  { alignItems: 'center', paddingLeft: 10, height: 40, paddingBottom: 5 },
                ]}
              >
                <View style={[styles.priceQuantity]}>
                  <TouchableOpacity onPress={() => { }}></TouchableOpacity>
                  <View>
                    <Text style={{ textAlign: 'center', fontSize: 12, fontFamily: 'Roboto_400Regular' }}>
                      UND
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => {
                          if (itemData.quantity <= 0) {
                            itemData.quantity = 1;
                          }
                          if(itemData.quantity == 1){
                            itemData.selected = false;
                          }
                          updateItem(itemId, itemData.price.toString(), itemData.quantity - 1);
                        }}
                        style={styles.addIcon}
                        disabled={itemData.selected}
                      >
                        <MaterialIcons name="remove" size={15} color="white" />
                      </TouchableOpacity>
                      <View style={{ backgroundColor: '#D9D9D9', borderRadius: 5, height: 20, width: 25, }}>
                        <Text style={[styles.TamFont,{textAlign: 'center'}]}> {itemData.quantity} </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => updateItem(itemId, itemData.price.toString(), itemData.quantity + 1)}
                        style={styles.addIcon}
                        disabled={itemData.selected}
                      >
                        <MaterialIcons name="add" size={15} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ width: '50%', alignItems: 'center', left: 5, flexDirection: 'row', paddingLeft: 10 }}>
                    <View>
                      <View style={{ flexDirection: 'row', top: 3 }}>
                        <Text style={{ fontSize: 17, fontFamily: 'Roboto_400Regular', textAlignVertical: 'center' }}>
                          R$
                        </Text>
                        <TextInput
                          keyboardType='decimal-pad'
                          placeholder={"0,00"}
                          editable={itemData.selected ? false : true}                          
                          onFocus={() =>
                            setValorInputs({ ...valorInputs, [itemId]: "0,00" })                        
                          }
                          value={valorInputs[itemId]}

                          onChangeText={(text) => {
                              text = formatarNumero(text.toString())
                              setValorInputs({ ...valorInputs, [itemId]: text });
                              updateItem(itemId, text, itemData.quantity);
                            }
                          }
                          style={styles.inputContent}
                        />
                      </View>
                    </View>
                    <View style={{ left: 10 }}>
                      <Text style={{ textAlign: 'center', fontSize: 12, fontFamily: 'Roboto_400Regular' }}>
                        VALOR UND
                      </Text>
                      <Text style={[styles.textContent, { fontSize: 15, textAlign: 'center' }]}>
                        R$ {formatar(itemData.price)}
                      </Text>
                    </View>
                    <View style={{ left: 25 }}>
                      <Text style={{ fontSize: 12, textAlign: 'center', fontFamily: 'Roboto_400Regular' }}>
                        TOTAL
                      </Text>
                      <Text style={[styles.textContent, { fontSize: 15 }]}>
                        R$ {formatar(itemData.total)}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedItemId(itemId);
                    setModalApagaItemVisible(true);
                  }}
                >
                  <MaterialIcons
                    style={{ backgroundColor: 'transparent', paddingRight: 5 }}
                    name="delete"
                    size={25}
                    color="#E02426"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    )}

    {/* Modal de confirmação Limpar lista*/}
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalApagaListVisible}
      onRequestClose={() => setModalApagaListaVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Excluir Todos Itens da Lista?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalApagaListaVisible(false)}
            >
              <Text style={styles.buttonText}>Não</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.deleteButton]}
              onPress={clearAllItems}
            >
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

    {/* Modal de confirmação remover item*/}
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalApagaItemVisible}
      onRequestClose={() => setModalApagaItemVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Excluir
            <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}>
              <Text style={{ color: '#E02426', fontFamily: 'Roboto_400Regular' }}> {items[selectedItemId]?.name} </Text>
            </Text>
            da Lista?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalApagaItemVisible(false)}
            >
              <Text style={styles.buttonText}>Não</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.deleteButton]}
              onPress={removeItem}
            >
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  </View>
);

export default ItensLista;

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderTopRightRadius: 10,
  },
  textItem: {
    fontSize: 16,
    color: '#807240',
    marginBottom: 2,
    fontFamily: 'Roboto_700Bold',
  },
  addIcon: {
    backgroundColor: '#215FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    width: 22,
    height: 22
  },
  priceQuantity: {
    flexDirection: 'row',
    textAlign: 'right',
    width: 180,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContent: {
    borderWidth: .8,
    borderColor: 'gray',
    fontSize: 17,
    textAlign: 'center',
    width: '67%',
    height: 22,
    fontFamily: 'Roboto_400Regular',
    borderRadius: 3
  },
  textContent: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },
  TamFont: {
    fontSize: 17,
    fontFamily: 'Roboto_400Regular',
  },
  emptyListContainer: {
    top: 200,
    bottom: 200,
    alignContent: 'flex-end',
    fontSize: 30,
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 30,
    fontFamily: 'Roboto_400Regular',
  },
  // Estilos do modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  deleteButton: {
    backgroundColor: '#E02426',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto_400Regular',
  },
  shadowBox: {
    shadowColor: 'black',
    elevation: 3.5,
  },
});
