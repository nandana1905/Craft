import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './HeaderNav.css'
import Button from 'react-bootstrap/Button';

export default function HeaderNav() {

    const [role, setRole] = useState('')

    useEffect(() => {

        const userRole = localStorage.getItem('role')

        setRole(userRole)


    }, [])

    console.log('role==>', role);

    const navigate = useNavigate()

    const logout = () => {

        localStorage.clear()
        setRole('')
        navigate('/login');
    };

    return (
        <div>
            <div className="headernavbar">

                {role == 'User' ?

                    <ul>
                        <li>
                            <a href="">
                                <i class="fa-solid fa-magnifying-glass i"> </i>
                            </a>
                        </li>

                        <li>
                            <a href="/wishlist">
                                <i className="fa-solid fa-heart i " style={{ color: "#e40712" }} />
                            </a>
                        </li>
                        <li>
                            <a href="/shoppingcart">
                                <i className="fa-solid fa-cart-shopping i " style={{ color: "#FFD43B" }} />
                            </a>
                        </li>

                        <li>
                            <Button variant="danger" className='logout-button' onClick={logout}>
                                <i class="fa-solid fa-right-from-bracket"></i>
                            </Button>
                        </li>

                    </ul>

                    :

                    role == 'Admin' ?


                        <ul>
                            <li>
                                <a href="">
                                    <i class="fa-solid fa-magnifying-glass i"> </i>
                                </a>
                            </li>

                            <li>
                                <Button variant="danger" className='logout-button' onClick={logout}>
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                </Button>
                            </li>

                        </ul>

                        :

                        <ul>
                            <li>
                                <a href="">
                                    <i class="fa-solid fa-magnifying-glass i"> </i>
                                </a>
                            </li>
                            <li>

                                <a href="/login">
                                    <i class="fa-regular fa-user i"> </i>
                                </a>
                            </li>

                        </ul>

                }

            </div>

        </div>
    )
}

