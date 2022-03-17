import React, { useState, useEffect } from 'react';
import axios from 'axios';





export const Coin = ({ name, image, symbol, price, volume, priceChange, marketcap, rank }) => {


    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
            .then(res => {
                setCoins(res.data);
            })
            .catch(error => console.log(error));
    }, []);


    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('')

    

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLocaleLowerCase())
    )

        return (

            <React.Fragment>
                
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
                


                <div className='coin-container'>
                    <div className='coin-row'>
                        <div className='coin'>
                            <h1 className='coin-rank'>{rank}</h1>
                            <img src={image} alt='crypto'></img>
                            <h1>{name}</h1>
                            <p className='coin-symbol'>{symbol}</p>
                        </div>
                        <div className='coin-data'>
                            <p className='coin-price'>${price}</p>
                            <p className='coin-high'>${volume}</p>
                            {priceChange < 0 ? (
                                <p className='coin-percent red'>{priceChange}%</p>
                            ) : (<p className='coin-percent green'>{priceChange}%</p>)

                            }
                            <p className='coin-marketcap'>
                                Mkt Cap: ${marketcap}
                            </p>

                            <button className='add'>Add to Profile</button>
                        </div>
                    </div>


                </div>



            </React.Fragment>
        )
    }



