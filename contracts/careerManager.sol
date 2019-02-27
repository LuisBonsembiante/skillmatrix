pragma solidity ^0.4.25;

import "./Ownable.sol";

contract StageInterface {
    function getStateOfToken(uint _tokeId, uint _hitoType) external onlyOwner returns (Hito);

    struct Hito {
        uint tipo; // Referencia a un usuario
        bool aprovado; // Referencia a una tecnologia
    }
}


contract CareerManager is Ownable {


    StageInterface internal stage1; // Cada stage es un nivel de conocimiento de X tecnologia - Representado con un contrato que valida ese conocimiento
    StageInterface internal stage2;
    StageInterface internal stage3;
    StageInterface internal stage4;
    StageInterface internal stage5;


    struct Token {
        string empleado_uid; // Referencia a un usuario
        string tecnoliga_uid; // Referencia a una tecnologia
    }

    struct Hito {
        uint tipo; // Referencia a un usuario
        bool aprovado; // Referencia a una tecnologia
    }

    Token[] public token_list;

    mapping(uint => string) public tokenToEmployee;
    mapping(bytes32 => uint) public ownerTokenCount;

    // Crea un nuevo token, para un empleado y una tecnologia determinada
    function addToken(string _empleadoUid, string _tecnologiaUid) external onlyOwner {
        // TODO Validar no duplicar tokens
        bytes32 _empleado_keccak256_uid = keccak256(abi.encodePacked(_empleadoUid));
        uint token_id = token_list.push(Token(_empleadoUid, _tecnologiaUid)) - 1;
        tokenToEmployee[token_id] = _empleadoUid;
        ownerTokenCount[_empleado_keccak256_uid]++;
    }

    // Setea una nueva adrress perteneciente a una nueva instancia de un Stage determinado
    function setStageAddress(address _stageAddress, uint index) external {
        if (index == 1) {
            stage1 = StageInterface(_stageAddress);
        } else if (index == 2) {
            stage2 = StageInterface(_stageAddress);
        } else if (index == 3) {
            stage3 = StageInterface(_stageAddress);
        } else if (index == 4) {
            stage4 = StageInterface(_stageAddress);
        } else if (index == 5) {
            stage5 = StageInterface(_stageAddress);
        }
    }

    // Retorna la lista de IDs de tokens, pertenecientes a un empleado
    function getTokenByEmployee(string _empleadoUid) external view onlyOwner returns (uint[]) {
        bytes32 _empleado_keccak256_uid = keccak256(abi.encodePacked(_empleadoUid));
        uint[] memory result = new uint[](ownerTokenCount[_empleado_keccak256_uid]);
        uint counter = 0;
        for (uint i = 0; i < token_list.length; i++) {
            if (keccak256(abi.encodePacked(tokenToEmployee[i])) == _empleado_keccak256_uid) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // Retorna el hito relacionado a X Stage de un token
    function getStateOfToken(uint _tokeId, uint _stage, uint _hitoType) external returns (Hito) {
        if (_stage == 1) {
            return stage1.getStateOfToken(_tokeId, _hitoType);
        } else if (_stage == 2) {
            return stage2.getStateOfToken(_tokeId, _hitoType);
        } else if (_stage == 3) {
            return stage3.getStateOfToken(_tokeId, _hitoType);
        } else if (_stage == 4) {
            return stage4.getStateOfToken(_tokeId, _hitoType);
        } else if (_stage == 5) {
            return stage5.getStateOfToken(_tokeId, _hitoType);
        }
    }
}


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
    function getStateOfToken(uint _tokeId, uint _hitoType) external onlyOwner returns (Hito) {
        if(getTokenToHitosLength(_toke_id) == 0 ) {
            registerToken(_toke_id);
        }
        uint hitoId = tokenToHitos[_tokeId][_hitoType];
        return hitoList[hitoId];
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