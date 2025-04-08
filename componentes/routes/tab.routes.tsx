import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import BodyApk from '../layout/bodyApk';
import NotaCompras from '../layout/notaCompras';
import FooterApk from '../layout/footerApk';
import HeaderApk from '../layout/headerApk';
import BotaoBar from '../componenteFooter/botaoBarTab';
import ItensRestantes from '../layout/itensRestantes';

const Tab = createBottomTabNavigator();

interface Item {
  name: string;
  price: number | string;
  quantity: number;
  total: number;
  selected: boolean;
  local: string;
}

interface TabRoutesProps {
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
  total: number;
  flagMostrar: boolean;
  setModalApagaListaVisible: (visible: boolean) => void;
  itemName;
  setItemName;
  addItem;
  zeroAllItems;
  modalZerarListVisible;
  setModalZerarListaVisible;
  setValorChange;
  valorChange;
}

export default function TabRoutes({
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
  total,
  flagMostrar,
  setModalApagaListaVisible,
  itemName,
  setItemName,
  addItem,
  zeroAllItems,
  modalZerarListVisible,
  setModalZerarListaVisible,
  setValorChange,
  valorChange
}: TabRoutesProps) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Adicionar Lista"
        options={{
          headerShown: false,
          tabBarIcon: () => <BotaoBar total={total} />,
          tabBarStyle: {
            paddingTop: 5,
            paddingBottom: 5
          },
          tabBarLabelStyle: {
            fontFamily: 'Roboto_700Bold',
            fontSize: 14
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',

        }}
      >
        {() => (
          <>
            <SafeAreaView style={styles.container}>
              <HeaderApk
                itemName={itemName}
                setItemName={setItemName}
                addItem={addItem}
                total={total}
              />
              <View style={styles.body}>
                <BodyApk
                  items={items}
                  toggleItemSelection={toggleItemSelection}
                  setCorView={setCorView}
                  setSelectedLocal={setSelectedLocal}
                  setItems={setItems}
                  updateItem={updateItem}
                  setValorInputs={setValorInputs}
                  valorInputs={valorInputs}
                  setSelectedItemId={setSelectedItemId}
                  setModalApagaItemVisible={setModalApagaItemVisible}
                  modalApagaItemVisible={modalApagaItemVisible}
                  setModalApagaListaVisible={setModalApagaListaVisible}
                  modalApagaListVisible={modalApagaListVisible}
                  clearAllItems={clearAllItems}
                  selectedItemId={selectedItemId}
                  removeItem={removeItem}
                  zeroAllItems={zeroAllItems}
                  setModalZerarListaVisible={setModalZerarListaVisible}
                  modalZerarListVisible={modalZerarListVisible}
                  setValorChange={setValorChange}
                  valorChange={valorChange}
                />
              </View>
              <FooterApk
                total={total}
                items={items}
                flagMostrar={flagMostrar}
                setModalApagaListaVisible={setModalApagaListaVisible}
                setModalZerarListaVisible={setModalZerarListaVisible}
              />
            </SafeAreaView>
          </>
        )}
      </Tab.Screen>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <MaterialIcons name="playlist-remove" size={24} color="black" />,
          tabBarStyle: {
            paddingTop: 5,
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontFamily: 'Roboto_700Bold',
            fontSize: 14
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        }}
        name="Itens Restante"
      >
        {() => (
          <>
            <SafeAreaView style={styles.container}>
              <View style={styles.titulo}>
                <Text style={{
                  textAlign: 'center',
                  fontFamily: 'Roboto_700Bold',
                  fontSize: 30
                }}>
                  Itens Restantes
                </Text>
              </View>
              <View style={[styles.body, { backgroundColor: '#c4bbb5', }]}>
                <ItensRestantes
                  items={items}
                  toggleItemSelection={toggleItemSelection}
                  setCorView={setCorView}
                  setSelectedLocal={setSelectedLocal}
                  setItems={setItems}
                  updateItem={updateItem}
                  setValorInputs={setValorInputs}
                  valorInputs={valorInputs}
                  setSelectedItemId={setSelectedItemId}
                  setModalApagaItemVisible={setModalApagaItemVisible}
                  modalApagaItemVisible={modalApagaItemVisible}
                  modalApagaListVisible={modalApagaListVisible}
                  clearAllItems={clearAllItems}
                  selectedItemId={selectedItemId}
                  removeItem={removeItem}
                  total={total}
                />
              </View>
              <View style={{
                height: 40,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}>
                <Text style={[styles.TamFont, { fontFamily: 'Roboto_700Bold', }]}>
                  TOTAL :       R$
                  {
                    Object.values(items).reduce((acc, item) => {
                      const total = typeof item.total === 'string'
                        ? parseFloat(item.total)
                        : item.total;
                      if (!item.selected)
                        acc = acc + (isNaN(total) ? 0 : total);
                      return acc;
                    }, 0).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })
                  }
                </Text>
              </View>
            </SafeAreaView>
          </>)}
      </Tab.Screen>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <MaterialIcons name="list" size={24} color="black" />,
          tabBarStyle: {
            paddingTop: 5,
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontFamily: 'Roboto_700Bold',
            fontSize: 14
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        }}
        name="Lista Completa"
      >
        {() => (
          <>
            <SafeAreaView style={styles.container}>
              <View style={styles.titulo}>
                <Text style={{
                  textAlign: 'center',
                  fontFamily: 'Roboto_700Bold',
                  fontSize: 30
                }}>
                  Nota das Compras
                </Text>
              </View>
              <View style={[styles.body, { backgroundColor: '#c4bbb5', }]}>
                <NotaCompras
                  items={items}
                  toggleItemSelection={toggleItemSelection}
                  setCorView={setCorView}
                  setSelectedLocal={setSelectedLocal}
                  setItems={setItems}
                  updateItem={updateItem}
                  setValorInputs={setValorInputs}
                  valorInputs={valorInputs}
                  setSelectedItemId={setSelectedItemId}
                  setModalApagaItemVisible={setModalApagaItemVisible}
                  modalApagaItemVisible={modalApagaItemVisible}
                  modalApagaListVisible={modalApagaListVisible}
                  clearAllItems={clearAllItems}
                  selectedItemId={selectedItemId}
                  removeItem={removeItem}
                  total={total}
                />
              </View>
              <View style={{
                height: 40,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}>
                <Text style={[styles.TamFont, { fontFamily: 'Roboto_700Bold', }]}>
                  TOTAL :       R$
                  {
                    Object.values(items).reduce((acc, item) => {
                      const total = typeof item.total === 'string'
                        ? parseFloat(item.total)
                        : item.total;
                      if (item.selected)
                        acc = acc + (isNaN(total) ? 0 : total);
                      return acc;
                    }, 0).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })
                  }
                </Text>
              </View>
            </SafeAreaView>
          </>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  titulo: {
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 20,
  },
  TamFont: {
    fontSize: 17,
    fontFamily: 'Roboto_400Regular',
  },
});
