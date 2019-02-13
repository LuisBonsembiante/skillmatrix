import React from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import {Router} from "../routes";

export default class RequestRow extends React.Component {

    state = {
        errorMessage: '',
        loading: false
    }
    onApprove = async () => {

        this.setState({ loading: true });

        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            });
        }catch(e){

        }


        this.setState({ loading: false });

        Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    };

    onFinalize = async () => {

        this.setState({ loading: true });

        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            });
        }catch(e){

        }


        this.setState({ loading: false });

        Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    };

    render() {
        const {Row, Cell} = Table;
        const {id, request, approversCount} = this.props;
        const readyToFinalize = request.approvalCount > approversCount / 2;

        return (
            <Row
                disabled={request.complete}
                positive={readyToFinalize && !request.complete}
            >

                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value,'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>
                    {request.approvalCount}/{approversCount}
                </Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button loading={this.state.loading} color="green" basic onClick={this.onApprove}>
                            Approve
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button loading={this.state.loading} color="teal" basic onClick={this.onFinalize}>
                            Finalize
                        </Button>
                    )}
                </Cell>
            </Row>
        );
    }
}