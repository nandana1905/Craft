import React from 'react'
import './Footer.css'

export default function Footer() {
    return (
        <div className='footer-body'>
            <footer className="footer">
                <div className="container-footer">

                    <div className="row-footer">
                        <div className="footer-col">
                            <h4 className="footer-h4">company</h4>
                            <ul className="footer-ul">
                                <li className="footer-li">
                                    <a href="#" className="footer-a">
                                        contact us
                                    </a>
                                </li>
                                <li className="footer-li">
                                    <a href="#" className="footer-a">
                                        about us
                                    </a>
                                </li>
                                <li className="footer-li">
                                    <a href="#" className="footer-a">
                                        our services
                                    </a>
                                </li>
                                <li className="footer-li">
                                    <a href="#" className="footer-a">
                                        privacy policy
                                    </a>
                                </li>
                                <li className="footer-li">
                                    <a href="#" className="footer-a">
                                        affiliate program
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="footer-col">
                            <h4 className="footer-h4">get help</h4>
                            <ul className="footer-ul">
                                <li className="footer-li">
                                    <a href="#" className="footer-a">
                                        FAQ
                                    </a>
                                </li>
                                <li className="footer-li">
                                    <a href="#" className="footer-a">
                                        shipping
                                    </a>
                                </li>
                                <li className="footer-li">
                                    <a href="#" className="footer-a">
                                        returns
                                    </a>
                                </li>
                                <li className="footer-li">
                                    <a href="#" className="footer-a">
                                        order status
                                    </a>
                                </li>
                                <li className="footer-li">
                                    <a href="#" className="footer-a">
                                        payment options
                                    </a>
                                </li>
                            </ul>
                        </div>
    
                        <div className="footer-col">
                            <h4 className="footer-h4">follow us</h4>
                            <div className="social-links">
                                <a href="#" className="footer-a">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a href="#" className="footer-a">
                                    <i className="fab fa-twitter" />
                                </a>
                                <a href="#" className="footer-a">
                                    <i className="fab fa-instagram" />
                                </a>
                                <a href="#" className="footer-a">
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}
