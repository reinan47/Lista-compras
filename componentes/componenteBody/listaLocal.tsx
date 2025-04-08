import { StyleSheet, View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

const ListaLocal = ({ setItems, items, itemId, itemData, modalLocalVisible, setModalLocalVisible }) => (
  <View style={{ justifyContent: 'center' }}>
    <TouchableOpacity
      onPress={() => setModalLocalVisible(true)}
      style={styles.selector}
    >
      <Text style={styles.selectorText}>
        {itemData.local || 'Selecionar local'}
      </Text>
    </TouchableOpacity>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalLocalVisible}
      onRequestClose={() => setModalLocalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalLocalVisible(false)}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalView}>

              {['Açai', 'D.Peixoto', 'GBarbosa', 'M.Peixoto', 'N.Peixoto'].map((local) => (
                <TouchableOpacity
                  key={local}
                  style={styles.modalButton}
                  onPress={() => {
                    const updatedItems = { ...items };
                    updatedItems[itemId] = {
                      ...updatedItems[itemId],
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

export default ListaLocal;

const styles = StyleSheet.create({
  selector: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  selectorText: {
    fontFamily: 'Roboto_400Regular',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 18,
    fontFamily: 'Roboto_400Regular',
  },
  modalButton: {
    padding: 10,
    width: 150,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },
});
