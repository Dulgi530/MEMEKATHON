// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract ItemPayment {
    address public owner;
    IERC20 public memeCore;
    address public feeReceiver;

    mapping(uint8 => uint256) public itemPrice; // itemId => price in MEMECORE units

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event ItemPurchased(address indexed buyer, uint8 indexed itemId, uint256 price);
    event FeeReceiverUpdated(address indexed newReceiver);
    event MemeCoreUpdated(address indexed newToken);
    event ItemPriceUpdated(uint8 indexed itemId, uint256 price);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _memeCore, address _feeReceiver) {
        owner = msg.sender;
        require(_feeReceiver != address(0), "feeReceiver=0");
        feeReceiver = _feeReceiver;
        memeCore = IERC20(_memeCore);
        emit OwnershipTransferred(address(0), msg.sender);
        emit FeeReceiverUpdated(_feeReceiver);
        emit MemeCoreUpdated(_memeCore);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "owner=0");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function setFeeReceiver(address _receiver) external onlyOwner {
        require(_receiver != address(0), "receiver=0");
        feeReceiver = _receiver;
        emit FeeReceiverUpdated(_receiver);
    }

    function setMemeCore(address _memeCore) external onlyOwner {
        memeCore = IERC20(_memeCore);
        emit MemeCoreUpdated(_memeCore);
    }

    function setItemPrice(uint8 itemId, uint256 price) external onlyOwner {
        itemPrice[itemId] = price;
        emit ItemPriceUpdated(itemId, price);
    }

    function buyItem(uint8 itemId) external {
        uint256 price = itemPrice[itemId];
        require(price > 0, "price=0");
        require(memeCore.transferFrom(msg.sender, feeReceiver, price), "transferFrom failed");
        emit ItemPurchased(msg.sender, itemId, price);
    }
}

