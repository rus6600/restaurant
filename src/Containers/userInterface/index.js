import React, {useEffect, useState} from "react";
import {Layout, Menu, Breadcrumb, Card, Col, Button, Input, Row, Pagination} from 'antd';
import ModalResto from "../restaurant/modal";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom"
import * as restaurantActions from "../../actions/restaurantActions";
import * as kitchenActions from "../../actions/kitchenActions";
import {connect} from "react-redux";
import {Route, Link} from "react-router-dom"
import UserRestaurant from "./Components/Restaurant/index";
import {
    VideoCameraOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import * as authActions from "../../actions/authActions";
import Review from "./Components/Review/index";


function UserInterface(props) {


const closeSession = (values) => {
    console.log('Success:', values);
    props.authActions.signOut(values, props.history);
};


const { Header, Content, Footer } = Layout;

return  (

    <Layout className="layout" style={{minHeight: "100vh"}}>
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<VideoCameraOutlined />}>
                    <Link to={'/user/restaurants'}>Ресторан</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    <Link to={'/user/reviews'}>Отзывы</Link>
                </Menu.Item>
                <Menu.Item key="3" onClick={() => closeSession()} icon={<CloseCircleOutlined />}>
                    Выйти из кабинета
                </Menu.Item>
            </Menu>
        </Header>
        <Content style={{ padding: '0 50px'  }}>
            <div className="site-layout-content">
                <Route exact path={`/user/restaurants/`} component={UserRestaurant}/>
                <Route exact path={`/user/reviews/`} component={Review}/>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(UserInterface));


