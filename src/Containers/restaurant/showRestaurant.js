import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {Route, Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authActions from "../../actions/authActions"
import * as restaurantActions from "../../actions/restaurantActions"
import logo from "../../Assets/images/DECODE-RGB.png";
import {LinkContainer} from "react-router-bootstrap";
import '../../Assets/css/style.css'
import * as kitchenActions from "../../actions/kitchenActions";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge"
import Slider from "react-slick";
import {PageHeader} from "antd";




function ShowRestaurant(props) {



    // useEffect( () => {
    //     async function fetchData() {
    //         await props.restaurantActions.getRestaurants();
    //     }
    //     fetchData();
    // }, [props.restaurantActions])

useEffect( () => {
    async function fetchData() {
        await props.restaurantActions.getRestaurantsById(props.match.params.id);
    }
    fetchData();
}, [props.restaurantActions])


const settings = {
    dots: false,
    infinite: true,
    speed: 1100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
};

const resto = props.restaurantId


    const data = props.restaurantId?.Reviews?.map((item, i) => {
            return (
                <div key={i} >
                    <Card >
                        <Card.Body>

                            <Card.Title>"{item.text}"</Card.Title>
                        </Card.Body>
                    </Card>
                </div>

            )
        }
    )





    return (
    <div>

        <header className="top-navbar">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="index.html">
                        <img  src={logo} alt="" />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars-rs-food" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbars-rs-food">
                        <ul className="navbar-nav ml-auto">

                            <LinkContainer to="/">
                                <li className="nav-item active"><a className="nav-link" href="index.html">Home</a></li>
                            </LinkContainer>

                            <li>


                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>


        <div className="container restopage">
            <h1 className="menu-section-title">Welcome to {resto.name}!</h1>

            <div className="container" style={{paddingTop: "15px"}}>
                <div className="row " >

                    <div className="col-lg-6 col-md-6 special-grid lunch" style={{borderRadius: "15px 15px 15px 15px"}}>
                        <Card >
                            <Card.Img variant="top" src={`http://localhost:5000/${resto.image}`} />
                        </Card>
                    </div>

                    <div className="col-lg-6 col-md-6 special-grid lunch">
                        <Card className="mb-3" style={{marginLeft: "50px", width: '30rem' }}>
                            <Card.Body>

                                <Card.Title>Адрес : {resto.location}</Card.Title>
                                <Card.Title>Телефон : {resto.phone}</Card.Title>
                                <Card.Title>Средний чек : {resto.averageBill}</Card.Title>
                                <Card.Title>Количество мест : {resto.amountOfPlace}</Card.Title>
                            </Card.Body>
                        </Card>
                        <Badge pill variant="primary">
                            Отзывы :
                        </Badge>{' '}
                        <Slider {...settings}>
                            {data}
                        </Slider>
                    </div>
                </div>



            </div>

            <h1 className="menu-section-title">Our Menu</h1>


            <div className="row">
            <div className="col-xs-12 col-sm-6">
                <div className="menu-section">
                    <h2 className="menu-section-title">Dinner</h2>
                    <div className="menu-item">
                        <div className="menu-item-name">Sesame-Ginger Beef</div>
                        <div className="menu-item-price"> $15</div>
                        <div className="menu-item-description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            duis sed dapibus leo nec ornare diam.
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-item-name">Crispy Fried Chicken</div>
                        <div className="menu-item-price"> $17</div>
                        <div className="menu-item-description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            duis sed dapibus leo nec ornare diam.
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-item-name">Mongolian Shrimp & Broccoli</div>
                        <div className="menu-item-price"> $18</div>
                        <div className="menu-item-description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            duis sed dapibus leo nec ornare diam..
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-item-name">Spicy Coconut Salmon</div>
                        <div className="menu-item-price"> $20</div>
                        <div className="menu-item-description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            duis sed dapibus leo nec ornare diam.
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-6">
                <div className="menu-section">
                    <h2 className="menu-section-title">Desserts</h2>
                    <div className="menu-item">
                        <div className="menu-item-name">Chocolate Mud Cake</div>
                        <div className="menu-item-price"> $11</div>
                        <div className="menu-item-description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            duis sed dapibus leo nec ornare diam.
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-item-name">Bourbon-Pecan Tart</div>
                        <div className="menu-item-price"> $14</div>
                        <div className="menu-item-description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            duis sed dapibus leo nec ornare diam.
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-item-name">Texas Sheet Cake</div>
                        <div className="menu-item-price"> $15</div>
                        <div className="menu-item-description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            duis sed dapibus leo nec ornare diam.
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-item-name">Vanilla Cheesecake</div>
                        <div className="menu-item-price"> $18</div>
                        <div className="menu-item-description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            duis sed dapibus leo nec ornare diam.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>


    </div>
)
}


const mapStateToProps = state => ({
    error: state.auth.error,
    isLoading: state.auth.isLoading,
    kitchens: state.kitchen.kitchens,
    restaurant: state.restaurant.restaurant,
    restaurantId: state.restaurant.restaurantId
})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchenActions: bindActionCreators(kitchenActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ShowRestaurant));




// import React from "react";
// import { Layout, Menu } from 'antd';
// import Kitchen from "../kitchen";
// import {
//     MenuUnfoldOutlined,
//     MenuFoldOutlined,
//     UserOutlined,
//     VideoCameraOutlined,
//     UploadOutlined,
//     CloseCircleOutlined
// } from '@ant-design/icons';
//
//  import * as authActions from "../../actions/authActions";

// import Restaurant from "../restaurant";
// import ShowRestaurant from "../restaurant/showRestaurant";
//
// const { Header, Sider, Content } = Layout;
//
//
//
//
//
// function Dashboard(props) {
//
//     const closeSession = (values) => {
//         console.log('Success:', values);
//         props.authActions.signOut(values, props.history);
//     };
//
//
//     return (
//         <Layout>
//             <Sider style={{ minHeight: '100vh' }} trigger={null} collapsible>
//                 <div className="logo" />
//                 <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//                     <Menu.Item key="1" icon={<UserOutlined />}>
//                         <Link to={'/dashboard/kitchen'}>Кухня</Link>
//                     </Menu.Item>
//                     <Menu.Item key="2" icon={<VideoCameraOutlined />}>
//                         <Link to={'/dashboard/restaurant'}>Ресторан</Link>
//                     </Menu.Item>
//                     <Menu.Item key="3" icon={<UploadOutlined />}>
//                         Заказы
//                     </Menu.Item>
//                     <Menu.Item key="4" onClick={() => closeSession()} icon={<CloseCircleOutlined />}>
//                         Выйти из кабинета
//                     </Menu.Item>
//                 </Menu>
//             </Sider>
//             <Layout className="site-layout">
//                 <Header className="site-layout-background" style={{ padding: 0 }}>
//                     {/*{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {*/}
//                     {/*    className: 'trigger',*/}
//                     {/*    onClick: this.toggle,*/}
//                     {/*})}*/}
//                 </Header>
//                 <Content
//                     className="site-layout-background"
//                     style={{
//                         margin: '24px 16px',
//                         padding: 24,
//                         minHeight: "100vh",
//                     }}
//                 >
//                     <Route exact path={"/dashboard/kitchen"} component={Kitchen}/>
//                     <Route exact path={'/dashboard/restaurant'} component={Restaurant}/>
//                     <Route exact path={`/dashboard/restaurants/:id`} component={ShowRestaurant}/>
//                 </Content>
//             </Layout>
//         </Layout>
//     );
// }
//
