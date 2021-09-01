// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract BlockNumber {
    uint256 private initBlockBumber;

    constructor() public {
        initBlockBumber = block.number;
    }

    function getInitBlockNumber() public view returns (uint256) {
        return initBlockBumber;
    }

    function getCurrentBlockNumber() public view returns (uint256) {
        return initBlockBumber;
    }
}
