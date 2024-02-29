import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Details from '../screens/Details';
import Home from '../screens/Home';
import Actions from '../screens/Actions';
import RechercheTerrainMap from '../Maps/RechercheTerrainMap';
import { FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';


const Tab = createBottomTabNavigator();

function BottomTabNavigator() { 
  
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown:false,
        tabBarShowLabel:false,
        
        tabBarActiveBackgroundColor:'rgba(197, 44, 35,1)',
        tabBarIcon:({focused,color,size})=>{
            let iconName
            let iconcolor
            if(route.name==='Accueil'){
                iconName='home'
                iconcolor='white' 
            }
            if(route.name==='Details'){
                iconName='cogs'
                iconcolor='white'
            }
            if(route.name==='Recherche'){
                iconName='search'
                iconcolor='white'
            }
            if(route.name==='Actions'){
                iconName='plus'
                iconcolor='white'
            }

            if(!route.name === focused){
                iconcolor='rgba(197, 44, 35,1)'
            }



            return <FontAwesome5 name={iconName} size={24} color={iconcolor} />},
        tabBarStyle:{
          position:'absolute',
          borderTopLeftRadius:20,
          borderTopRightRadius:20,
          borderTopWidth:2,
          borderTopColor:'rgba( 20, 118, 199,0.3)'
          

        },
        tabBarBackground:()=>(
          <BlurView intensity={80}
          style={{...StyleSheet.absoluteFillObject,
          borderTopLeftRadius:20,
          borderTopRightRadius:20,
          overflow:'hidden',
          backgroundColor:'rgba(197, 44, 35,0.8)'
          }}/>
        )
        
        
    })}
    
    >
      <Tab.Screen name="Accueil" component={Home} options={{title:'Accueil'}}/>
      <Tab.Screen name="Details" component={Details} options={{title:'Details'}} />
      <Tab.Screen name="Actions" component={Actions} options={{title:'Actions'}}/>
      <Tab.Screen name="Recherche" component={RechercheTerrainMap} options={{title:'Recherche'}}/>
    </Tab.Navigator>
  );
}

export default BottomTabNavigator