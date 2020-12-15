import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import nigga from "../../img/settings.png"
import {LinkContainer} from "react-router-bootstrap";
import {bindActionCreators} from "redux";
import * as restaurantActions from "../../../actions/restaurantActions";
import * as kitchenActions from "../../../actions/kitchenActions";
import * as mapActions from "../../../actions/mapActions";
import {connect} from "react-redux";
import logo from "../../../Components/img/png-clipart-restaurant-computer-icons-food-menu-menu-text-eating.png"

function SecondMap(props) {

    const [viewport, setViewport] = useState({
        latitude: 43.21612614842334,
        longitude: 76.9646392934813,
        width: "80vh",
        height: "80vh",
        zoom: 10
    });
    const [selectedPark, setSelectedPark] = useState(null);

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedPark(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    useEffect( () => {
        async function fetchData() {
            await props.restaurantActions.getRestaurants();
        }
        fetchData();
    }, [props.restaurantActions])


    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/rus6600/cki3d2ncu5a8719lilpg621ut"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >
                {props.restaurant?.restaurants?.map(item => (
                    <Marker
                        key={item.name}
                        latitude= {item.coordinates.split(",").map(parseFloat)[1]}
                        longitude={item.coordinates.split(",").map(parseFloat)[0]}
                    >
                        <LinkContainer to={`/restaurants/${item.id}`}>
                        <button
                            className="marker-btn"
                            onMouseEnter={e => {
                                e.preventDefault();
                                setSelectedPark(item);
                            }}
                            onMouseLeave={e => {
                                e.preventDefault();
                                setSelectedPark(null);
                            }}
                        >
                            <img src={logo} alt={item.name} />
                        </button>
                    </LinkContainer>
                    </Marker>
                ))}

                {selectedPark ? (
                    <Popup
                        latitude= {selectedPark.coordinates.split(",").map(parseFloat)[1]}
                        longitude={selectedPark.coordinates.split(",").map(parseFloat)[0]}
                        onClose={() => {
                            setSelectedPark(null);
                        }}
                    >
                        <div>
                            <h2>{selectedPark.name}</h2>
                            <p>{selectedPark.location}</p>
                            <img src={`http://localhost:5000/${selectedPark.image}`} style={{maxHeight: "50vh", maxWidth: "50vh"}}/>
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </div>
    );
}


const mapStateToProps = state => ({
    error: state.restaurant.error,
    isLoading: state.kitchen.isLoading,
    kitchens: state.kitchen.kitchens,
    restaurant: state.restaurant.restaurant,
    coordinates: state.map.coordinates,

})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchenActions: bindActionCreators(kitchenActions, dispatch),
    mapActions: bindActionCreators(mapActions, dispatch)


})

export default connect(mapStateToProps, mapDispatchToProps) (SecondMap);
