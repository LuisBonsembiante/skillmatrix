import web3 from './web3';
import CareerManager from  './build/CareerManager.solStage.json';

const instance = new web3.eth.Contract(
    JSON.parse(CareerManager.interface),
    '0xDeE6464FE58DbEd8244d991eFB69AF549E503Dd6'
);

export default instance;