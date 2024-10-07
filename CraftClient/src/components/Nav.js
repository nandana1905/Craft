import React, { useEffect, useState } from 'react'
import './Nav.css'


export default function Nav() {

    const [role, setRole] = useState('')

    const userRole = localStorage.getItem('role')
    console.log(userRole);


    useEffect(() => {


        setRole(userRole)


    })

    console.log('role==>', role);


    return (
        <div>
            <div className="navbar">

                {/* USER VIEW NAVBAR */}

                {role == 'User' ?
                    <ul>
                        <li>
                            <a href="/">home</a>
                        </li>
                        <li>
                            <a href="/addproduct">add product</a>
                        </li>
                        <li>
                            <a href="/viewproduct">view products</a>
                        </li>
                        <li>
                            <a href="/ownproductview">My products</a>
                        </li>
                        <li>
                            <a href="">My Order</a>
                        </li>
                        <li>
                            <a href="/userprofile">profile</a>
                        </li>
                        <li>
                            <a href="">about us</a>
                        </li>
                    </ul>
                    :

                    //   ADMIN VIEW NAVBAR 

                    role == 'Admin' ?
                        <ul>
                            <li>
                                <a href="/">home</a>
                            </li>
                            <li>
                                <a href="/adminuserprofile">Users Profile</a>
                            </li>
                            <li>
                                <a href="/adminviewproduct">view product</a>
                            </li>

                        </ul>

                        :

                        <ul>
                            <li>
                                <a href="/">home</a>
                            </li>

                            <li>
                                <a href="">about us</a>
                            </li>
                        </ul>

                }

            </div>



        </div>
    )
}
