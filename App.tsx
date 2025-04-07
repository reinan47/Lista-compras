import React, { useState, useEffect, } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './componentes/routes/tab.routes';



interface Item {
  name: string;
  price: number | string;
  quantity: number;
  total: number;
  selected: boolean;
  local: string;
}

const App = () => {
  const [items, setItems] = useState<{ [key: string]: Item }>({});
  const [total, setTotal] = useState<number>(0);
  const [itemName, setItemName] = useState<string>('');
  const [safeAreaHeight, setSafeAreaHeight] = useState<number>(0);
  const [modalApagaItemVisible, setModalApagaItemVisible] = useState<boolean>(false);
  const [modalApagaListVisible, setModalApagaListaVisible] = useState<boolean>(false);
  const [flagMostrar, setMostrarBotaoLimpar] = useState<boolean>(true);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [valorInputs, setValorInputs] = useState<{ [key: string]: string }>({});
  const [corView, setCorView] = useState<boolean>(false);
  const [selectedLocal, setSelectedLocal] = useState<string>('Açai');
  const [totalAcai, setTotalAcai] = useState<number>(0);

  useEffect(() => {
    const tamanhoLista = Object.keys(items).length;
    setMostrarBotaoLimpar(tamanhoLista > 0);
  }, [items]);

  useEffect(() => {
    // Carregar os dados salvos ao iniciar o aplicativo
    AsyncStorage.getItem('items').then(data => {
      if (data) {
        const parsedItems: { [key: string]: Item } = JSON.parse(data);

        // Substituir ponto por vírgula nos preços e garantir que seja uma string
        const itemsWithCommaPrices = Object.keys(parsedItems).reduce((acc, key) => {
          const item = parsedItems[key];
          acc[key] = {
            ...item,
            price: item.price.toString().replace('.', ','),
          };
          return acc;
        }, {} as { [key: string]: Item });

        setItems(itemsWithCommaPrices);
      }
    });

    const calculateSafeArea = () => {
      const statusBarHeight = StatusBar.currentHeight || 0;
      setSafeAreaHeight(statusBarHeight);
    };

    calculateSafeArea();
  }, []);


  useEffect(() => {
    // Função para ordenar os itens por nome
    const sortItemsByName = (): { [key: string]: Item } => {
      const sortedItemsArray: Item[] = Object.values(items).sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      const sortedItems: { [key: string]: Item } = {};
      sortedItemsArray.forEach((item, index) => {
        const key = Object.keys(items)[index];
        sortedItems[key] = item;
      });

      return sortedItems;
    };

    const updatedItems = sortItemsByName();
    if (JSON.stringify(updatedItems) !== JSON.stringify(items)) {
      setItems(updatedItems);
    }
  }, [items]);


  useEffect(() => {
    // Calcular o total sempre que houver mudanças nos itens
    const newTotal = Object.values(items).reduce(
      (acumuladorSoma, item) => {
        if (item.price) { // Verificar se item.price está definido
          return acumuladorSoma + (parseFloat(item.price.toString().replace(",", ".")) * item.quantity);
        } else {
          return acumuladorSoma;
        }
      }, 0
    );
    setTotal(newTotal);
  
    // Salvar os dados sempre que houver mudanças nos itens
    AsyncStorage.setItem('items', JSON.stringify(items));
  }, [items]);
  

  const addItem = () => {
    if (itemName) {
      const newItemId = Math.random().toString();
      const newItem = {
        name: itemName,
        price: 0,
        quantity: 0,
        total: 0,
        selected: false,
        local: ''
      };
      setItems({ ...items, [newItemId]: newItem });
      setItemName('');
    }
  };

  const removeItem = () => {
    const updatedItems = { ...items };
    delete updatedItems[selectedItemId];
    setItems(updatedItems);
    setModalApagaItemVisible(false);
  };
  const clearAllItems = () => {
    setItems({});
    setModalApagaListaVisible(false);
  };
  const updateItem = (itemId, price, quantity) => {
    price = price.replace(/\./g, '').replace(',', '.');

    const updatedItems = { ...items };
    updatedItems[itemId] = {
      ...updatedItems[itemId],
      price: parseFloat(price) || 0,
      quantity: parseInt(quantity) || 0,
      total: (parseFloat(price) || 0) * (parseInt(quantity) || 0)
    };

    setItems(updatedItems);
  };

  const toggleItemSelection = (itemId) => {
    const updatedItems = { ...items };
    updatedItems[itemId].selected = !updatedItems[itemId].selected;
    setItems(updatedItems);
  };


  let [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { marginTop: safeAreaHeight }]}>
      <View style={styles.content}>
        <NavigationContainer>
          <TabNavigator
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
            flagMostrar={flagMostrar}
            setModalApagaListaVisible={setModalApagaListaVisible}
            itemName={itemName}
            setItemName={setItemName}
            addItem={addItem}
          />
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#E4EBEB',
  },
  content: {
    flex: 1,
    paddingBottom: 5,
  },
});

export default App;
