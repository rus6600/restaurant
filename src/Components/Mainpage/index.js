import React, {useState, useEffect} from "react";
import {Route, Link} from "react-router-dom"
import {Carousel, Nav, FormControl, Form, Button} from 'react-bootstrap'
import {withRouter} from "react-router-dom"
import { LinkContainer } from 'react-router-bootstrap'
import {bindActionCreators} from "redux";
import * as kitchenActions from "../../actions/kitchenActions";
import {connect} from "react-redux";
import * as restaurantActions from "../../actions/restaurantActions"
import * as mapActions from "../../actions/mapActions"
import * as orderActions from "../../actions/orderActions"
import "../../Assets/css/animate.css"
import '../../Assets/css/style.css'
import '../../Assets/css/bootstrap.min.css'
import '../../Assets/css/baguetteBox.min.css'
import '../../Assets/css/classic.css'
import '../../Assets/css/custom.css'
import '../../Assets/css/responsive.css'
import '../../Assets/css/classic.time.css'
import '../../Assets/css/font-awesome.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from '../../Assets/images/DECODE-RGB.png'; // with import
import slider01 from "../../Assets/images/slider-01.jpg"
import slider02 from "../../Assets/images/slider-02.jpg"
import slider03 from "../../Assets/images/slider-03.jpg"
import gallery_img_01 from "../../Assets/images/gallery-img-01.jpg"
import gallery_img_02 from "../../Assets/images/gallery-img-02.jpg"
import gallery_img_03 from "../../Assets/images/gallery-img-03.jpg"
import gallery_img_04 from "../../Assets/images/gallery-img-04.jpg"
import gallery_img_05 from "../../Assets/images/gallery-img-05.jpg"
import gallery_img_06 from "../../Assets/images/gallery-img-06.jpg"
import about_image from "../../Assets/images/about-img.jpg"
import SignUp from "../../Containers/signup/index"
import UserRestaurant from "../../Containers/userInterface/Components/Restaurant/index"
import ModalCheck from "../Mainpage/modal"
import ModalSignIn from "./modalSignIn";
import * as authActions from "../../actions/authActions";
import Review from "../../Containers/userInterface/Components/Review";
import Order from "../../Containers/userInterface/Components/Order/"
import Kitchen from "../../Containers/kitchen";
import Dashboard from "../../Containers/dashboard";
import ShowRestaurant from "../../Containers/restaurant/showRestaurant";
import SpecialMenu from "../Special Menu";
import SecondMap from "../RestoMap/MapGl/index"
import Cabinet from "../../Containers/userInterface/Components/Cabinet";
import ListRestaurants from "../../Containers/restaurants/index"


