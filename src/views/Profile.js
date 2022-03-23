import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataProvider'
import {  collection, getFirestore, getDocs} from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'
import { firebaseApp} from '../firebase/config';


export const Profile = () => {
    const { currentUser } = useAuth()
    const db = getFirestore()


    
    var cryptos = []
    const getWatchList = async () => {
       
        const querySnapshot = await getDocs(collection(db, "users/"+currentUser.id+"/watchlist"));
        querySnapshot.forEach((doc) => {
        
            console.log((doc.data().watchlist));
            var info = doc.data().watchlist; 
            cryptos.push(info); 
            
        })
        console.log(cryptos)
             
    };


    const handleSubmit = async (e) => {
        e.preventDefault()


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

            {/* <p id='arrPrint'></p>
            <script>
                {document.getElementsByName("arrPrint").innerHTML = JSON.stringify([cryptos])}
            </script> */}

            <button onClick={getWatchList}>Load WatchList</button>

            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                    <div className="col-10">
                        <div className="form-group">
                        </div>
                    </div>
                    <div className="col-2">
                        <input type="submit" value="Remove" className='btn btn-info' />
                    </div>
                </div>
            </form>

            <hr />

        </React.Fragment>
    )
}

