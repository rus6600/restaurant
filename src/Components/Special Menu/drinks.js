import React from "react";
import img1 from "./images/img-01.jpg"
import img2 from "./images/img-02.jpg"
import img3 from "./images/img-03.jpg"
import {Card, CardDeck} from "react-bootstrap";


function Drinks() {

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

export default Drinks