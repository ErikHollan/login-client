import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import './ProfilePage.css'
import { getUserEmailFromToken } from '../Fetch/Fetch';

export const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState();

    const getEmail = async (token) => {
        const loginResponseObject = await getUserEmailFromToken(token);
        setUserDetails(loginResponseObject);
        console.log(loginResponseObject)
    }

    useEffect(() => {
        getEmail(Cookies.get("jwtToken"))
    }, []);

    return (
        <div className="container">
            <div className="user_info">
                <p>Welcome</p>
                {userDetails && (
                    <>
                        <p>{userDetails.firstName} {userDetails.lastName}</p>
                        <p>{userDetails.email}</p>
                    </>
                )}
            </div>
        </div>
    )
}