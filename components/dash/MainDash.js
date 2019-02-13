import React, {Component} from 'react';
import {Menu, Segment, Card, Label, Search} from 'semantic-ui-react';
import {Link} from '../../routes';
import _ from 'lodash'
import Cards from "./Cards";
import MenuItems from "./MenuItems";

class MainDash extends Component {

    state = {
        activeItem: 'JavaScript', // TODO Set the first one for default
        isLoading: false,
        value: '' // Value of the search Field
    };

     handleItemClick = (e, {name}) => {
        this.setState({activeItem: name})
    };


    handleResultSelect = (e, { result }) => this.setState({ value: result.title });
    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });
    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.title);

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    };

    render() {
        const {isLoading, results, value, activeItem} = this.state;
        const resultRenderer = ({ title }) => <Label content={title} />;

        return (
            <div>
                <Menu attached='top' tabular>
                    <MenuItems activeItem={activeItem} handleItemClick={this.handleItemClick}/>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Search
                                loading={isLoading}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                                results={results}
                                resultRenderer={resultRenderer}
                                value={value}
                                {...this.props}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Segment attached='bottom'>
                    <Cards skillSelected={activeItem}/>
                </Segment>
            </div>
        );
    }

}

export default MainDash;


