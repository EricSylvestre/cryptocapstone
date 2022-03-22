import React, { useContext, useState, useEffect} from 'react'
import { Coin } from '../components/Coin';
import '../index.css'
import axios from 'axios';


export const Home = () => {

    const [coins, setCoins] = useState([]);

    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
            .then(res => {
                setCoins(res.data);
                console.log(res.data)
            })
            .catch(error => console.log(error));
    }, []);

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLocaleLowerCase())
    )
    
    const handleChange = e => {
        setSearch(e.target.value)
    }
    return(
        <React.Fragment>

            <div className="coin-app">
                <div className="coin-search">
                    <h1 className='search' >Search Crypto's</h1>
                    <form>
                        <input type="text" placeholder='Search' className='coin-input' onChange={handleChange}></input>
                    </form>
                    
                </div>
            </div>

            <h1 className='top'>Top 250</h1>
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
                })}
        </div>

        </React.Fragment>
    )}
