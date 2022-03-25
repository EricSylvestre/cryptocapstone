import React, { useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'
import {  collection, getFirestore, getDocs} from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'

import { Coin } from '../components/Coin';
import { Watchlist } from '../components/Watchlist';





export const Profile = () => {
    const { currentUser } = useAuth()
    const db = getFirestore()
    const {deleteCoin} = useContext(DataContext)


    
    var cryptos = []
    const getWatchList = async () => {
       
        const querySnapshot = await getDocs(collection(db, "users/"+currentUser.id+"/watchlist"));
        querySnapshot.forEach((doc) => {
        
            var info = doc.data().watchlist; 
            console.log(info)
            cryptos.push(info);
            
        })
        
    };



    function clearWatchlist(e) {
        alert('Watchlist has been cleared!')

        let formData = {
            watchlist: e.name
        }
        deleteCoin(formData)
    }

   
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
            <div className='display' id='display'></div>
            <Watchlist />


            {
                currentUser.loggedIn
                    ?
                    <button onClick={() => clearWatchlist(Coin.name)} className='clear'>Clear Watchlist</button>

                    : false
            } 

            <hr />

        </React.Fragment>
    )
}

