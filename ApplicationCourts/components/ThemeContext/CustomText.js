import React,{useContext} from 'react'
import { Text } from 'react-native'
import { FontContext } from './FontContext'


const CustomText = ({style, children, ...props}) => {
  const { fonts } = useContext(FontContext);

return (
  <Text style={[{ fontFamily: fonts.regular }, style]} {...props}>
    {children}
  </Text>
);

}

export default CustomText
