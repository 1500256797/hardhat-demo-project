// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


interface IClip {
    function mintClips() external;
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract BatchMintClips {
	// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1167.md
	bytes miniProxy;			  // = 0x363d3d373d3d3d363d73bebebebebebebebebebebebebebebebebebebebe5af43d82803e903d91602b57fd5bf3;
    address private immutable original;
	address private immutable deployer;
	address private constant CLIP = 0xeCbEE2fAE67709F718426DDC3bF770B26B95eD20;
	mapping (address=>uint) public countClaimMint;
	
	constructor() {
		miniProxy = bytes.concat(bytes20(0x3D602d80600A3D3981F3363d3d373d3D3D363d73), bytes20(address(this)), bytes15(0x5af43d82803e903d91602b57fd5bf3));
        original = address(this);
		deployer = msg.sender;
	}

	function BatchMint(uint times) external payable  {
		bytes memory bytecode = miniProxy;
		address proxy;
		uint N = countClaimMint[msg.sender];
		for(uint i=N; i<N+times;) {
	        bytes32 salt = keccak256(abi.encodePacked(msg.sender, i));
			assembly {
	            proxy := create2(0, add(bytecode, 32), mload(bytecode), salt)
			}
            BatchMintClips(proxy).claimMintToken();
            unchecked {
            i++;
        }
		}
		countClaimMint[msg.sender] = N+times;
	}


	function claimMintToken() external   {
        IClip Clip = IClip(CLIP);
        Clip.mintClips();
        Clip.transfer(tx.origin, Clip.balanceOf(address(this)));
		// if(address(this) != original)			
			// selfdestruct(payable(tx.origin));
	}

}

