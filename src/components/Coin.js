import React, {useContext} from 'react';
import { useAuth } from '../contexts/AuthProvider'
import { DataContext } from '../contexts/DataProvider'
import { getFirestore} from 'firebase/firestore'



export const Coin = ({ name, image, symbol, price, volume, priceChange, marketcap, rank }) => {

    const { currentUser } = useAuth()
    const db = getFirestore()
    const { addCoin } = useContext(DataContext)

    function addWatchlist (e) {
        alert(e.name + ' has been added')

        let formData = {
            watchlist: e.name
            
        }

        addCoin(formData)
    }

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
                            <p className='coin-price'>${price.toLocaleString()}</p>
                            {priceChange < 0 ? (
                                <p className='coin-percent red'>{priceChange.toLocaleString()}%</p>
                            ) : (<p className='coin-percent green'>{priceChange.toLocaleString()}%</p>)

                            }
                            <p className='coin-high'>${volume.toLocaleString()}</p>
                            
                            <p className='coin-marketcap'>
                                Mkt Cap: ${marketcap.toLocaleString()}
                            </p>
                            {
                             currentUser.loggedIn
                                ?
                                    <button onClick={() => addWatchlist({name})} className='add'>Add to Profile</button>
                            : false
                            } 
                        </div>
                    </div>


                </div>



            </React.Fragment>
        )
    }



