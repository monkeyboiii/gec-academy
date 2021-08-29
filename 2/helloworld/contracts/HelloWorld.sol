// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// transaction hash
// 0x5c3f8a64b1820c2a4312253e3739b5f0351930587f4b6b60b4d8338cdbcfecc7
contract HelloWorld {
    constructor() public {}

    function helloWorld() public pure returns (string memory) {
        return "hello world";
    }
}
