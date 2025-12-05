// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ItemPayment {
    address public owner;
    address public feeReceiver;

    mapping(uint8 => uint256) public itemPrice; // itemId => price in native token (M)

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event ItemPurchased(address indexed buyer, uint8 indexed itemId, uint256 price);
    event FeeReceiverUpdated(address indexed newReceiver);
    event ItemPriceUpdated(uint8 indexed itemId, uint256 price);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _feeReceiver) {
        owner = msg.sender;
        require(_feeReceiver != address(0), "feeReceiver=0");
        feeReceiver = _feeReceiver;
        emit OwnershipTransferred(address(0), msg.sender);
        emit FeeReceiverUpdated(_feeReceiver);
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

    function setItemPrice(uint8 itemId, uint256 price) external onlyOwner {
        itemPrice[itemId] = price;
        emit ItemPriceUpdated(itemId, price);
    }

    function buyItem(uint8 itemId) external payable {
        uint256 price = itemPrice[itemId];
        require(price > 0, "price=0");
        require(msg.value == price, "incorrect payment");

        (bool success,) = feeReceiver.call{value: msg.value}("");
        require(success, "transfer failed");

        emit ItemPurchased(msg.sender, itemId, price);
    }

    // 실수로 전송된 네이티브 토큰 회수용
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "no balance");
        (bool success,) = owner.call{value: balance}("");
        require(success, "withdraw failed");
    }

    receive() external payable {}
}
