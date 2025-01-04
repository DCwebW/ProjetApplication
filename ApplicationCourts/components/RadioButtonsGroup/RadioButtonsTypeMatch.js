import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RadioButton,Button } from 'react-native-paper';

const RadioButtonsTypeMatch = ({ setChecked, checked }) => {
  return (
    <View style={{ marginTop: 20, width: 255, borderRadius: 40, alignSelf: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
          <RadioButton
            value="2vs2"
            status={checked === '2vs2' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('2vs2')}
          />
        </View>
        <Text>2vs2</Text>
        <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
          <RadioButton
            value="3vs3"
            status={checked === '3vs3' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('3vs3')}
          />
        </View>
        <Text>3vs3</Text>
        <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
          <RadioButton
            value="5vs5"
            status={checked === '5vs5' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('5vs5')}
          />
        </View>
        <Text>5vs5</Text>
      </View>
      <View style={{alignItems:'center'}}>
      <Button
        onPress={() => setChecked('first')}
        style={styles.boutonChoixElements}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            
          }}
        >
          Annuler
        </Text>
      </Button>
      </View>
    </View>
  );
};

export default RadioButtonsTypeMatch;

const styles = StyleSheet.create({

  boutonChoixElements:{
    backgroundColor: 'rgba( 142, 8, 8 ,1)',
     width: 100, 
     height: 50,
     alignItems: 'center',
     marginTop:20,
     alignContent:'center'
  }
})