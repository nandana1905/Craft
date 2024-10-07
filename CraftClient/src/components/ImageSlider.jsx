import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ImageSlider.css'

export default function ImageSlider() {

    const navigate = useNavigate()

    const category = (categoryname) => {
        console.log('category===>', categoryname);

        const userRole = localStorage.getItem('role')

        if (userRole == null) {
            return navigate(`/login`)
        } else {
            return navigate(`/categoryview/${categoryname}`)
        }



    }

    useEffect(() => {
        let next = document.querySelector('.next-button-slide')
        let prev = document.querySelector('.prev-button-slide')

        next.addEventListener('click', function () {
            let items = document.querySelectorAll('.slide-item')
            document.querySelector('.slide').appendChild(items[0])
        })

        prev.addEventListener('click', function () {
            let items = document.querySelectorAll('.slide-item')
            document.querySelector('.slide').prepend(items[items.length - 1])
        })
    }, [])



    return (
        <div className='slideritem'>
            <div className="slider-contanier">
                <div className="slide">
                    <div className="slide-item slide-img1">
                        <div className="slide-content">
                            <div className='slide-heading'>Pottery ArtWork</div>
                            <div className="slide-name">Hands of Creation</div>
                            <div className="slide-description">
                                In every piece of pottery, there's a fingerprint of the artist, a mark
                                of their creativity and soul
                            </div>
                            <button onClick={() => { category('Pottery_ArtWork') }} className="slide-button">See More</button>
                        </div>
                    </div>
                    <div
                        className="slide-item slide-img2"
                    // style={{ backgroundImage: 'url("/Public/img/craft1.jpg")' }}
                    >
                        <div className="slide-content">
                            <div className='slide-heading'>ArtWork</div>
                            <div className="slide-name">Starlight Serenade</div>
                            <div className="slide-description">
                                Art is the magic mirror you make to reflect your invisible dreams in visible pictures
                            </div>
                            <button onClick={() => { category('ArtWork') }} className="slide-button">See More</button>
                        </div>
                    </div>
                    <div
                        className="slide-item slide-img3"
                    // style={{ backgroundImage: 'url("/Public/img/slides1.jpg")' }}
                    >
                        <div className="slide-content">
                            <div className='slide-heading'>Glass ArtWork</div>
                            <div className="slide-name">Twilight Refractions</div>
                            <div className="slide-description">
                                Each piece of glass is a delicate dance of light and shadow
                            </div>
                            <button onClick={() => { category('Glass_ArtWork') }} className="slide-button">See More</button>
                        </div>
                    </div>
                    <div
                        className="slide-item slide-img4"
                    // style={{ backgroundImage: 'url("/Public/img/craft1.jpg")' }}
                    >
                        <div className="slide-content">
                            <div className='slide-heading'>Embroidery ArtWork</div>
                            <div className="slide-name">Thread Haven</div>
                            <div className="slide-description">
                                Threading dreams through the eye of a needle
                            </div>
                            <button onClick={() => { category('Embroidery_ArtWork') }} className="slide-button">See More</button>
                        </div>
                    </div>
                    <div
                        className="slide-item slide-img5"
                    // style={{ backgroundImage: 'url("/Public/img/slides1.jpg")' }}
                    >
                        <div className="slide-content">
                            <div className='slide-heading'>Woodworking</div>
                            <div className="slide-name">WoodWander</div>
                            <div className="slide-description">
                                In the hands of a craftsman, even the simplest wood becomes a masterpiece
                            </div>
                            <button onClick={() => { category('Woodworking') }} className="slide-button">See More</button>
                        </div>
                    </div>
                </div>
                <div className="prev-next-button">
                    <button className="prev-button-slide">
                        <i className="fa-solid fa-arrow-left" />
                    </button>
                    <button className="next-button-slide">
                        <i className="fa-solid fa-arrow-right" />
                    </button>
                </div>
            </div>
        </div>


    )
}
