import React, { Component, useEffect, useState } from 'react';
import './login.css';

function LoginPopup(props) {

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');


        async function login(event) {
            event.preventDefault();
            const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            let authData;
            if (validEmailRegex.test(usernameOrEmail)) {
                authData = { usernameOrEmail, password }
            } else {
                authData = { usernameOrEmail, password }
            }

            
            try {
                const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(authData),
                });
                const result = await response.json();

                if (result.status === 'ok') {
                    //everything is a okay
                    console.log('Got the token: ', result.data);
                    localStorage.setItem('token', result.data);
                    const decodedToken = JSON.parse(atob(result.data.split('.')[1]));
                    console.log('signed in as: '+ decodedToken.username);
                    window.location.href = '/';
                } else {
                    console.log(result.error);
                    alert(result.error);
                }
            } catch (error) {
                console.error(error);
                alert('An error ocurred while logging in.');
            }
        }

    // enterPassword(enteredPassword) {

    // }

    if (props.isShowingLoginPopup) {
        return (
                <div className='container-login'>
                    <div className="container-for-login">
                        <h1>Login</h1>
                        <form id="login" onSubmit={login}>
                            <div className="text-field">
                                <input 
                                    autoComplete="off"
                                    className="text-field-input"
                                    id="usernameOrEmail" 
                                    required=""
                                    onChange={e => {
                                        setUsernameOrEmail(e.target.value);
                                    }}
                                    />
                                <span className="text-field-span"></span>
                                <label className="text-field-label">Username or Email</label>
                            </div>
                            <div className="text-field">
                                <input 
                                    autoComplete="off"
                                    className="text-field-input"
                                    type="password" 
                                    id="password" 
                                    required=""
                                    onChange={e => {
                                        setPassword(e.target.value);
                                    }}
                                    />
                                <span className="text-field-span" ></span>
                                <label className="text-field-label">Password</label>
                            </div>
                    
                            {/* <!-- <div class="pass">Forgot Password?</div> --> */}
                            <input 
                                type="submit" 
                                value="Login" 
                                id='login-submission'
                                class="login-submit-button"
                            />
                            {/* <!-- <div class="signup_link">
                            Don't have an account? <a href="signup.html">Sign-up</a>
                            </div> --> */} 
                            <div className="signup_link">
                                Do you own a club and can't log into your account? Contact us - techsupport@communityali.org
                            </div>
                        </form>
                    </div>
                </div>
        )
    }

    return null;
}

export default LoginPopup;