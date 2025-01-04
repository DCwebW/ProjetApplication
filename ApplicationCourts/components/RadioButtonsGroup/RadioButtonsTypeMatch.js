import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

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
      <TouchableOpacity
        onPress={() => setChecked('first')}
        style={{ alignItems: 'center', marginTop: 20 }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            backgroundColor: 'rgba( 142, 8, 8 ,1)',
            width: 150,
            height: 50,
            paddingTop: 20,
          }}
        >
          Annuler
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RadioButtonsTypeMatch;
