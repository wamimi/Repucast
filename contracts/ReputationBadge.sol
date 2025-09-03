// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReputationBadge is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    mapping(uint256 => uint256) public reputationScores;
    mapping(address => bool) public hasReputationBadge;
    
    event BadgeMinted(address indexed to, uint256 indexed tokenId, uint256 reputationScore);
    
    constructor() ERC721("RepuCast Reputation Badge", "REPUBADGE") {}
    
    function mint(address to, uint256 reputationScore) external onlyOwner returns (uint256) {
        require(!hasReputationBadge[to], "Address already has a reputation badge");
        require(reputationScore >= 70, "Reputation score too low");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        reputationScores[tokenId] = reputationScore;
        hasReputationBadge[to] = true;
        
        emit BadgeMinted(to, tokenId, reputationScore);
        return tokenId;
    }
    
    function getReputationScore(uint256 tokenId) external view returns (uint256) {
        require(_exists(tokenId), "Token does not exist");
        return reputationScores[tokenId];
    }
    
    // Soulbound: Prevent transfers
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        require(from == address(0) || to == address(0), "Soulbound: transfers not allowed");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        
        uint256 score = reputationScores[tokenId];
        string memory status = score >= 90 ? "Legendary" : score >= 80 ? "Verified" : "Authenticated";
        
        return string(abi.encodePacked(
            "data:application/json;base64,",
            _base64encode(bytes(string(abi.encodePacked(
                '{"name":"RepuCast Badge - ', status, '",',
                '"description":"On-chain reputation badge proving authentic human status",',
                '"image":"https://repucast.vercel.app/badge/', _toString(score), '.png",',
                '"attributes":[',
                '{"trait_type":"Reputation Score","value":', _toString(score), '},',
                '{"trait_type":"Status","value":"', status, '"}',
                ']}'
            ))))
        ));
    }
    
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
    
    function _base64encode(bytes memory data) internal pure returns (string memory) {
        // Simple base64 encoding (for production, use a library)
        return "encoded_data_placeholder";
    }
}
