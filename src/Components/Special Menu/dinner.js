import React from "react";
import img1 from "./images/img-07.jpg"
import img2 from "./images/img-08.jpg"
import img3 from "./images/img-09.jpg"
import {Card, CardDeck} from "react-bootstrap";



function Dinner() {

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

export default Dinner