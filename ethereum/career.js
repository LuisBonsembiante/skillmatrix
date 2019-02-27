import web3 from './web3';
import CareerManager from  './build/CareerManager.json';

const instance = new web3.eth.Contract(
    JSON.parse(CareerManager.interface),
    '0x61680702afd82C2AcC60FD468ea78C351D807960'
);

export default instance;