import React,{createContext,useMemo} from 'react'

export const FontContext = createContext()

export const FontProvider = ({children}) => {

    const fonts ={
        regular:'Kanit-Light'
    }
  return (
   <FontContext.Provider value={{fonts}}>
    {children}
    </FontContext.Provider>
    
)
}


