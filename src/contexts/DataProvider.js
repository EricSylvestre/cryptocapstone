import axios from "axios";
import { createContext, useEffect, useState, useContext, useCallback} from "react";
import { firebaseApp } from '../firebase/config'
import { getDocs, getDoc, getFirestore, query, collectionGroup, collection, addDoc, orderBy, doc, updateDoc, setDoc } from "firebase/firestore"; 
import { useAuth } from "./AuthProvider";



export const DataContext = createContext()

export const DataProvider = (props) => {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('')
    const { currentUser } = useAuth()
    const [watchlist, setWatchlist] = useState([])

    const db = getFirestore()

    const getCoins = useCallback(
        async () => {
        

            // When making custom Firebase index queries, create your own custom one here: https://console.firebase.google.com/project/reactbook-jan-derek/firestore/indexes/single-field/manage
            // CUSTOM INDEX QUERY DOCUMENTATION: https://firebase.google.com/docs/firestore/query-data/indexing?authuser=0&hl=en
            const q = query(
                collectionGroup(db, 'watchlist'),
               
            )

            const querySnapshot = await getDocs(q)

            let newCoins = [];
            querySnapshot.forEach(async doc => {
                const userRef = await getDoc(doc.ref.parent.parent);
            

                newCoins.push({
                    id: doc.id,
                    ...doc.data(),
                    user: {
                        id: userRef.id,
                        ...userRef.data()
                    }
                })
                setCoins(coins.concat(newCoins))
            })

            return querySnapshot;
        },
        [db],
    )


    const addCoin = async (formData) => {
        let collectionRef = await collection(db, `users/${currentUser.id}/watchlist`)

        // once we try to add the new document to firebase, we can grab all of its information here
        // await addDoc(collectionRef, formData)
        const docRef = await addDoc(collectionRef, formData)

        // after we created a new document inside Firebase, we can then grab it using getDoc
        const newDoc = await getDoc(docRef)

        // get access to the deeply nested document's current user and grab their data so we can use it to pass into our new posts list
        const userRef = await getDoc(docRef.parent.parent)

        setCoins([
            {
                id: newDoc.id,
                ...newDoc.data(),
                user: {
                    id: currentUser.id,
                    ...userRef.data()
                }

            },
            ...coins
        ])
    }


    useEffect(() => {
        getCoins()
    }, [getCoins])
    

    const values = {
        coins, search, setSearch, addCoin
    }

    return (
        <DataContext.Provider value={values} >
            {props.children}
        </DataContext.Provider>
    )
}