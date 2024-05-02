// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZCToken is ERC20 {
    constructor() ERC20("ZCToken", "ZC") {
        _mint(msg.sender, 1773000 * 10 ** decimals());
    }
}