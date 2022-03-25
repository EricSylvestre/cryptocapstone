import { createContext, useState} from "react";
import { getDoc, getFirestore, collection, addDoc, deleteDoc, query, getDocs} from "firebase/firestore"; 
import { useAuth } from "./AuthProvider";
import { firebaseApp } from "../firebase/config";

export const DataContext = createContext()

export const DataProvider = (props) => {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('')
    const { currentUser } = useAuth()
    

    const db = getFirestore()

    const addCoin = async (formData) => {
        let collectionRef = await collection(db, `users/${currentUser.id}/watchlist`)
        const docRef = await addDoc(collectionRef, formData)
        const newDoc = await getDoc(docRef)
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

    const deleteCoin = async () => {
        let q = query(collection(db, `users/${currentUser.id}/watchlist`))

        const querySnapshot = await getDocs(q);

        const deleteOps = [];

        querySnapshot.forEach((doc) => {
            deleteOps.push(deleteDoc(doc.ref));
        });
        //resets the watchlist to none
        document.getElementById('display').style.display = 'none'

        Promise.all(deleteOps).then(() => console.log('Watchlist deleted'))

    }
   
    const values = {
        coins, search, setSearch, addCoin, deleteCoin
    }

    return (
        <DataContext.Provider value={values} >
            {props.children}
        </DataContext.Provider>
    )
}