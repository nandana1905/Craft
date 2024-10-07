import React from 'react'
import HeaderNav from '../components/HeaderNav'
import Nav from '../components/Nav'
import ImageSlider from '../components/ImageSlider'
import HomeContent from '../components/HomeContent'
import Footer from '../components/Footer'



export default function Homepage() {
    return (
        <div>
            <>
                <div>
                    <HeaderNav />
                </div>
                <div>
                    <Nav />
                </div>
                <div>
                    <ImageSlider />
                </div>
                <div>
                    <HomeContent />
                </div>
                <div>
                    <Footer/>
                </div>
            </>



        </div>
    )
}
