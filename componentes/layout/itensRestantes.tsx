import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Item {
    name: string;
    price: number | string;
    quantity: number;
    total: number;
    selected: boolean;
    local: string;
}
const formatar = (value) => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
};

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
    total: number;
}

const ItensLista: React.FC<ItensListaProps> = ({
    items,
    total
}) => {
    return (
        <View style={{ paddingHorizontal: 5, }}>
            {Object.keys(items).length === 0 ? (
                <View style={styles.emptyListContainer}>
                    <Text style={styles.emptyListText}>Sem Itens Restantes</Text>
                    <Text style={styles.emptyListText}>Lista Vazia!</Text>
                    <Icon name="frown-o" size={50} color="#E02426" />
                </View>
            ) : (
                <FlatList
                    data={Object.entries(items)}
                    ListHeaderComponent={() => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15 }}>
                            <Text style={[styles.columnProduto, styles.font]}>PRODUTO</Text>
                            <Text style={[styles.columnUnd, styles.font]}>UND</Text>
                            <Text style={[styles.columnValorUnd, styles.font]}>VALOR UND</Text>
                            <Text style={[styles.columnTotal, styles.font]}>TOTAL</Text>
                        </View>
                    )}
                    renderItem={({ item }) => {
                        const [itemId, itemData] = item;
                        return (
                            !itemData.selected ?
                                <View>
                                    <ScrollView
                                        keyboardShouldPersistTaps="handled"
                                    >
                                        <SafeAreaView>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={[styles.textItem, styles.columnProduto, styles.font]}>{itemData.name}</Text>
                                                <Text style={[styles.textData, styles.columnUnd, styles.font]}>{itemData.quantity}x</Text>
                                                <Text style={[styles.textData, styles.columnValorUnd, styles.font]}>R$ {formatar(itemData.price)}</Text>
                                                <Text style={[styles.textData, styles.columnTotal, styles.font]}>R$ {formatar(itemData.total)}</Text>
                                            </View>
                                        </SafeAreaView>
                                    </ScrollView>
                                </View>
                            : null
                        );

                    }}
                    keyExtractor={(item) => item[0]}
                    style={{ top: 10 }}
                />
            )}
        </View>
    );
};
export default ItensLista;

const styles = StyleSheet.create({
    font: {
        fontFamily: 'Roboto_700Bold',
    },
    textItem: {
        fontSize: 16,
        color: '#333',
        textAlign: 'left',
    },
    textData: {
        color: '#333',
        textAlign: 'left',
    },
    columnProduto: {
        width: '40%',
    },
    columnUnd: {
        width: '17%',
    },
    columnValorUnd: {
        width: '25%',
        textAlign: 'left',
    },
    columnTotal: {
        width: '25%',
        textAlign: 'left',
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
});
