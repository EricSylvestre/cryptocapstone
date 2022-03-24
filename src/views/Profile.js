import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataProvider'
import {  collection, getFirestore, getDocs} from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'
import { firebaseApp} from '../firebase/config';
import { Coin } from '../components/Coin';
import { Watchlist } from '../components/Watchlist';
import axios from 'axios';


export const Profile = () => {
    const { currentUser } = useAuth()
    const db = getFirestore()
    const [coins, setCoins] = useState([]);
    const {deleteCoin} = useContext(DataContext)
    const [search, setSearch] = useState('')


    
    
   
    
    var cryptos = []
    const getWatchList = async () => {
       
        const querySnapshot = await getDocs(collection(db, "users/"+currentUser.id+"/watchlist"));
        querySnapshot.forEach((doc) => {
        
            // console.log((doc.data().watchlist));
            var info = doc.data().watchlist; 
            cryptos.push(info); 
            
            
        })
        console.log(cryptos)
        
        
    };

 
    useEffect(() => {
        getWatchList()

    },[getWatchList]);
    

    // useEffect(() => {
    //     axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
    //         .then(res => {
    //             setCoins(res.data);

    //         })
    // }, []);

    // const filteredCoins = coins.filter(coin =>
    //     coin.name.toLowerCase().includes(search.toLocaleLowerCase())
    // )

   
    return (
        <React.Fragment>
        
            <div className="row">
                <div className="col-2 offset-5">
                    <img className='img-fluid' src={currentUser.image} alt={currentUser.name} />
                    
                </div>
            </div>
            <div>
                <p className='info'>My Info</p>
            </div>
            <div>
                <p className='name'>Name : {currentUser.name}</p>
                <p className='email'>Email : {currentUser.email}</p> 
            </div>
            <hr />

            <p className='watchlist'>Watchlist</p>
            
            

          
            {/* <div>
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
            </div> */}


            <button className='remove'>Remove from Profile</button>

            <hr />

        </React.Fragment>
    )
}

