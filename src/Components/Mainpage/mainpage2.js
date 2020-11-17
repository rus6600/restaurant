import React, {useState} from "react";
import {Layout, Button, Modal, Form, Input, Checkbox} from 'antd';
import Slider from "../slider/Slider";
import images from "../slider/images";
import SignUp from "../../Containers/signup";
import "../Mainpage/style.css"


function Mainpage2() {

const { Header, Footer, Sider, Content, Link } = Layout;
const [visible, setVisible] = useState(false)



 function Check(props) {
    return (
        <form>
            <modal className={props.visible? 'modal' : "modal-hide"}>
                <input type="text"/>
            </modal>
        </form>
    )
 }



    return (


          <div>

                      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', borderRadius: " 0 0 100px 100px" }}>
                          <Button onClick={() => setVisible(!visible)} type="primary" style={{margin: "auto", position: "relative"}}>Type</Button>
                          <form className={visible ? "inputForm" : "inputForm-hide"}>
                              <input className="input"  />
                              <button onClick={() => setVisible(false)}/>
                              <input  style={{maxHeight: "50%", borderRadius: "10px 10px 10px 10px"}}/>
                          </form>



                      </Header>

                  <div>
                      {/*<Slider images={images} />*/}
                      <Slider images={images}/>

                  </div>
                  <div>
                      <SignUp visible={visible}/>
                  </div>
                  <div>

                    <Check visible={visible}/>


                  </div>




          </div>

    )
}

export default Mainpage2