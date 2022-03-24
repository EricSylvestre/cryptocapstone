import React, { useContext, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthProvider'
import { DataContext } from '../contexts/DataProvider'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import { render } from '@testing-library/react';


export const Watchlist = ({ name, image, symbol, price, volume, priceChange, marketcap, rank }) => {

    const { currentUser } = useAuth()
    const db = getFirestore()
    const { addCoin } = useContext(DataContext)
    const [coins, setCoins] = useState([]);
    
    var cryptos = []
    const getWatchList = async () => {

        const querySnapshot = await getDocs(collection(db, "users/" + currentUser.id + "/watchlist"));
        querySnapshot.forEach((doc) => {

            // console.log((doc.data().watchlist));
            var info = doc.data().watchlist;
            cryptos.push(info);
         

        })
        // console.log(cryptos)
        
    
    }   
            
      
    // useEffect(() => {
    //     getWatchList()

    // }, [getWatchList]);


    

    return (
        <React.Fragment>
            <div className="crypto" >
                {
                    cryptos.map((c) => {
                        return (<p key={(1)}>{c}</p>)
                    })
                }
            </div >
        </React.Fragment>
  )
}



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
            {priceChange < 0 ? (
                <p className='coin-percent red'>{priceChange}%</p>
            ) : (<p className='coin-percent green'>{priceChange}%</p>)

            }
            <p className='coin-high'>${volume}</p>

            <p className='coin-marketcap'>
                Mkt Cap: ${marketcap}
            </p>
            {/* {
                            currentUser.loggedIn
                                ?
                                <button onClick={() => addWatchlist({ name })} className='add'>Add to Profile</button>

                                : false
                        } */}
    
       
