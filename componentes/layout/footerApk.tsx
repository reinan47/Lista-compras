import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { IconVasoura, IconDetalheBotao } from '../icon/IconVasoura';


const Footer = ({ total, items, flagMostrar, setModalApagaListaVisible, }) => (

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
            <View style={styles.viewTotalPagar}>
                <Text style={{ paddingBottom: 5, fontSize: 22, fontFamily: 'Roboto_700Bold' }}>TOTAL A PAGAR</Text>
                <Text style={[styles.textoTotalPagar, { color: total >= 600 ? '#E02426' : '#32cd32', }]}>R$ {total.toFixed(2).replace(".", ",")}</Text>
            </View>
            {flagMostrar && (
                <View style={{ paddingBottom: 5, }}>
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
                </View>
            )}
        </View>
    </View>
);

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#E4EBEB',
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 16,
    },
    viewTotalItens: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        borderBottomWidth: 2,
        borderColor: 'white',
    },
    viewTotalPagar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottomWidth: 2,
        borderColor: 'white',
    },
    botaoClear: {
        width: 150,
        height: 38,
        backgroundColor: '#E02426',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    textoBotao: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Roboto_400Regular'
    },
    textoTotalItens: {
        paddingBottom: 5,
        fontSize: 20,
        fontFamily: 'Roboto_400Regular'
    },
    textoTotalPagar: {
        paddingBottom: 5,
        fontSize: 22,
        fontFamily: 'Roboto_700Bold'
    },
    shadow: {
        height: 7,
    },
});

export default Footer;


