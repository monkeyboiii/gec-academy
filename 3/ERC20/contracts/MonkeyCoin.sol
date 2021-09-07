// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1 <0.9.0;

import "./ERC20.sol";

// reference to https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol
contract MonkeyCoin is ERC20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint256 private _totalSupply;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;

    constructor(string memory name_, string memory symbol_) public {
        _name = name_;
        _symbol = symbol_;
        _decimals = 0;
        _totalSupply = 1000;
        balances[msg.sender] = 1000;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address who) external view returns (uint256) {
        return balances[who];
    }

    function allowance(address owner, address spender)
        external
        view
        returns (uint256)
    {
        return allowed[owner][spender];
    }

    function transfer(address to, uint256 value) external returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool) {
        _transfer(from, to, value);

        uint256 currentAllowance = allowed[from][msg.sender];
        require(
            currentAllowance >= value,
            "ERC20: transfer amount exceeds allowance"
        );
        _approve(from, msg.sender, currentAllowance - value);

        return true;
    }

    //
    //
    // helper functions

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        // _beforeTokenTransfer(sender, recipient, amount);

        uint256 senderBalance = balances[sender];
        require(
            senderBalance >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        balances[sender] = senderBalance - amount;
        balances[recipient] += amount;

        emit Transfer(sender, recipient, amount);

        // _afterTokenTransfer(sender, recipient, amount);
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        allowed[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    // function increaseAllowance(address spender, uint256 addedValue)
    //     public
    //
    //     returns (bool)
    // {
    //     _approve(
    //         msg.sender,
    //         spender,
    //         allowed[msg.sender][spender] + addedValue
    //     );
    //     return true;
    // }

    // function decreaseAllowance(address spender, uint256 subtractedValue)
    //     public
    //
    //     returns (bool)
    // {
    //     uint256 currentAllowance = allowed[msg.sender][spender];
    //     require(
    //         currentAllowance >= subtractedValue,
    //         "ERC20: decreased allowance below zero"
    //     );
    //     unchecked {
    //         _approve(msg.sender, spender, currentAllowance - subtractedValue);
    //     }

    //     return true;
    // }

    // function _mint(address account, uint256 amount) internal {
    //     require(account != address(0), "ERC20: mint to the zero address");

    //     _beforeTokenTransfer(address(0), account, amount);

    //     _totalSupply += amount;
    //     balances[account] += amount;
    //     emit Transfer(address(0), account, amount);

    //     _afterTokenTransfer(address(0), account, amount);
    // }

    // function _burn(address account, uint256 amount) internal {
    //     require(account != address(0), "ERC20: burn from the zero address");

    //     _beforeTokenTransfer(account, address(0), amount);

    //     uint256 accountBalance = balances[account];
    //     require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
    //     unchecked {
    //         balances[account] = accountBalance - amount;
    //     }
    //     _totalSupply -= amount;

    //     emit Transfer(account, address(0), amount);

    //     _afterTokenTransfer(account, address(0), amount);
    // }

    // function _beforeTokenTransfer(
    //     address from,
    //     address to,
    //     uint256 amount
    // ) internal {}

    // function _afterTokenTransfer(
    //     address from,
    //     address to,
    //     uint256 amount
    // ) internal {}
}
