import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ListaLocal = ({ setSelectedLocal, setItems, items, itemId, itemData }) => (
    <View style={{ justifyContent: 'center' }}>
        <Picker
            selectedValue={itemData.local}
            style={{ width: 152 }}
            onValueChange={(itemValue) => {
                setSelectedLocal(itemValue);
                const updatedItems = { ...items };
                updatedItems[itemId] = {
                    ...updatedItems[itemId],
                    local: itemValue,
                };
                setItems(updatedItems);
            }}
        >
            <Picker.Item label="Açai" value="Açai" />
            <Picker.Item label="I. Peixoto" value="D.Peixoto" />
            <Picker.Item label="GBarbosa" value="GBarbosa" />
            <Picker.Item label="M. Peixoto" value="M.Peixoto" />
            <Picker.Item label="N. Peixoto" value="N.Peixoto" />
        </Picker>
    </View>
);

export default ListaLocal;

const styles = StyleSheet.create({


});
