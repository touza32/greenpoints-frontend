import React, { useState,useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList} from "react-native";
import styleText from "../styles/Text";
import greenPointsApi from '../api/greenPointsApi';


export default function ModalIntercambio (props) {
    const { visible, hideModal } = props
    const [UnIntercambio,setIntercambio] = useState(null);
    const [Detalle,setDetalle] = useState(null);

    useEffect(() => {
      async function fetchData(){
      const data = await greenPointsApi.get('/intercambio/' + props.data);
      setIntercambio(data.data);
      setDetalle(data.data.detail);
     
  }
  fetchData();
  
},[]);


    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          //JT: se usa el estado "visible" recibido del padre
          visible={visible}
          backdropOpacity= {0.90}
          /*onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
          }}*/
          
        >
          <View style={{flex: 1,justifyContent: "center"}}>
          {UnIntercambio && (
            <View style={styles.modalView}>
             <Text style={styleText.titleList}>{UnIntercambio.name}</Text>
              <Text style={styles.modalText}>Tus reciclabes se encuentran según su tipo en:</Text>

              <FlatList
                data={Detalle}
                keyExtractor={item => item.tipoReciclableName}
                renderItem={({ item }) => (

                 
                  
                  <View style={{marginBottom:10}}>
                  {item.closedLote 
                    ?(<Text style={{fontSize: 18,textAlign: "center"}}>{item.tipoReciclableName + ': ' + item.plantaName}</Text>)
                    :(<Text style={{fontSize: 18,textAlign: "center"}}>{item.tipoReciclableName + ': ' + UnIntercambio.puntoReciclajeName}</Text>)} 
                  
                  {item.closedLote
                    ?(<Text style={{fontSize:16,color:'#B2B2B2',textAlign: "center"}}>{'Planta Recicladora en ' + item.plantaAddress}</Text>)  
                    :(<Text style={{fontSize:16,color:'#B2B2B2',textAlign: "center"}}>{'Punto de Reciclaje en ' + UnIntercambio.puntoReciclajeAddress}</Text>
                    
                  )}
                  </View>
                  

          
            
                  )}

                /> 
                  
                   {/* JT: en onPress se llama al callback    */}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => hideModal()}
              >
                <Text style={styles.textStyle}>Ok</Text>
              </Pressable>
            </View>
          )}
          </View>
        </Modal>
     
      </View>
    );




}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 15,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      marginTop:5,
      backgroundColor: "#CC7D00",
    },
    textStyle: {
      color: "white",
      fontSize:20,
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      fontSize: 14,
      color: '#B2B2B2',
      marginBottom: 10,
      textAlign: "center"
    }
  });
  