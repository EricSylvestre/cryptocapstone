import React, { useContext, useState, useEffect} from 'react'
import { Coin } from '../components/Coin';
import '../index.css'



export const Home = () => {

    

    const [search, setSearch] = useState('')

    const handleChange = e => {
        setSearch(e.target.value)
    }
    return(
        <React.Fragment>

            <div className="coin-app">
                <div className="coin-search">
                    <h1 className='search' >Search Crypto's</h1>
                    <form>
                        <input type="text" placeholder='Search' className='coin-input' onChange={handleChange}></input>
                    </form>
                </div>
            </div>
        <div>
        <Coin/>
        </div>

        </React.Fragment>
    )}
