import React, {useState} from "react";
import {connect} from "react-redux";
import _ from 'lodash';
import {Icon, Label, Menu, Transition} from 'semantic-ui-react';


const _menuItems = (props) => {

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const {items} = props;

    const LENGTH_TO_SHOW = 7; // Cant of menu items to show
    const moveItems = (cant) => {
        if (items.length > LENGTH_TO_SHOW && (start + cant > 0)) {
            setEnd(end + cant);
            setStart(start + cant);
        }
    };

    // TODO Do better implementation of arrows - Fixed position
    return (
        <>
            <Menu.Item name='more' onClick={() => moveItems(-1)} disabled={items.length < LENGTH_TO_SHOW && start > 0}>
                {start > 0 && <Label color='teal'>{'+ ' + (start)}</Label>}
                <Icon name='arrow left'/>
            </Menu.Item>
            {_.slice(items, 0 + start, LENGTH_TO_SHOW + end).map((item, index) =>
                <Menu.Item
                    key={item + index}
                    name={item.name}
                    active={props.activeItem === item.name}
                    onClick={props.handleItemClick}/>
            )}
            <Menu.Item name='more' onClick={() => moveItems(1)} disabled={items.length < LENGTH_TO_SHOW}>
                <Icon name='arrow right'/>
                {((end + LENGTH_TO_SHOW) < items.length) &&
                <Label color='teal'>{'+ ' + (items.length - LENGTH_TO_SHOW - end)}</Label>
                }
            </Menu.Item>
        </>
    )
};


const mapStateToProps = state => {
    return {};
};


export default connect(mapStateToProps, {})(_menuItems);