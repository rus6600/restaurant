import React, {useState} from "react";
import {Container, Row, Col, ListGroup} from "react-bootstrap";
import "../../Assets/css/custom.css"
import "../../Assets/css/bootstrap.min.css"
import "../../Assets/css/style.css"
import Lunch from "./lunch";
import Dinner from "./dinner";
import Drinks from "./drinks";




function SpecialMenu() {

    const [visibleDinner, setVisibleDinner] = useState(true)
    const [visibleLunch, setVisibleLunch] = useState(true)
    const [visibleDrinks, setVisibleDrinks] = useState(true)


    const DinnerClicked = () => {
        setVisibleDinner(true)
        setVisibleLunch(false)
        setVisibleDrinks(false)
    }

    const LunchClicked = () => {
        setVisibleLunch(true)
        setVisibleDinner(false)
        setVisibleDrinks(false)
    }

    const DrinksClicked = () => {
        setVisibleDrinks(true)
        setVisibleLunch(false)
        setVisibleDinner(false)
    }

    const AllClicked = () => {
        setVisibleDinner(true)
        setVisibleDrinks(true)
        setVisibleLunch(true)
    }



    return (
        <Container fluid="true" style={{marginTop: "100px"}}>
            <Row>
                <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                    <div class="list-group" defaultActiveKey="#link1" >
                        <div  class="list-group-item"  onClick={() => AllClicked()}>
                            Показать все
                        </div>
                        <div  class="list-group-item"  onClick={() => LunchClicked()} >
                            Ланч
                        </div>
                        <div  class="list-group-item"  onClick={() => DinnerClicked()}>
                            Ужин
                        </div>
                        <div  class="list-group-item"  onClick={() => DrinksClicked()}>
                            Напитки
                        </div>
                    </div>
                </div>

                <Col lg={6} md={6} sm={12}>

                        <div style={{display: visibleLunch ? "" : "none"}}><Lunch /></div>
                        <div style={{display: visibleDinner ? "" : "none"}}><Dinner/></div>
                        <div style={{display: visibleDrinks ? "" : "none"}}><Drinks/></div>

                </Col>
            </Row>

        </Container>
    )
}

export default SpecialMenu



