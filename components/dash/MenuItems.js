import React from "react";
import {connect} from "react-redux";
import {Menu} from 'semantic-ui-react';


const _menuItems = (props) => {

    const items = [
        {name: 'JavaScript'},
        {name: 'Java'}
    ]; // TODO get this from Redux


    return (
        <>
            {props.items.map((item, index) =>
                <Menu.Item
                    key={item + index}
                    name={item.name}
                    active={props.activeItem === item.name}
                    onClick={props.handleItemClick}/>
            )}
        </>
    )
};


const mapStateToProps = state => {
    return {};
};


export default connect(mapStateToProps, {})(_menuItems);