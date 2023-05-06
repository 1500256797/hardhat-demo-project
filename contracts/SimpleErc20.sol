// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract token is ERC20{
    uint32 public release_time = uint32(block.timestamp);
    uint112 public constant max_token_number = uint112(90800000000 ether);

    mapping(address => bool) public is_claim;
    address[] public yet_claim_people;
    uint112 public all_claim = max_token_number/2;

    constructor() ERC20("pepe", "pepe"){
        _mint(0x5b956F82deC5133ECB94e75CCC322E8eC6E5749f,uint112(max_token_number/100*5)); //fo xxx
        _mint(0x356faDD245d35ff8F1a207aC83BE7EEa911abeEE,uint112(max_token_number/100*20)); //for xxx
        _mint(0x15A29B3c402bC5A554086fD11Cd45A14e8b3656b,uint112(max_token_number/100*25)); //for vitalik.eth
    }

    function claim() external{
        require(msg.sender == tx.origin);
        if( (uint32(block.timestamp)-release_time) <= 360 days && is_claim[msg.sender] == false ){
            is_claim[msg.sender] = true;
            yet_claim_people.push(msg.sender);
            _mint(msg.sender,return_claim_number());
        }   
    }
    
    function return_claim_number() public view returns(uint104){
        uint104 claim_number;
        if(yet_claim_people.length <= 1010){
            claim_number = uint104(all_claim/100*20/1010*1);
        }
        else if(yet_claim_people.length > 1010 && yet_claim_people.length <= 10101){
            claim_number = uint104((all_claim/100*60)/10000*1);
        }
        else if(yet_claim_people.length > 10101 && yet_claim_people.length <= 101010){
            claim_number = uint104((all_claim/100*20)/100000*1);
        }
        return claim_number;
    }

    function return_is_claim(address _address) public view returns(bool){
        return is_claim[_address];
    }
}