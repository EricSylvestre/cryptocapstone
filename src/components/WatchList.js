import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { addDoc, collection, getFirestore, getDocs, doc, getDoc, query, where, collectionGroup } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'



export const WatchList = ({cryptos}) => {

    var cryptos = []

    const db = getFirestore()
    const { currentUser } = useAuth()
    const getWatchList = async () => {
        const querySnapshot = await getDocs(collection(db, "users/" + currentUser.id + "/watchlist"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            cryptos.append((doc.data().watchlist));


        })
    };

  return (
      <React.Fragment>
       <div>{cryptos}</div>  
      </React.Fragment> 
      
  )
}
