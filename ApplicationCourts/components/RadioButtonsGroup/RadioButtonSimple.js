import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, useState } from 'react-native-paper';

const RadioButtonSimple = () => {
  const [checked, setChecked] = useState('first');

  return (
    <View>
      <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      />
      <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      />
    </View>
  );
};

export default RadioButtonSimple;