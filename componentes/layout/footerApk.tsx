import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { IconVasoura, IconDetalheBotao } from '../icon/IconVasoura';

const Footer = ({ total, items, flagMostrar, setModalApagaListaVisible, setModalZerarListaVisible }) => (

    <View>
        <LinearGradient
            colors={['transparent', '#cccccc']} // Gradiente de sombra
            style={styles.shadow}
        />
        <View style={styles.footer}>
            <View style={styles.viewTotalItens}>
                <Text style={styles.textoTotalItens}>TOTAL DE ITENS</Text>
                <Text style={styles.textoTotalItens}>{Object.keys(items).length}</Text>
            </View>
            <View style={styles.viewTotalItens}>
                <Text style={styles.textoTotalItens}>TOTAL DE ITENS COMPRADOS</Text>
                <Text style={styles.textoTotalItens}>{Object.values(items).filter((item) => (item as { selected: boolean }).selected).length}</Text>
            </View>
            <View style={[styles.viewTotalPagar, { borderBottomWidth: flagMostrar ? 2 : 0, }]}>
                <Text style={{ paddingBottom: 0, fontSize: 16, fontFamily: 'Roboto_700Bold' }}>TOTAL A PAGAR</Text>
                <Text style={[styles.textoTotalPagar, { color: total >= 600 ? '#E02426' : '#32cd32', }]}>
                    R$ {total.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}</Text>
            </View>
            {flagMostrar && (
                <View style={{ paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={styles.botaoClear}
                        onPress={() => {
                            setModalApagaListaVisible(true);
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <IconVasoura />
                                <IconDetalheBotao />
                            </View>
                            <Text style={styles.textoBotao}>  LIMPAR LISTA</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.botaoZerar}
                        onPress={() => {
                            setModalZerarListaVisible(true);
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.textoBotao, {top: 0}]}>  ZERAR  </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    </View>
);

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#E4EBEB',
        paddingTop: 6,
        paddingBottom: 5,
        paddingHorizontal: 16,
    },
    viewTotalItens: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        borderBottomWidth: 2,
        borderColor: 'white',
    },
    viewTotalPagar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderColor: 'white',
    },
    botaoClear: {
        width: 120,
        height: 30,
        backgroundColor: '#E02426',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    textoBotao: {
        color: 'white',
        top: 2,
        fontSize: 14,
        fontFamily: 'Roboto_400Regular'
    },
    textoTotalItens: {
        fontSize: 15,
        fontFamily: 'Roboto_400Regular'
    },
    textoTotalPagar: {
        fontSize: 16,
        fontFamily: 'Roboto_700Bold'
    },
    shadow: {
        height: 7,
    },
    botaoZerar: {
        width: 70,
        height: 30,
        backgroundColor: '#E02426',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    }, 
});

export default Footer;


