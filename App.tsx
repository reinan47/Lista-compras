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
  const [modalZerarListVisible, setModalZerarListaVisible] = useState<boolean>(false);
  const [flagMostrar, setMostrarBotaoLimpar] = useState<boolean>(true);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [valorInputs, setValorInputs] = useState<{ [key: string]: string }>({});
  const [corView, setCorView] = useState<boolean>(false);
  const [selectedLocal, setSelectedLocal] = useState<string>('Açai');
  const [valorChange, setValorChange] = useState<string>('');
  const [modalLocalVisible, setModalLocalVisible] = useState(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

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


  const ordenarItensPorNome = () => {
    const sortedEntries = Object.entries(items).sort(([, a], [, b]) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  
    const sortedItems = sortedEntries.reduce((acc, [key, item]) => {
      acc[key] = item;
      return acc;
    }, {} as { [key: string]: Item });
  
    if (JSON.stringify(sortedItems) !== JSON.stringify(items)) {
      setItems(sortedItems);
    }
  };  

  const ordenarItensPorPrecoDesc = () => {
    const sortedEntries = Object.entries(items).sort(([, a], [, b]) => {
      return Number(b.price) - Number(a.price);
    });
  
    const sortedItems = sortedEntries.reduce((acc, [key, item]) => {
      acc[key] = item;
      return acc;
    }, {} as { [key: string]: Item });
  
    setItems(sortedItems);
  };  

  const ordenarItensPorPrecoAsc = () => {
    const sortedEntries = Object.entries(items).sort(([, a], [, b]) => {
      return Number(a.price) - Number(b.price);
    });
  
    const sortedItems = sortedEntries.reduce((acc, [key, item]) => {
      acc[key] = item;
      return acc;
    }, {} as { [key: string]: Item });
  
    setItems(sortedItems);
  };  
  const ordenarSelecionadosPorPrecoAsc = () => {
    const selectedEntries = Object.entries(items)
      .filter(([, item]) => item.selected)
      .sort(([, a], [, b]) => Number(a.total) - Number(b.total));
  
    const unselectedEntries = Object.entries(items)
      .filter(([, item]) => !item.selected);
  
    const combinedEntries = [...selectedEntries, ...unselectedEntries];
  
    const reorderedItems = combinedEntries.reduce((acc, [key, item]) => {
      acc[key] = item;
      return acc;
    }, {} as { [key: string]: Item });
  
    setItems(reorderedItems);
  };

  const ordenarNaoSelecionadosPorPrecoAsc = () => {
    const unselectedEntries = Object.entries(items)
      .filter(([, item]) => !item.selected)
      .sort(([, a], [, b]) => Number(a.total) - Number(b.total)); // não selecionados ordenados
  
    const selectedEntries = Object.entries(items)
      .filter(([, item]) => item.selected); // selecionados mantêm ordem atual
  
    const combinedEntries = [...unselectedEntries, ...selectedEntries];
  
    const reorderedItems = combinedEntries.reduce((acc, [key, item]) => {
      acc[key] = item;
      return acc;
    }, {} as { [key: string]: Item });
  
    setItems(reorderedItems);
  };  

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
        local: 'Sem Local'
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
  const zeroAllItems = () => {
    const itensZerados = Object.fromEntries(
      Object.entries(items).map(([key, item]) => [
        key,
        { ...item, price: 0, total: 0, selected: false}
      ])
    );
  
    setItems(itensZerados);    
    setModalZerarListaVisible(false);
  };
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
  const updateItem = (itemId, price, quantity) => {
    price = formatarNumero(price);
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
            zeroAllItems={zeroAllItems}
            setModalZerarListaVisible={setModalZerarListaVisible}
            modalZerarListVisible={modalZerarListVisible}
            setValorChange={setValorChange}
            valorChange={valorChange}
            modalLocalVisible={modalLocalVisible}
            setModalLocalVisible={setModalLocalVisible}
            mostrarFiltros={mostrarFiltros}
            setMostrarFiltros={setMostrarFiltros}
            ordenarItensPorNome={ordenarItensPorNome}
            ordenarItensPorPrecoDesc={ordenarItensPorPrecoDesc}
            ordenarItensPorPrecoAsc={ordenarItensPorPrecoAsc}
            ordenarSelecionadosPorPrecoAsc={ordenarSelecionadosPorPrecoAsc}
            ordenarNaoSelecionadosPorPrecoAsc={ordenarNaoSelecionadosPorPrecoAsc}
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
