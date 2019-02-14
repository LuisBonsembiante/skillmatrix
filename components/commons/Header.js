import React from 'react';
import {Button, Menu} from 'semantic-ui-react';
import {Link, Router} from '../../routes';
import {connect} from "react-redux";
import {withRouter} from "next/router";
import {skillCreate} from "../../redux/actions";

const _header = (props) => {
    //state = {}

    const ROUTES = {
        home: '/index',
        skills: '/skills'
    };


    const handleItemClick = (e, {name}) => Router.pushRoute(ROUTES[name.toLowerCase()]);


    return (
        <Menu style={{marginTop: '10px'}} size='small'>
            <Menu.Item active={ROUTES.home === props.router.asPath}
                       onClick={handleItemClick} name='Home' />

            <Menu.Menu position="right">
                <Menu.Item active={ROUTES.skills === props.router.asPath}
                           onClick={handleItemClick} name='Skills' />

                <Link route="/skill/index">
                    <a className="item" onClick={onClick}>+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}


const mapStateToProps = (state) => {
    return {...state.router}
}

export default withRouter(connect(mapStateToProps, {skillCreate})(_header));
