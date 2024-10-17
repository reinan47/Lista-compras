import { StyleSheet, View, TextStyle } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const ListaLocal = ({ setSelectedLocal, setItems, items, itemId, itemData }) => (
    <View style={{ justifyContent: 'center' }}>
        <Picker
            selectedValue={itemData.local}
            style={{ width: 200, fontFamily: 'Roboto_400Regular' }}
            onValueChange={(itemValue) => {
                setSelectedLocal(itemValue);
                const updatedItems = { ...items };
                updatedItems[itemId] = {
                    ...updatedItems[itemId],
                    local: itemValue,
                };
                setItems(updatedItems);
            }}
            itemStyle={{ fontFamily: 'Roboto_400Regular', fontSize: 16 }}
        >
            <Picker.Item 
            label="Açai" value="Açai" />
            <Picker.Item label="Irmãos Peixoto" value="D.Peixoto" />
            <Picker.Item label="GBarbosa" value="GBarbosa" />
            <Picker.Item label="Messias Peixoto" value="M.Peixoto" />
            <Picker.Item label="Nunes Peixoto" value="N.Peixoto" />
        </Picker>
    </View>
);

export default ListaLocal;

const styles = StyleSheet.create({


});
