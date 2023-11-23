import React, { useState } from 'react'
import './LoginSignup.css'
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginRequest, registrationRequest } from '../Fetch/Fetch';
import { useNavigate } from "react-router-dom"
import { ProfilePage } from '../ProfilePage/ProfilePage';

export const LoginSignup = () => {
    const navigate = useNavigate()
    const [action, setAction] = useState("Login")
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [signupResponseMessage, setSignupResponseMessage] = useState("");
    const [loginResponseMessage, setLoginResponseMessage] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleLogin = async (email, password) => {
        setSignupResponseMessage("")
        setSignupSuccess(false);
        setLoginSuccess(false);

        const loginResponseObject = await loginRequest(email, password);
        if (loginResponseObject.status === 200) {
            console.log("TRYING TO NAVIGATE")
            setLoginSuccess(true)
            navigate('/profile')
        } else {
            setLoginSuccess(false)
        }
        setLoginResponseMessage(loginResponseObject.message)
    }

    const handleSignup = async (firstName, lastName, password, email) => {
        setLoginResponseMessage("")


        const signupResponseObject = await registrationRequest(firstName, lastName, password, email);
        setSignupResponseMessage(signupResponseObject.message);
        if (signupResponseObject.status === 200) {
            setSignupSuccess(true)
            await new Promise(r => setTimeout(r, 2000));
            setAction("Login")
        } else {
            setSignupSuccess(false)
        }
    }

    const handleResetStates = () => {
        setLoginSuccess(false);
        setSignupSuccess(false);
        setLoginResponseMessage("");
        setSignupResponseMessage("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");

    }


    return (
        <div className="container">
            <div className="header">
                <div className="text">
                    {action}
                </div>
                <div className="underline"></div>
                <div className={loginSuccess || signupSuccess ? "response-message-success" : "response-message-error"}>
                    {action === "Login" ? loginResponseMessage : signupResponseMessage}
                </div>
            </div>
            <div className="inputs">
                {action === "Sign up" &&
                    <div className="inputs-top">
                        <div className="input">
                            <PersonIcon className="login-icon"></PersonIcon>
                            <input type="text" placeholder='First name' value={firstName} onChange={e => setFirstName(e.target.value)}></input>
                        </div>
                        <div className="input">
                            <PersonIcon className="login-icon"></PersonIcon>
                            <input type="text" placeholder='Last name' value={lastName} onChange={e => setLastName(e.target.value)}></input>
                        </div>
                    </div>
                }
                <div className="input">
                    <EmailIcon className="login-icon"></EmailIcon>
                    <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className="input">
                    <HttpsIcon className="login-icon"></HttpsIcon>
                    <input type={passwordVisible ? "text" : "password"} placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}></input>
                    {
                        passwordVisible ?
                            <VisibilityIcon className="visibility-icon" onClick={() => passwordVisible ? setPasswordVisible(false) : setPasswordVisible(true)}></VisibilityIcon>
                            :
                            <VisibilityOffIcon className="visibility-icon" onClick={() => passwordVisible ? setPasswordVisible(false) : setPasswordVisible(true)}></VisibilityOffIcon>
                    }
                </div>
            </div>
            {action === "Login" &&
                <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
            <div className="submit-container">
                <div
                    className={action === "Sign up" ? "submit gray" : "submit"}
                    onClick={() => action === "Sign up" ? [setAction("Login"), handleResetStates()] : handleLogin(email, password)}>
                    Login
                </div>
                <div
                    className={action === "Login" ? "submit gray" : "submit"}
                    onClick={() => action === "Login" ? [setAction("Sign up"), handleResetStates()] : handleSignup(firstName, lastName, password, email)}>
                    Sign up
                </div>
            </div>

        </div>
    )
}
