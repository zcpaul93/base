// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract ZCBear is ERC721 {
    using Strings for uint256;

    constructor() ERC721("ZC BEAR", "ZCB") {

    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://2/";
    }

    function tokenURI(uint256 tokenId) public view virtual override returns(string memory){
        super.tokenURI;

        ownerOf(tokenId);
        return string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json"));
    }


    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }
}

contract Empty {

}