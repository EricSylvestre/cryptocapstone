import React, { useContext} from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { Chart } from '../components/Chart';
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
                        <h1 className="coint-text">Search a currency</h1>
                        <form>
                            <input type="text" placeholder='Search' className='coin-input' onChange={handleChange}></input>
                        </form>
                    </div>


                    {/* <div className='coin-container'>
                        <div className='coin-row'>
                            <div className='coin'>
                                <h1 className='coin-rank'>{rank}</h1>
                                <img src={image} alt='crypto'></img>
                                <h1>{name}</h1>
                                <p className='coin-symbol'>{symbol}</p>
                            </div>
                            <div className='coin-data'>
                                <p className='coin-price'>${price}</p>
                                <p className='coin-high'>${volume.toLocaleString()}</p>
                                {priceChange < 0 ? (
                                    <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
                                ) : (<p className='coin-percent green'>{priceChange.toFixed(2)}%</p>)

                                }
                                <p className='coin-marketcap'>
                                    Mkt Cap: ${marketcap.toLocaleString()}
                                </p>

                                <button className='add'>Add to Profile</button>
                            </div>
                        </div>
                    </div>

                    <div>
                    {filteredCoins.map(coin => {
                        return <Coin
                            rank={coin.market_cap_rank}
                            key={coin.id}
                            name={coin.name}
                            image={coin.image}
                            symbol={coin.symbol}
                            price={coin.current_price}
                            marketcap={coin.market_cap}
                            priceChange={coin.price_change_percentage_24h}
                            volume={coin.total_volume}


                        />;
                    })} */}
                    </div>

            </React.Fragment>
        )
    }
