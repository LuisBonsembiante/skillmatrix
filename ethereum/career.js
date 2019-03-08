import web3 from './web3';
import CareerManager from  './build/CareerManager.solCareerManager.json';

const instance = new web3.eth.Contract(
    JSON.parse(CareerManager.interface),
    '0x89f2347f605E1850a6131c308A678ae611004Fb1'
);

export default instance;

