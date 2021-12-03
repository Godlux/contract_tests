pragma solidity ^0.8.7;

import "./Jkp.sol";

contract JkpHandler {
    Jkp Contract;  //using existing interface

    function set_jkp_contract_by(address addr) public {
        Contract = Jkp(addr);
    }
    
    function commit_choise(address addr, bytes32 data) public {
        Contract.commit_choise(addr, data);
    }

    function reval_choise(address _other_player_address, uint8 choice, bytes32 nonce) public {
        Contract.reval_choise(_other_player_address, choice, nonce);
    }
}
