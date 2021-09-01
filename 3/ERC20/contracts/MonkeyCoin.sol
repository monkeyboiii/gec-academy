// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC20.sol";

contract MonkeyCoin is ERC20 {
    function totalSupply() external view returns (uint256) {
        return 1000;
    }

    function balanceOf(address who) external view returns (uint256);
}
