import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { addDoc, collection, getFirestore, getDocs, doc, getDoc, query, where, collectionGroup} from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'
import { WatchList } from '../components/WatchList'

import { onSnapshot} from "@firebase/firestore";
import { firebaseApp} from '../firebase/config';




export const Profile = () => {
    const { currentUser } = useAuth()
    const { watchlist, addWatchlist } = useContext(DataContext)
    const [filteredWatchlist, setfilteredWatchlist] = useState([])
    const db = getFirestore()
    
    
    
    const getWatchList = async () => {
        const querySnapshot = await getDocs(collection(db, "users/"+currentUser.id+"/watchlist"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log((doc.data().watchlist));
            

        })
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
                <p className='display'>Display Name : {currentUser.displayName}</p>
               
            </div>

            <hr />

            <p className='watchlist'>Watchlist</p>
            <WatchList />
            
            
            
            <button onClick={getWatchList}>Click me</button>

            
         
           

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

