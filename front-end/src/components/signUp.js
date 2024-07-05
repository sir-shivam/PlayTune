import React from 'react';

const SignUp = ()=> {
    return(
        <div>
            <h1>Register</h1>
            <input className='inputBox' type='text' placeholder='Enter Name' />
            <input className='inputBox' type='text' placeholder='Enter Email' />
            <input className='inputBox' type='Password' placeholder='Enter Password' />
        </div>
    )
}

export default SignUp;