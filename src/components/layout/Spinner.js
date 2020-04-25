import React from 'react'
import spinner from '../layout/spinner.gif';

export default function Spinner() {
    return (
        <div>
            <img src={spinner} alt="Loading..." style={{width:'200px',margin:'40px auto',display:'block'}}/>
             <h1 className='text-center'>Loading.....</h1>
        </div>
    )
}
