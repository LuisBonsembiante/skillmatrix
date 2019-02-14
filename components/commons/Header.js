import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../../routes';
import {connect} from "react-redux";
import {skillCreate} from "../../redux/actions";

const _header  =  (props) => {
    //state = {}


   // handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    const onClick = () => {
        // props.skillCreate( {name:'Java', description:'dfasdfasdf'} );
    }

    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link route="/index">
                <a className="item">Home</a>
            </Link>

            <Menu.Menu position="right">
                <Link route="/index">
                    <a className="item">Skill</a>
                </Link>
                <Link route="/skill/index">
                    <a className="item" onClick={onClick}>+</a>
                </Link>

            </Menu.Menu>
        </Menu>
    );
}


const  mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, {skillCreate})(_header);
