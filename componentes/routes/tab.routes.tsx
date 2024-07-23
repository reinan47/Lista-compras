import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import BodyApk from '../layout/bodyApk';
import FooterApk from '../layout/footerApk';
import HeaderApk from '../layout/headerApk';
import BotaoBar from '../componenteFooter/botaoBarTab';

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
}: TabRoutesProps) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Adicionar Lista"
        options={{
          headerShown: false,
          tabBarIcon: () => <BotaoBar total={total}/>,
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
                  modalApagaListVisible={modalApagaListVisible}
                  clearAllItems={clearAllItems}
                  selectedItemId={selectedItemId}
                  removeItem={removeItem}
                />
              </View>
              <FooterApk
                total={total}
                items={items}
                flagMostrar={flagMostrar}
                setModalApagaListaVisible={setModalApagaListaVisible}
              />
            </SafeAreaView>

          </>
        )}
      </Tab.Screen>

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <MaterialIcons name="list" size={24} color="black" />,
          tabBarStyle: {
            paddingTop: 5,
            paddingBottom: 5,
          },
          tabBarLabelStyle:{
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
                  modalApagaListVisible={modalApagaListVisible}
                  clearAllItems={clearAllItems}
                  selectedItemId={selectedItemId}
                  removeItem={removeItem}
                />
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
  titulo:{
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
});
