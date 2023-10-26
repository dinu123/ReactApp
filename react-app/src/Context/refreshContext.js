import React, { createContext, useContext, useState } from "react";

export const RefreshContext = createContext({
    isListRefresh:0,
    setIsListRefresh:()=> {}
})

export const RefreshContextProvider = (props) => {
    const[isListRefresh,setIsListRefresh] = useState(0);
    const listChangeHandler = () => {
        setIsListRefresh(prev => prev+1)
    }
    return (
        <RefreshContext.Provider value={{"isListRefresh":isListRefresh,"setIsListRefresh":listChangeHandler}} >
            {props.children};
        </RefreshContext.Provider>
    )
}