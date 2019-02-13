import React, {useState} from "react";
import {connect} from "react-redux";
import _ from 'lodash';
import {Icon, Label, Menu} from 'semantic-ui-react';


const _menuItems = (props) => {

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const items = [
        {name: 'JavaScript'},
        {name: 'Java'},
        {name: 'JavaScript 2'},
        {name: 'Java 2'},
        {name: 'JavaScript 3'},
        {name: 'Java 3'},
        {name: 'JavaScript 4'},
        {name: 'Java 4'},
        {name: 'JavaScript 5'},
        {name: 'Java 5'},
        {name: 'JavaScript 6'},
        {name: 'Java 6'},
        {name: 'JavaScript 7'},
        {name: 'Java 7'}
    ]; // TODO get this from Redux

    const LENGTH_TO_SHOW = 7; // Cant of menu items to show
    const moveItems = (cant) => {
        setEnd(end + cant);
        setStart(start + cant);
    };

    // TODO Do better implementation of arrows - Fixed position
    return (
        <>
            {(start > 0) && (
                <Menu.Item name='more' onClick={() => moveItems(-1)}>
                    <Label color='teal'>{'+ ' + (start)}</Label>
                    <Icon name='arrow left'/>
                </Menu.Item>
            )}
            {_.slice(props.items, 0 + start, LENGTH_TO_SHOW + end).map((item, index) =>
                <Menu.Item
                    key={item + index}
                    name={item.name}
                    active={props.activeItem === item.name}
                    onClick={props.handleItemClick}/>
            )}
            {((end + LENGTH_TO_SHOW) !== items.length) && (
                <Menu.Item name='more' onClick={() => moveItems(1)}>
                    <Icon name='arrow right'/>
                    <Label color='teal'>{'+ ' + (items.length - LENGTH_TO_SHOW - end)}</Label>
                </Menu.Item>
            )}
        </>
    )
};


const mapStateToProps = state => {
    return {};
};


export default connect(mapStateToProps, {})(_menuItems);