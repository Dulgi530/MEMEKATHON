// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DIDRegistry {
    struct DIDInfo {
        bool isAdult;
        uint8 gender; // 0 unknown, 1 male, 2 female, 3 other
        bytes32 countryCommit; // could be a commitment to country code
        uint64 issuedAt;
    }

    mapping(bytes32 => DIDInfo) public didOf; // userCommit => DIDInfo
    address public issuer;

    event DIDRegistered(bytes32 indexed userCommit, bool isAdult, uint8 gender, bytes32 countryCommit);
    event IssuerUpdated(address indexed newIssuer);

    modifier onlyIssuer() {
        require(msg.sender == issuer, "Not issuer");
        _;
    }

    constructor(address _issuer) {
        require(_issuer != address(0), "issuer=0");
        issuer = _issuer;
        emit IssuerUpdated(_issuer);
    }

    function setIssuer(address _issuer) external onlyIssuer {
        require(_issuer != address(0), "issuer=0");
        issuer = _issuer;
        emit IssuerUpdated(_issuer);
    }

    function registerOrUpdateDID(
        bytes32 userCommit,
        bool isAdult,
        uint8 gender,
        bytes32 countryCommit
    ) external onlyIssuer {
        DIDInfo storage info = didOf[userCommit];
        info.isAdult = isAdult;
        info.gender = gender;
        info.countryCommit = countryCommit;
        info.issuedAt = uint64(block.timestamp);

        emit DIDRegistered(userCommit, isAdult, gender, countryCommit);
    }
}

