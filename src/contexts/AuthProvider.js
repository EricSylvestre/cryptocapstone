import { createContext, useContext, useEffect, useState } from "react";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithPopup, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState({ loggedIn: false })
    let auth = getAuth()
    let provider = new GoogleAuthProvider()
    const db = getFirestore()

    function signIn() {
        return setPersistence(auth, browserLocalPersistence)
            .then(() => {
                signInWithPopup(auth, provider)
                    .then(result => {
                        // console.log( result )
                        console.log('User logged in successfully')
                    })
            })
            .catch(err => console.error(err))
    }

    function logOut() {
        signOut(auth)
            .then(() => {
                setCurrentUser({ loggedIn: false })
                console.log('User logged out successfully')
            })
    }

    useEffect(() => {
        // console.log( currentUser )
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userRef = doc(db, 'users', user.uid)
                setDoc(userRef, { email: user.email, name: user.displayName}, { merge: true })
                setCurrentUser({
                    id: user.uid,
                    name: user.displayName,
                    image: user.photoURL,
                    email: user.email,
                    loggedIn: true
                })
            }
        })
    }, [auth])


    const values = {
        signIn, currentUser, logOut
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )

}

