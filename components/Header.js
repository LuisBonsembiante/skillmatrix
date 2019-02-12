import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default (props) => {
    //state = {}


   // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link route="/index">
                <a className="item">Home</a>
            </Link>

            <Menu.Menu position="right">
                <Link route="/index">
                    <a className="item">Skill</a>
                </Link>

                <Link route="/index/new">
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}



