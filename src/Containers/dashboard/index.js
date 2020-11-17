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
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';


const { Header, Content, Footer } = Layout;



function Dashboard(props) {

const closeSession = (values) => {
    console.log('Success:', values);
    props.authActions.signOut(values, props.history);
};


return (
    <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link to={'/dashboard/kitchen'}>Кухня</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    <Link to={'/dashboard/restaurant'}>Ресторан</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    Заказы
                </Menu.Item>
                <Menu.Item key="4" onClick={() => closeSession()} icon={<CloseCircleOutlined />}>
                    Выйти из кабинета
                </Menu.Item>
            </Menu>
        </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, minHeight: "100vh" }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>

            <Route exact path={"/dashboard/kitchen"} component={Kitchen}/>
            <Route exact path={'/dashboard/restaurant'} component={Restaurant}/>
            <Route exact path={`/dashboard/restaurants/:id`} component={ShowRestaurant}/>
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