function Mainpage(props) {

const [visible,setVisible] = useState(false)
const [showSignUp, setShowSignUp] = useState(false);
const [showSignIn, setShowSignIn] = useState(false);
const [visibleDropDown, setVisibleDropDown]= useState(false)

const handleSignUp = () => setShowSignUp(!showSignUp);
const handleSignIn = () => setShowSignIn(!showSignIn);



return (


    <div>
        <Route exact path={`/restaurants/:id`} component={ShowRestaurant}/>
        <Route exact path={"/dashboard/"} component={Dashboard}/>
        <Route exact path={"/cabinet/"} component={Cabinet}/>
        <Route exact path={"/restaurants/"} component={ListRestaurants}/>
        <ModalCheck showSignUp={showSignUp} handleSignUp={handleSignUp} handleSignIn={handleSignIn} setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp}/>
        <ModalSignIn showSignIn={showSignIn} handleSignIn={handleSignIn}/>

        <div>

            <header className="top-navbar">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="index.html">
                            <img  src={logo} alt="" />
                        </a>

                        <div className="collapse navbar-collapse" id="navbars-rs-food">

                            <ul className="navbar-nav ml-auto">
                                <LinkContainer to="/">
                                    <li className="nav-item active"><a className="nav-link" href="index.html">Главная</a></li>
                                </LinkContainer>

                                <LinkContainer to="/restaurants">
                                    <li className="nav-item active"><a className="nav-link" href="index.html">Рестораны</a></li>
                                </LinkContainer>

                                <LinkContainer to="/cabinet">

                                    <li className={ props.role  === "user" ? "nav-item active" : "hide"}><a className={ props.role === "user" ? "nav-link" : "hide"} >Кабинет</a></li>

                                </LinkContainer>


                                <LinkContainer  to="/dashboard/restaurant">
                                    <li className={ props.role  === "admin" ? "nav-item active" : "hide"}><a className={ props.role === "admin" ? "nav-link" : "hide"} >Админ</a></li>
                                </LinkContainer>
                                { props.isAuth ?
                                    <li className="nav-item"><a className="nav-link" onClick={() => props.authActions.signOut()}>Выйти</a></li>
                                    :
                                    <li className="nav-item"><a className="nav-link" onClick={() => handleSignUp()}>Войти</a></li>
                                }
                                <li>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>


            <Carousel>
                <Carousel.Item style={{maxHeight: "100vh"}}>
                    <img
                        className="d-block w-100 h-100"
                        src={slider01}
                        text="First slide"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{maxHeight: "100vh"}}>
                    <img
                        className="d-block w-100"
                        src={slider02}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{maxHeight: "100vh"}}>
                    <img
                        className="d-block w-100"
                        src={slider03}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="slider-box">
            <div className="container-fluid" >
                <div className="row " style={{maxHeight: "70%"}}>
                    <div className="col-lg-6 col-md-6 col-sm-12 text-center"   >

                                <UserRestaurant className="slider-component"/>

                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 text-center" >

                        <SecondMap className="slider-component"/>

                    </div>

                </div>


            </div>
            </div>


            <div className="about-section-box">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 text-center">
                    <div className="inner-column">
                        <h1>Welcome To <span>Live Dinner Restaurant</span></h1>
                        <h4>Little Story</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor suscipit feugiat. Ut at pellentesque ante, sed convallis arcu. Nullam facilisis, eros in eleifend luctus, odio ante sodales augue, eget lacinia lectus erat et sem. </p>
                        <p>Sed semper orci sit amet porta placerat. Etiam quis finibus eros. Sed aliquam metus lorem, a pellentesque tellus pretium a. Nulla placerat elit in justo vestibulum, et maximus sem pulvinar.</p>
                        <a className="btn btn-lg btn-circle btn-outline-new-white" href="#">Reservation</a>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <img src={about_image} alt="" className="img-fluid"/>
                </div>
            </div>
        </div>
    </div>



    <div className="qt-box qt-background">
        <div className="container">
            <div className="row">
                <div className="col-md-8 ml-auto mr-auto text-center">
                    <p className="lead ">
                        " If you're not the one cooking, stay out of the way and compliment the chef. "
                    </p>
                    <span className="lead">Michael Strahan</span>
                </div>
            </div>
        </div>
    </div>


            </div>
        <div>

            <SpecialMenu/>

    <div>


    <div className="gallery-box">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="heading-title text-center">
                        <h2>Gallery</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                    </div>
                </div>
            </div>
            <div className="tz-gallery">
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        <a className="lightbox">
                            <img className="img-fluid" src={gallery_img_01} alt="Gallery Images"/>
                        </a>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-4">
                        <a className="lightbox" >
                            <img className="img-fluid" src={gallery_img_02} alt="Gallery Images"/>
                        </a>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-4">
                        <a className="lightbox">
                            <img className="img-fluid" src={gallery_img_03} alt="Gallery Images"/>
                        </a>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        <a className="lightbox" >
                            <img className="img-fluid" src={gallery_img_04} alt="Gallery Images"/>
                        </a>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-4">
                        <a className="lightbox" >
                            <img className="img-fluid" src={gallery_img_05} alt="Gallery Images"/>
                        </a>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-4">
                        <a className="lightbox">
                            <img className="img-fluid" src={gallery_img_06} alt="Gallery Images"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="contact-info-box">
        <div className="container">
            <div className="row">
                <div className="col-md-4 arrow-right">
                    <i className="fa fa-volume-control-phone"></i>
                    <div className="overflow-hidden">
                        <h4>Phone</h4>
                        <p className="lead">
                            +01 123-456-4590
                        </p>
                    </div>
                </div>
                <div className="col-md-4 arrow-right">
                    <i className="fa fa-envelope"></i>
                    <div className="overflow-hidden">
                        <h4>Email</h4>
                        <p className="lead">
                            yourmail@gmail.com
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <i className="fa fa-map-marker"></i>
                    <div className="overflow-hidden">
                        <h4>Location</h4>
                        <p className="lead">
                            800, Lorem Street, US
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer className="footer-area bg-f">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6">
                    <h3>About Us</h3>
                    <p>Integer cursus scelerisque ipsum id efficitur. Donec a dui fringilla, gravida lorem ac, semper magna. Aenean rhoncus ac lectus a interdum. Vivamus semper posuere dui.</p>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h3>Subscribe</h3>
                    <div className="subscribe_form">
                        <form className="subscribe_form">
                            <input name="EMAIL" id="subs-email" className="form_input" placeholder="Email Address..." type="email"/>
                                <button type="submit" className="submit">SUBSCRIBE</button>
                                <div className="clearfix"></div>
                        </form>
                    </div>
                    <ul className="list-inline f-social">
                        <li className="list-inline-item"><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                        <li className="list-inline-item"><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h3>Contact information</h3>
                    <p className="lead">Ipsum Street, Lorem Tower, MO, Columbia, 508000</p>
                    <p className="lead"><a href="#">+01 2000 800 9999</a></p>
                    <p><a href="#"> info@admin.com</a></p>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h3>Opening hours</h3>
                    <p><span className="text-color">Monday: </span>Closed</p>
                    <p><span className="text-color">Tue-Wed :</span> 9:Am - 10PM</p>
                    <p><span className="text-color">Thu-Fri :</span> 9:Am - 10PM</p>
                    <p><span className="text-color">Sat-Sun :</span> 5:PM - 10PM</p>
                </div>
            </div>
        </div>

        <div className="copyright">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <p className="company-name">All Rights Reserved. &copy; 2018 <a href="#">Live Dinner Restaurant</a> Design By :
                            <a href="https://html.design/">html design</a></p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</div>
</div>
</div>

    )
}



const mapStateToProps = state => ({
    error: state.restaurant.error,
    isLoading: state.kitchen.isLoading,
    kitchens: state.kitchen.kitchens,
    restaurant: state.restaurant.restaurant,
    isAuth: state.auth.isAuth,
    role: state.auth.role

})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchenActions: bindActionCreators(kitchenActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch),
    mapActions: bindActionCreators(mapActions, dispatch)

})


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Mainpage));