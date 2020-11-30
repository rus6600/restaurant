import {withRouter} from "react-router-dom"
import {Button, Card, Checkbox, Form, Input} from "antd";
import {Route, Link} from "react-router-dom"
import React from "react";
import '../../App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {bindActionCreators} from "redux";
import * as authActions from "../../actions/authActions";
import {connect} from "react-redux";
import Restaurant from "../restaurant";
import ShowRestaurant from "../restaurant/showRestaurant";
import Kitchen from "../kitchen";
import { LinkContainer } from 'react-router-bootstrap'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import Order from "../userInterface/Components/Order";


const { Header, Content, Footer } = Layout;



function Dashboard(props) {

const closeSession = (values) => {
    console.log('Success:', values);
    props.authActions.signOut(values, props.history);
};


return (
    <Layout >
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', borderRadius: "0px 0px 20px 20px" }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <LinkContainer to='/dashboard/restaurant'>
                        <Button type="primary">Рестораны</Button>
                    </LinkContainer>
                </Menu.Item>
                <Menu.Item key="2">
                    <LinkContainer to='/dashboard/kitchen'>
                        <Button type="primary">Кухни</Button>
                    </LinkContainer>
                </Menu.Item>
                <Menu.Item key="3">
                    <LinkContainer to='/dashboard/order'>
                        <Button type="primary">Заказы</Button>
                    </LinkContainer>
                </Menu.Item>
                <Menu.Item key="4">
                    <LinkContainer to='/'>
                        <Button type="primary">На главную</Button>
                    </LinkContainer>
                </Menu.Item>
                <Menu.Item key="5" onClick={() => closeSession()} icon={<CloseCircleOutlined />}>
                    <LinkContainer to='/'>
                        <Button type="primary">
                            Выйти из кабинета
                        </Button>
                    </LinkContainer>
                </Menu.Item>
            </Menu>
        </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, minHeight: "100vh" }}>

            <Route exact path={"/dashboard/order"} component={Order}/>
            <Route exact path={"/dashboard/kitchen"} component={Kitchen}/>
            <Route exact path={'/dashboard/restaurant'} component={Restaurant}/>

            </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
);
}
const mapStateToProps = state => ({
    error: state.auth.error,
    isLoading: state.auth.isLoading
})

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Dashboard));
