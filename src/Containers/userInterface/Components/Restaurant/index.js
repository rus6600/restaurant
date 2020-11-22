import React, {useEffect, useState} from "react";
import {Route, Link} from "react-router-dom"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux";
import * as kitchenActions from "../../../../actions/kitchenActions";
import {connect} from "react-redux";
import * as restaurantActions from "../../../../actions/restaurantActions"
import Card from 'react-bootstrap/Card'
import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.min.css';


function UserRestaurant(props) {



useEffect( () => {
    async function fetchData() {
        await props.restaurantActions.getRestaurants();
    }
    fetchData();
}, [props.restaurantActions])




const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
};


const data = props.restaurant?.restaurants?.map((item, i) => {
        return (
            <div key={i} >
                <Card>
                    <Card.Img variant="top" src={`http://localhost:5000/${item.image}`} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Title>{item.location}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
        )
    }
)

console.log(Date(Date.UTC()))


return (
    <div >
        <Slider {...settings}>
            {data}
        </Slider>


    </div>
)
}

const mapStateToProps = state => ({
    error: state.restaurant.error,
    isLoading: state.kitchen.isLoading,
    kitchens: state.kitchen.kitchens,
    restaurant: state.restaurant.restaurant,
})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchenActions: bindActionCreators(kitchenActions, dispatch)

})


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(UserRestaurant));