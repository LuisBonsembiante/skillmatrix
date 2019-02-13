import React, {Component, useState} from 'react';
import {Input, Menu, Segment, Card} from 'semantic-ui-react';
import {Link} from '../../routes';

class MainDash extends Component {

    state = {
        activeItem: ''

    }

     handleItemClick(e, {name}) {
         this.setState({activeItem: name})
     }


    renderCards() {


        const items = [
            {
                header: 'Angular Js',
                meta: 'Addres of Manager',
                description: 'The manager created this campaign and can create request to withdraw money',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: 'React Js',
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei',
                style: {overflowWrap: 'break-word'}
            }

        ];


        return <Card.Group items={items}/>
    }

    render() {




        return (
            <div>
                <Menu attached='top' tabular>
                    <Menu.Item name='JavaScript' active={this.state.activeItem === 'JavaScript'} onClick={this.handleItemClick}/>
                    <Menu.Item
                        name='Java'
                        active={this.state.activeItem === 'Java'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input
                                transparent
                                icon={{name: 'search', link: true}}
                                placeholder='Search users...'
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Segment attached='bottom'>
                    {this.renderCards()}
                </Segment>
            </div>
        );
    }

}

export default MainDash;


