import React from 'react'

import { collection, getFirestore, getDocs } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'


export const WatchList = () => {
    var cryptos = []

    const db = getFirestore()
    const { currentUser } = useAuth()
    const getWatchList = async () => {
        const querySnapshot = await getDocs(collection(db, "users/" + currentUser.id + "/watchlist"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            cryptos.push((doc.data().watchlist));
            console.log(doc.data)


        })
    };


    return (
        <div>
            {cryptos.map(() => {
                const list = (
                    <>
                        <ul>
                            <li>Id: {cryptos}</li>
                        </ul>
                        <hr />
                    </>
                );
                return list;
            })}
        </div>
    );
}




 

