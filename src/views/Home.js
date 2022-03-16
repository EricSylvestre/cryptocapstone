import React, { useContext} from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from '../components/Chart';
import { DataContext } from '../contexts/DataProvider'
import { getFirestore} from 'firebase/firestore'



export const Home = () => {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('')
    const db = getFirestore()
        

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLocaleLowerCase())
    )

    // const Coin = ({ name, image, symbol, price, volume, priceChange, marketcap, rank }) => {

        return (
            <React.Fragment>
                
                <div className="coin-app">
                    <div className="coin-search">
                        <h1 className="coint-text">Search Here!</h1>
                        <form>
                            <input type="text" placeholder='Search' className='coin-input' onChange={handleChange}></input>
                        </form>
                    </div>

                    
                    </div>

            </React.Fragment>
        )
    }
{/* <Chart /> */ }