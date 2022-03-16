import { render } from '@testing-library/react'
import React from 'react'


export const Chart = () => 
{
    const Coin = ({ name, image, symbol, price, volume, priceChange, marketcap, rank }) => {

    
        return (
            <React.Fragment>
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

                {/* {filteredCoins.map(coin => {
                        return <Chart
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

            </React.Fragment>
        )
    }}
