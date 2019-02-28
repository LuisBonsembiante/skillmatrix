pragma solidity ^0.4.25;

import "./Ownable.sol";

contract Stage is Ownable {

    mapping(uint => uint[]) public tokenToHitos;
    mapping(uint => string) public hitoType;

    struct Hito {
        uint tipo; // Referencia a un usuario
        bool aprovado; // Referencia a una tecnologia
    }

    uint hitosCount = 0;

    Hito[] public hitoList;

    // Registra un nuevo token, y le asigna todos los hitos como no aprovados
    function registerToken(uint _tokeId) internal {
        for (uint i = 1; i <= hitosCount; i++) {
            uint hitoId = hitoList.push(Hito(i, false)) - 1;
            tokenToHitos[_tokeId].push(hitoId);
        }
    }

    // Retorna el estado de un tipo de hito, relacionado al token
    function getStateOfToken(uint _tokeId, uint _hitoType) external onlyOwner returns (uint, bool) {
        if(getTokenToHitosLength(_toke_id) == 0 ) {
            registerToken(_toke_id);
        }
        uint hitoId = tokenToHitos[_tokeId][_hitoType];
        return (hitoList[hitoId].tipo, hitoList[hitoId].aprovado) ;
    }

    // Agrega un nuevo hito al stage
    function addHito(string _tipo) external onlyOwner {
        hitosCount++;
        hitoType[hitosCount] = _tipo;
    }

    // Cambia el estado de un hito, relacionado a un token
    function changeHitoState(uint _tokeId, uint _hitoType, bool _state) external onlyOwner {
        uint hitoId = tokenToHitos[_tokeId][_hitoType];
        hitoList[hitoId].aprovado = _state;
    }

    // Retorna la lista de ID de los hitos relacionados al token
    function getTokenToHitos(uint _tokeId) public view onlyOwner returns (uint[]) {
        return tokenToHitos[_tokeId];
    }

    // Retorna el largo de la lista de ID de los hitos relacionados al token
    function getTokenToHitosLength(uint _tokeId) public view onlyOwner returns (uint) {
        return tokenToHitos[_tokeId].length;
    }

    // Retorna un tipo de hito relacionado al token
    function getTokenToHitosValue(uint _tokeId, uint _hitoType) public view onlyOwner returns (uint) {
        return tokenToHitos[_tokeId][_hitoType];
    }


}
