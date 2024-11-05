import React, { useEffect } from 'react'
import './HomeContent.css'
import { useNavigate } from 'react-router-dom';
import AOS from 'aos'

export default function HomeContent() {

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

        AOS.init();

    }, [])

    return (
        <div>



            <div className='homecontent-body'>
                <div className="homecontent-contianer">
                    <h2 className='homecontent-h2'>Popular Categories</h2>
                    <div className="homecontent-block" >
                        <div className="homecontent-img" data-aos="flip-left">
                            <img src="/img/pottery1.jpg" alt="" />
                        </div>
                        <div className="homecontent-content" data-aos="fade-left">
                            <h5>pottery artwork</h5>
                            <p>
                                Pottery art is a craft which involves transforming raw clay into functional and decorative
                                objects through a series of skilled processes. The journey begins with clay selection, which
                                can range from earthenware to porcelain, each offering different textures and firing temperatures.

                            </p>
                            <button onClick={() => { category('Pottery_ArtWork') }} className="homecontent-button">See More</button>
                        </div>
                    </div>
                    <div className="homecontent-block">
                        <div className="homecontent-img" data-aos="flip-right">
                            <img src="/img/artwork1.jpg" alt="" className='artwork-img' />
                        </div>
                        <div className="homecontent-content" data-aos="fade-right">
                            <h5> artwork</h5>
                            <p>
                                A painting, sculpture, photograph or mixed media form the broad umbrella of artistry that
                                encompasses many forms of creativity. The visionaries behind each piece pour their emotions
                                into it together with the mastery they had over the technical aspects that are likely to pass
                                some interpretations or delve into certain themes at times.
                            </p>
                            <button onClick={() => { category('ArtWork') }} className="homecontent-button">See More</button>
                        </div>
                    </div>
                    <div className="homecontent-block">
                        <div className="homecontent-img" data-aos="flip-left">
                            <img src="/img/glassart1.jpg" alt="" />
                        </div>
                        <div className="homecontent-content" data-aos="fade-left">
                            <h5>glass artwork</h5>
                            <p>
                                Glass artwork can be both useful and ornamental ranging from beautiful dishware or flower
                                vases to magnificent chandeliers or talking sculptures which show how much one has understood
                                about this specific complex yet gorgeous art form.The use of light in glass art is key, as it
                                enhances the colors and details, making the pieces visually striking.
                            </p>
                            <button onClick={() => { category('Glass_ArtWork') }} className="homecontent-button">See More</button>
                        </div>
                    </div>
                    <div className="homecontent-block">
                        <div className="homecontent-img" data-aos="flip-right">
                            <img src="/img/embroideryart1.jpg" alt="" />
                        </div>
                        <div className="homecontent-content" data-aos="fade-right">
                            <h5>Embroidery artwork</h5>
                            <p>
                                Embroidery artwork involves creating intricate designs by stitching patterns onto
                                fabric using a needle and thread. Artists use various stitches like cross-stitch,
                                satin stitch, and French knots to add texture and detail to their work.The craft
                                requires patience and precision, resulting in beautiful, detailed designs that reflect
                                the artist's creativity and skill.
                            </p>
                            <button onClick={() => { category('Embroidery_ArtWork') }} className="homecontent-button">See More</button>
                        </div>
                    </div>
                    <div className="homecontent-block">
                        <div className="homecontent-img" data-aos="flip-left">
                            <img src="/img/woodart1.jpg" alt="" className='woodart-img' />
                        </div>
                        <div className="homecontent-content" data-aos="fade-left">
                            <h5>Woodworking</h5>
                            <p>
                                Woodworking is the craft of creating items from wood using tools like saws, chisels, and sanders.
                                Woodworkers often sand the wood to make it smooth and apply finishes like stains or varnishes to
                                protect and enhance its look. This craft requires both creativity and skill, allowing woodworkers to
                                create items that are both functional and beautiful.
                            </p>
                            <button onClick={() => { category('Woodworking') }} className="homecontent-button">See More</button>
                        </div>
                    </div>
                </div>

            </div>



        </div>
    )
}
