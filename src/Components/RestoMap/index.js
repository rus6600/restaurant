import React, {useEffect, useState} from "react";
import {Route, Link} from "react-router-dom"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux";
import * as restaurantActions from "../../actions/restaurantActions";
import * as mapActions from "../../actions/mapActions";
import {connect} from "react-redux";
import {YMaps, Map, SearchControl, ZoomControl, Placemark, withYMaps} from 'react-yandex-maps';
import {Button, Modal, Form, FormGroup, InputGroup, FormControl} from "react-bootstrap";
import nigga from "../img/settings.png"
function SimpleMap(props) {

    const mapData = {
        center: [43.21612614842334, 76.9646392934813],
        zoom: 9,
        type: 'yandex#hybrid',
        nativeFullscreen: true
}



    const [show, setShow] = useState(false);
    const [address, setAddress] = useState([])
    const [newAddress, setNewAddress] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formHandler = (e) => {
        setAddress(e.target.value)
        console.log(address)
    }


    const [coordinates, setCoordinates] = useState([[43.21612614842334, 76.9646392934813]])

    const [lol, setLol] = useState([43.231442, 76.899795])


    const addNewLocation = () => {
        setShow(false)
        props.mapActions.getCoordinates(address);

    };

    // const nigger = () => console.log(props.coordinates)

    const inputHandler = (e) => {
        setAddress(e.target.value)
    }


    // const handleAdd = () => {
    //     const newCoordinates = coordinates.slice();
    //     newCoordinates.push(props.coordinates);
    //     setCoordinates(newCoordinates);
    // }

    const handleAdd = (todo) => {
        setCoordinates([...coordinates, props.coordinates]);
    }

    console.log(props.coordinates)

    useEffect( () => {
        async function fetchData() {
            await handleAdd()
            console.log(coordinates);
        }
        fetchData();

    }, [props.coordinates])


    useEffect( () => {
        async function fetchData() {
            await props.restaurantActions.getRestaurants();
        }
        fetchData();

    }, [props.restaurantActions])



    return (
    <div>
    <div>
    <YMaps>
        <Map
            defaultState={mapData}
            width={800}
            height={600}

        >
            {coordinates?.map(coordinate =>
                <Placemark
                    geometry={coordinate}
                    properties={{
                        hintContent: 'Собственный значок метки',
                        balloonContent: '<img src="http://img-fotki.yandex.ru/get/6114/82599242.2d6/0_88b97_ec425cf5_M" />',
                        balloonContentHeader: "nigger",
                        iconContent: "Azerbaijan",
                        hint: "islands#hint"

                    }}

                    options={{
                        preset: 'islands#circleDotIcon',
                        hint: "islands#hint",
                        hasBalloon: true,
                        balloonCloseButton: false,
                        hideIconOnBalloonOpen: false,
                        hasHint: true,
                        openBalloonOnClick: true,
                        openEmptyBalloon: true,
                        openHintOnHover: true,
                    }}

                    events={{click: console.log("nigger!!")}}

                />)}
        </Map>

    </YMaps>

    </div>
     <div>

         <Button variant="primary" onClick={handleShow}>
             Launch demo modal
         </Button>

         <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
                 <Modal.Title>Modal heading</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <InputGroup className="mb-3">
                     <InputGroup.Prepend>
                         <InputGroup.Text id="basic-addon1">Адрес</InputGroup.Text>
                     </InputGroup.Prepend>
                     <FormControl
                         name="name"
                         type="text"
                         required="true"
                         placeholder="введите новый адрес"
                         aria-label="name"
                         aria-describedby="basic-addon1"
                         onChange={inputHandler}
                     />
                 </InputGroup>
             </Modal.Body>
             <Modal.Footer>
                 <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
                 <Button variant="primary" onClick={() => addNewLocation()}>Save changes</Button>
             </Modal.Footer>
         </Modal>
     </div>
    </div>
    );

}

const mapStateToProps = state => ({
    error: state.map.error,
    isLoading: state.map.isLoading,
    restaurant: state.restaurant.restaurant,
    coordinates: state.map.coordinates,

})


const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    mapActions: bindActionCreators(mapActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SimpleMap));