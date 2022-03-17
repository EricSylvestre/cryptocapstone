import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'

export const Profile = () => {
    // console.log('first thing')
    const { currentUser } = useAuth()
    const { posts, addPost } = useContext(DataContext)
    const [filteredPosts, setfilteredPosts] = useState([])
    const db = getFirestore()

    // console.log( currentUser )

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

