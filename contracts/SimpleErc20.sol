// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/Context.sol";


contract token is ERC20{
    uint public traget_block_number = 0;
    uint112 public constant max_token_number = uint112(12345678910 ether);
    address public owner;
    address[] public white_list;
    mapping(address => bool) public is_claim;
    address[] public yet_claim_people;



    constructor() ERC20("Tomillion", "TOM") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    event AddWhiteList(address indexed _address);
    event SetTargetBlockNumber(uint indexed _traget_block_number);

    function claim() external{
        require(msg.sender == tx.origin,"bots are not welcome");
        require(is_in_white_list(msg.sender) == true ||  block.number > traget_block_number , " your address is not in white list or block number is not enough");
        require(msg.sender.balance >= 0.1 ether,"you have no 0.1 eth to claim");
        if(is_claim[msg.sender] == false ){
            is_claim[msg.sender] = true;
            yet_claim_people.push(msg.sender);
            _mint(msg.sender,return_claim_number());
        }   
    }

    function is_in_white_list(address _address) public view returns(bool){
        for(uint i = 0; i < white_list.length; i++){
            if(white_list[i] == _address){
                return true;
            }
        }
        return false;
    }
    

    function add_white_list(address[] calldata _address) external onlyOwner{
        for (uint i = 0; i < _address.length; i++) {
            white_list.push(_address[i]);
            emit AddWhiteList(_address[i]);
        }
    }

    function set_target_block_number(uint _traget_block_number) external onlyOwner{
        traget_block_number = _traget_block_number;
        emit SetTargetBlockNumber(_traget_block_number);
    }

    function return_claim_number() public view returns(uint104){
        uint104 claim_number;
        if(yet_claim_people.length <= 1010){
            claim_number = uint104(max_token_number/100*20/1010*1);
        }
        else if(yet_claim_people.length > 1010 && yet_claim_people.length <= 10101){
            claim_number = uint104((max_token_number/100*60)/10000*1);
        }
        else if(yet_claim_people.length > 10101 && yet_claim_people.length <= 101010){
            claim_number = uint104((max_token_number/100*20)/100000*1);
        }
        return claim_number;
    }

    function return_is_claim(address _address) public view returns(bool){
        return is_claim[_address];
    }
}