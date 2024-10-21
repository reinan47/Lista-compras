import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListaLocal from '../componenteBody/listaLocal'

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
  modalApagaListVisible,
  clearAllItems,
  selectedItemId,
  removeItem,
}) => (
  <View style={{ paddingHorizontal: 16, maxHeight: 'auto' }}>
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
                toggleItemSelection(itemId);
              }}
              onPressIn={() => {
                itemData.selected ? setCorView(true) : setCorView(false);
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
                  backgroundColor: `${itemData.selected ? '#4de44d' : '#FCFCFC'}`,
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
                    <Text style={{ textAlign: 'center', fontSize: 13, fontFamily: 'Roboto_400Regular' }}>
                      Unidades
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => {
                          if (itemData.quantity <= 0) {
                            itemData.quantity = 1;
                          }
                          updateItem(itemId, itemData.price.toString(), itemData.quantity - 1);
                        }}
                        style={styles.addIcon}
                      >
                        <MaterialIcons name="remove" size={15} color="white" />
                      </TouchableOpacity>
                      <View style={{ backgroundColor: '#D9D9D9', borderRadius: 5, height: 20, width: 25, }}>
                        <Text style={[styles.TamFont,{textAlign: 'center'}]}> {itemData.quantity} </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => updateItem(itemId, itemData.price.toString(), itemData.quantity + 1)}
                        style={styles.addIcon}
                      >
                        <MaterialIcons name="add" size={15} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ width: '60%', alignItems: 'center', marginLeft: 15, flexDirection: 'row', paddingLeft: 10 }}>
                    <View>
                      <Text style={{ textAlign: 'center', fontSize: 13, fontFamily: 'Roboto_400Regular' }}>
                        Valor UN
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 17, fontFamily: 'Roboto_400Regular', textAlignVertical: 'center' }}>
                          R$
                        </Text>
                        <TextInput
                          keyboardType='decimal-pad'
                          placeholder={"0 R$"}
                          value={
                            valorInputs[itemId] != 0
                              ? valorInputs[itemId] || itemData.price.toString().replace('.', ',')
                              : null
                          }
                          onFocus={() =>
                            setValorInputs({
                              ...valorInputs,
                              [itemId]: itemData.price.toString().replace('.', ','),
                            })
                          }
                          onChangeText={(text) => {
                            const startsWithDigit = /^\d/.test(text);

                            if (startsWithDigit) {
                              const formattedText = text.replace(
                                /^(\d+)[^\d](\d{0,2}).*?(\.\d{1,2})?$/,
                                '$1,$2$3'
                              );
                              setValorInputs({ ...valorInputs, [itemId]: formattedText });
                              updateItem(itemId, formattedText, itemData.quantity);
                            } else {
                              const verificaVazio = /^$/.test(text);
                              if (!verificaVazio) {
                                setValorInputs({ ...valorInputs, [itemId]: '0,' });
                                updateItem(itemId, '0,', itemData.quantity);
                              } else {
                                setValorInputs({ ...valorInputs, [itemId]: '' });
                                updateItem(itemId, '', itemData.quantity);
                              }
                            }
                          }}
                          style={styles.inputContent}
                        />
                      </View>
                    </View>
                    <View style={{ marginLeft: 15, paddingLeft: 20 }}>
                      <Text style={{ fontSize: 12, textAlign: 'center', fontFamily: 'Roboto_400Regular' }}>
                        Total
                      </Text>
                      <Text style={[styles.textContent, { fontSize: 17 }]}>
                        R$ {itemData.total.toFixed(2).replace('.', ',')}
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
                    style={{ backgroundColor: 'transparent', paddingRight: 10 }}
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
      onRequestClose={() => setModalApagaItemVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Excluir Todos Itens da Lista?
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
