// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Lightweight, self-contained ERC20 for tests and local dev
// No external dependencies; includes mint/burn and ownership.
contract MockToken {
    // ERC20 metadata
    string public name;
    string public symbol;
    uint8 public constant decimals = 18;

    // ERC20 storage
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // Ownership
    address public owner;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) {
        name = _name;
        symbol = _symbol;
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);

        if (_initialSupply > 0) {
            _mint(msg.sender, _initialSupply);
        }
    }

    // ERC20: approve spender
    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    // ERC20: transfer tokens
    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    // ERC20: transferFrom with allowance check
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        require(allowed >= amount, "allowance");
        if (allowed != type(uint256).max) {
            allowance[from][msg.sender] = allowed - amount;
            emit Approval(from, msg.sender, allowance[from][msg.sender]);
        }
        _transfer(from, to, amount);
        return true;
    }

    // Convenience: increase/decrease allowance
    function increaseAllowance(address spender, uint256 addedValue) external returns (bool) {
        uint256 newAllowance = allowance[msg.sender][spender] + addedValue;
        allowance[msg.sender][spender] = newAllowance;
        emit Approval(msg.sender, spender, newAllowance);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool) {
        uint256 current = allowance[msg.sender][spender];
        require(current >= subtractedValue, "decrease>allowance");
        uint256 newAllowance = current - subtractedValue;
        allowance[msg.sender][spender] = newAllowance;
        emit Approval(msg.sender, spender, newAllowance);
        return true;
    }

    // Owner functions: mint/burn and ownership transfer
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Public faucet: anyone can mint tokens to themselves.
    function faucet(uint256 amount) external {
        _mint(msg.sender, amount);
    }

    function burn(uint256 amount) external {
        require(balanceOf[msg.sender] >= amount, "balance");
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }

    function burnFrom(address from, uint256 amount) external {
        uint256 allowed = allowance[from][msg.sender];
        require(allowed >= amount, "allowance");
        if (allowed != type(uint256).max) {
            allowance[from][msg.sender] = allowed - amount;
            emit Approval(from, msg.sender, allowance[from][msg.sender]);
        }
        require(balanceOf[from] >= amount, "balance");
        balanceOf[from] -= amount;
        totalSupply -= amount;
        emit Transfer(from, address(0), amount);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "owner=0");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    // Internal helpers
    function _transfer(address from, address to, uint256 amount) internal {
        require(to != address(0), "to=0");
        require(balanceOf[from] >= amount, "balance");
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal {
        require(to != address(0), "to=0");
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }
}
