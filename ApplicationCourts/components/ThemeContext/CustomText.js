import React,{useContext} from 'react'
import { Text } from 'react-native'
import { FontContext } from './FontContext'


const CustomText = ({style, children, ...props}) => {
  const { fonts } = useContext(FontContext);

return (
  <CustomText<Text style={[{ fontFamily: fonts.regular }, style]} {...props}>
    {children}
  </CustomText>
);

}

export default CustomText
