import { createContext, useState} from "react";
import { getDoc, getFirestore, collection, addDoc} from "firebase/firestore"; 
import { useAuth } from "./AuthProvider";

export const DataContext = createContext()

export const DataProvider = (props) => {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('')
    const { currentUser } = useAuth()
    

    const db = getFirestore()


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


    
    

    const values = {
        coins, search, setSearch, addCoin
    }

    return (
        <DataContext.Provider value={values} >
            {props.children}
        </DataContext.Provider>
    )
}