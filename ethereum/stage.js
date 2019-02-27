import web3 from "./web3";
import Stage from  './build/Stage.json';

export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(Stage.interface),
        address
    );
};
