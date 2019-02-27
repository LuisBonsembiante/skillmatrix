pragma solidity ^0.4.25;

contract StageInterface {

}

contract CareerManager {


    StageInterface stage1; // Cada stage es un nivel de conocimiento de X tecnologia - Representado con un contrato que valida ese conocimiento
    StageInterface stage2;
    StageInterface stage3;
    StageInterface stage4;
    StageInterface stage5;


    struct Token {
        string empleado_uid; // Referencia a un usuario
        string tecnoliga_uid; // Referencia a una tecnologia
    }

    Token[] token_list;

    mapping(uint => string) public tokenToEmployee;
    mapping(bytes32  => uint) public ownerTokenCount;

    function addToken(string _empleado_uid, string _tecnologia_uid) external {
        // TODO Validar no duplicar tokens
        bytes32 _empleado_keccak256_uid = keccak256(_empleado_uid);
        uint token_id = token_list.push(Token(_empleado_uid, _tecnologia_uid)) - 1;
        tokenToEmployee[token_id] = _empleado_uid;
        ownerTokenCount[_empleado_keccak256_uid]++;
    }

    function setStageAddress(address _stageAddress, uint index) external {
        // TODO switch entre stages
    }

    function getTokenByEmployee(string _owner) external view returns(uint[]) {
        bytes32 _empleado_keccak256_uid = keccak256(_owner);
        uint[] memory result = new uint[](ownerTokenCount[_empleado_keccak256_uid]);
        uint counter = 0;
        for (uint i = 0; i < token_list.length; i++) {
            if (keccak256(tokenToEmployee[i]) == keccak256(_owner)) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
}


contract Stage {

    mapping(uint => uint[]) public tokenToHitos;
    mapping(uint => string) public hitoType;

    struct Hito {
        uint tipo; // Referencia a un usuario
        bool aprovado; // Referencia a una tecnologia
    }

    uint hitosCount = 0;

    Hito[] public hito_list;

    function registerToken(uint _toke_id) external {
        for (uint i = 1; i <= hitosCount; i++) {
            uint hito_id = hito_list.push(Hito(i, false)) - 1;
            tokenToHitos[_toke_id].push(hito_id);
        }
    }

    function addHito(string _tipo) external {
        hitosCount++;
        hitoType[hitosCount] = _tipo;
    }

    function changeHitoState(uint _token_id, uint hito_type, bool _state) external {
        uint hito_id = tokenToHitos[_token_id][hito_type];
        hito_list[hito_id].aprovado = _state;
    }

    function getTokenToHitos(uint _token_id) public view returns (uint[]) {
        return tokenToHitos[_token_id];
    }

    function getTokenToHitosLength(uint _token_id) public view returns (uint) {
        return tokenToHitos[_token_id].length;
    }

    function getTokenToHitosValue(uint _token_id, uint index) public view returns (uint) {
        return tokenToHitos[_token_id][index];
    }





}