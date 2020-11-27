import React from "react";
import {Card,Col,CardDeck} from "react-bootstrap";
import img1 from "./images/img-04.jpg"
import img2 from "./images/img-05.jpg"
import img3 from "./images/img-06.jpg"



function Lunch() {

    return (
        <div>
            <CardDeck>

            <Card >
                <Card.Img variant="top" src={img1} />
            </Card>


            <Card >
                <Card.Img variant="top" src={img2} />
            </Card>


            <Card >
                <Card.Img variant="top" src={img3} />
            </Card>
            </CardDeck>


        </div>
    )

}

export default Lunch