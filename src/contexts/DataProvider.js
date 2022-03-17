import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { firebaseApp } from '../firebase/config'

export const DataContext = createContext()

export const DataProvider = (props) => {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('')
    

    // useEffect(() => {
    //     axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
    //         .then(res => {
    //             setCoins(res.data);
    //         })
    //         .catch(error => console.log(error));
            
    // }, []);


    useEffect(() => {
        console.log(firebaseApp)
    }, []);


    const values = {
        coins, search, setSearch
    }

    return (
        <DataContext.Provider value={values} >
            {props.children}
        </DataContext.Provider>
    )
}