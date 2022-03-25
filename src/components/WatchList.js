import React, {useEffect } from 'react';
import { useAuth } from '../contexts/AuthProvider'
import { getFirestore, getDocs, collection } from 'firebase/firestore'


export const Watchlist = () => {

    const { currentUser } = useAuth()
    const db = getFirestore()
   
    var cryptos = []
    const getWatchList = async () => {

        const querySnapshot = await  getDocs(collection(db, "users/" + currentUser.id + "/watchlist"));
        querySnapshot.forEach((doc) => {

            // console.log((doc.data().watchlist));
            var info = doc.data().watchlist;
            cryptos.push(info);
            
         
        })
    
        console.log(cryptos)

    }   
    // Wait for database query to complete, then inject saved list of cryptos into 'display' container         
    useEffect(() => {
        setTimeout(
            function(){
                for (var x=0; x<cryptos.length; x++ ){
                    var parent = document.getElementById('display')
                    var d = document.createElement('div')
                    d.setAttribute('style','color:green; font-weight: 700; font-size: 28px ')
                    var tmp = document.createTextNode(cryptos[x])
                    d.appendChild(tmp)
                    parent.appendChild(d)
                }
        }, 400)
                
                
        
        getWatchList()

    }, [getWatchList]);

    
    return (
       
     null
    )
}

    
       
