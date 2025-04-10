import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

const formatarNumero = (value) => {
  if (!value) return '0,00';
  let numStr = value.toString().replace(/\D/g, '');

  while (numStr.length < 3) {
    numStr = '0' + numStr;
  }

  const inteiro = numStr.slice(0, -2);
  const centavos = numStr.slice(-2);

  return `${parseInt(inteiro).toLocaleString('pt-BR')},${centavos}`;
};

const formatar = (value) => {
  return Number(value.toString().replace(',', '.')).toLocaleString('pt-BR', {
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
  zeroAllItems: () => void;
  setModalZerarListaVisible: (visible: boolean) => void;
  modalZerarListVisible: boolean;
  setValorChange: (change: string) => void;
  valorChange: string;
  modalLocalVisible: boolean;
  setModalLocalVisible: (visible: boolean) => void;
  getItensFiltradosEOrdenados;
}


const ItensLista: React.FC<ItensListaProps> = ({
  items,
  toggleItemSelection,
  setCorView,
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
  zeroAllItems,
  setModalZerarListaVisible,
  modalZerarListVisible,
  setValorChange,
  valorChange,
  modalLocalVisible,
  setModalLocalVisible,
  getItensFiltradosEOrdenados
}) => (
  <View style={{ paddingHorizontal: 16, maxHeight: 'auto', bottom: 0 }}>
    {Object.keys(items).length === 0 ? (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>Sem Itens na Lista !</Text>
        <Icon name="frown-o" size={50} color="#E02426" />
      </View>
    ) : (
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        {getItensFiltradosEOrdenados().map(([itemId, itemData]) => ( 
          <View key={itemId} style={{ paddingBottom: 4 }}>
            <TouchableOpacity
              onPress={() => {
                if (itemData.quantity > 0 && parseFloat(itemData.price.toString()) > 0) {
                  toggleItemSelection(itemId);
                }
              }}
              onPressIn={() => {
                if (itemData.quantity > 0 && parseFloat(itemData.price.toString()) > 0) {
                  itemData.selected ? setCorView(true) : setCorView(false);
                }
              }}
              style={[
                styles.itemContainer,
                {
                  borderRadius: 1
                },
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#F2C939',
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  paddingTop: 3,
                  height: 22,
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: 150 }}>
                      <MaterialIcons name="shopping-cart" size={15} color='#807240' style={{ paddingLeft: 8 }} />
                      <Text style={[styles.textItem, { color: '#807240', marginLeft: 4 }]} numberOfLines={1}>
                        {itemData?.name || 'Sem nome'}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedItemId(itemId);
                        setModalLocalVisible(true);
                      }}
                    >
                      <View style={{ width: 150, height: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.textItem, { color: '#807240' }]}>{itemData.local}</Text>
                        <MaterialIcons
                          name='arrow-drop-down'
                          size={20}
                          color={'#807240'}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={[
                styles.shadowBox,
                {
                  backgroundColor: "#FCFCFC",
                  borderBottomRightRadius: 2,
                  borderBottomLeftRadius: 2,
                },
              ]}
            >
              <View
                style={{
                  backgroundColor: itemData.quantity > 0 ? `${itemData.selected ? '#32CD32' : '#FCFCFC'}` : "#FCFCFC",
                  position: 'absolute',
                  width: 16,
                  height: "100%",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  borderBottomLeftRadius: 100,
                  borderBottomRightRadius: 100,
                }}
              >

              </View>
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
                          if (itemData.quantity == 1) {
                            itemData.selected = false;
                          }
                          if (itemData.price === 0)
                            updateItem(itemId, '', itemData.quantity - 1);
                          else if(valorChange === '')
                            updateItem(itemId, formatar(itemData.price), itemData.quantity - 1);
                          else
                            updateItem(itemId, valorChange, itemData.quantity - 1);
                        }}
                        style={styles.addIcon}
                        disabled={itemData.selected}
                      >
                        <MaterialIcons name="remove" size={15} color="white" />
                      </TouchableOpacity>
                      <View style={{ backgroundColor: '#D9D9D9', borderRadius: 5, height: 20, width: 25, }}>
                        <Text style={[styles.TamFont, { textAlign: 'center' }]}> {itemData.quantity} </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          if (itemData.price === 0)
                            updateItem(itemId, '', itemData.quantity + 1);
                          else if(valorChange === '')
                            updateItem(itemId, formatar(itemData.price), itemData.quantity + 1);
                          else
                            updateItem(itemId, valorChange, itemData.quantity + 1);
                        }}
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
                          selection={{
                            start: (valorInputs[itemId] || "").length,
                            end: (valorInputs[itemId] || "").length,
                          }}
                          value={valorInputs[itemId]}
                          onChangeText={(text) => {
                            setValorChange(text)
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
                  disabled={itemData.selected}
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
      <TouchableWithoutFeedback onPress={() => setModalApagaListaVisible(false)}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Apagar Todos Itens da Lista?
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
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

    {/* Modal de confirmação remover item*/}
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalApagaItemVisible}
      onRequestClose={() => setModalApagaItemVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalApagaItemVisible(false)}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Apagar
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
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalZerarListVisible}
      onRequestClose={() => setModalZerarListaVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalZerarListaVisible(false)}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Zerar os Preços de Todos Itens da Lista?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalZerarListaVisible(false)}
                >
                  <Text style={styles.buttonText}>Não</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.deleteButton]}
                  onPress={zeroAllItems}
                >
                  <Text style={styles.buttonText}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalLocalVisible}
      onRequestClose={() => setModalLocalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalLocalVisible(false)}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={styles.modalViewLocal}>

              {['Açai', 'Atacadão', 'Comercial Peixoto', 'Daniel Peixoto', 'GBarbosa', 'Messias Peixoto', 'Nunes Peixoto'].map((local) => (
                <TouchableOpacity
                  key={local}
                  style={styles.modalButtonLocal}
                  onPress={() => {
                    const updatedItems = { ...items };
                    updatedItems[selectedItemId] = {
                      ...updatedItems[selectedItemId],
                      local: local,
                    };

                    setItems(updatedItems);
                    setModalLocalVisible(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>{local}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
    width: '75%',
    height: 23,
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
  modalButtonLocal: {
    padding: 10,
    width: 150,
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
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
    height: '18%'

  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
    fontSize: 18,
  },
  modalButtonText: {
    fontSize: 18,
    fontFamily: 'Roboto_400Regular',
    borderWidth: .5,
    width: '100%',
    textAlign: 'center',
    height: 30,
    textAlignVertical: 'center',
    borderRadius: 3
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
  modalViewLocal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
