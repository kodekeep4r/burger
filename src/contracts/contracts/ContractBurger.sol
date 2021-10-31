

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;



import "openzeppelin-solidity/contracts/access/Ownable.sol";

import "openzeppelin-solidity/contracts/utils/Context.sol";

import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";

import "openzeppelin-solidity/contracts/interfaces/IERC165.sol";

import "openzeppelin-solidity/contracts/interfaces/IERC721.sol";

import "openzeppelin-solidity/contracts/interfaces/IERC721Enumerable.sol";

import "openzeppelin-solidity/contracts/interfaces/IERC721Metadata.sol";

import "openzeppelin-solidity/contracts/interfaces/IERC721Receiver.sol";

import "openzeppelin-solidity/contracts/utils/Address.sol";

import "openzeppelin-solidity/contracts/utils/structs/EnumerableMap.sol";

import "openzeppelin-solidity/contracts/utils/Strings.sol";



abstract contract ERC165 is IERC165 {
    /*
     * bytes4(keccak256('supportsInterface(bytes4)')) == 0x01ffc9a7
     */
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    /**
     * @dev Mapping of interface ids to whether or not it's supported.
     */
    mapping(bytes4 => bool) private _supportedInterfaces;

    constructor ()  {
        // Derived contracts need only register support for their own interfaces,
        // we register support for ERC165 itself here
        _registerInterface(_INTERFACE_ID_ERC165);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     *
     * Time complexity O(1), guaranteed to always use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return _supportedInterfaces[interfaceId];
    }

    /**
     * @dev Registers the contract as an implementer of the interface defined by
     * `interfaceId`. Support of the actual ERC165 interface is automatic and
     * registering its interface id is not required.
     *
     * See {IERC165-supportsInterface}.
     *
     * Requirements:
     *
     * - `interfaceId` cannot be the ERC165 invalid interface (`0xffffffff`).
     */
    function _registerInterface(bytes4 interfaceId) internal virtual {
        require(interfaceId != 0xffffffff, "ERC165: invalid interface id");
        _supportedInterfaces[interfaceId] = true;
    }
}



/**
 * @title ERC721 Non-Fungible Token Standard basic implementation
 * @dev see https://eips.ethereum.org/EIPS/eip-721
 */
contract ERC721 is Context, ERC165, IERC721, IERC721Metadata, IERC721Enumerable {
    using SafeMath for uint256;
    using Address for address;
    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableMap for EnumerableMap.UintToAddressMap;
    using Strings for uint256;

    modifier onlyTradableTexugo (address from, uint256 tokenId) {
        require(tokenId < 20020, "Out of tokenId");
        require(ownerOf(tokenId) == from, "ERC721: transfer of token that is not own");
        _;
    }

    struct Offer {
        bool isForSale;
        uint256 texugoIndex;
        address seller;
        uint256 minValue;       
        address onlySellTo;
    }
    struct Bid {
        bool hasBid;
        uint256 texugoIndex;
        address bidder;
        uint256 value;
    }
    mapping(uint256 => uint256) private assignOrders;
    mapping (uint256 => Offer) public texugosOfferedForSale;
    mapping (uint256 => Bid) public texugoBids;
    mapping (address => uint256) public pendingWithdrawals;

    // Equals to `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
    // which can be also obtained as `IERC721Receiver(0).onERC721Received.selector`
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Mapping from holder address to their (enumerable) set of owned tokens
    mapping (address => EnumerableSet.UintSet) private _holderTokens;

    // Enumerable mapping from token ids to their owners
    EnumerableMap.UintToAddressMap private _tokenOwners;

    // Mapping from token ID to approved address
    mapping (uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping (address => mapping (address => bool)) private _operatorApprovals;

    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    // Optional mapping for token URIs
    mapping (uint256 => string) private _tokenURIs;

    // Base URI
    string private _baseURI;

    /*
     *     bytes4(keccak256('balanceOf(address)')) == 0x70a08231
     *     bytes4(keccak256('ownerOf(uint256)')) == 0x6352211e
     *     bytes4(keccak256('approve(address,uint256)')) == 0x095ea7b3
     *     bytes4(keccak256('getApproved(uint256)')) == 0x081812fc
     *     bytes4(keccak256('setApprovalForAll(address,bool)')) == 0xa22cb465
     *     bytes4(keccak256('isApprovedForAll(address,address)')) == 0xe985e9c5
     *     bytes4(keccak256('transferFrom(address,address,uint256)')) == 0x23b872dd
     *     bytes4(keccak256('safeTransferFrom(address,address,uint256)')) == 0x42842e0e
     *     bytes4(keccak256('safeTransferFrom(address,address,uint256,bytes)')) == 0xb88d4fde
     *
     *     => 0x70a08231 ^ 0x6352211e ^ 0x095ea7b3 ^ 0x081812fc ^
     *        0xa22cb465 ^ 0xe985e9c5 ^ 0x23b872dd ^ 0x42842e0e ^ 0xb88d4fde == 0x80ac58cd
     */
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;

    /*
     *     bytes4(keccak256('name()')) == 0x06fdde03
     *     bytes4(keccak256('symbol()')) == 0x95d89b41
     *     bytes4(keccak256('tokenURI(uint256)')) == 0xc87b56dd
     *
     *     => 0x06fdde03 ^ 0x95d89b41 ^ 0xc87b56dd == 0x5b5e139f
     */
    bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x5b5e139f;

    /*
     *     bytes4(keccak256('totalSupply()')) == 0x18160ddd
     *     bytes4(keccak256('tokenOfOwnerByIndex(address,uint256)')) == 0x2f745c59
     *     bytes4(keccak256('tokenByIndex(uint256)')) == 0x4f6ccce7
     *
     *     => 0x18160ddd ^ 0x2f745c59 ^ 0x4f6ccce7 == 0x780e9d63
     */
    bytes4 private constant _INTERFACE_ID_ERC721_ENUMERABLE = 0x780e9d63;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor (string memory name_, string memory symbol_)  {
        _name = name_;
        _symbol = symbol_;

        // register the supported interfaces to conform to ERC721 via ERC165
        _registerInterface(_INTERFACE_ID_ERC721);
        _registerInterface(_INTERFACE_ID_ERC721_METADATA);
        _registerInterface(_INTERFACE_ID_ERC721_ENUMERABLE);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     */
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return _holderTokens[owner].length();
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        return _tokenOwners.get(tokenId, "ERC721: owner query for nonexistent token");
    }

    /**
     * @dev See {IERC721Metadata-name}.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    /**
    * @dev Returns the base URI set via {_setBaseURI}. This will be
    * automatically added as a prefix in {tokenURI} to each token's URI, or
    * to the token ID if no specific URI is set for that token ID.
    */
    function baseURI() public view virtual returns (string memory) {
        return _baseURI;
    }

    /**
     * @dev See {IERC721Enumerable-tokenOfOwnerByIndex}.
     */
    function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual override returns (uint256) {
        return _holderTokens[owner].at(index);
    }

    /**
     * @dev See {IERC721Enumerable-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        // _tokenOwners are indexed by tokenIds, so .length() returns the number of tokenIds
        return _tokenOwners.length();
    }

    /**
     * @dev See {IERC721Enumerable-tokenByIndex}.
     */
    function tokenByIndex(uint256 index) public view virtual override returns (uint256) {
        (uint256 tokenId, ) = _tokenOwners.at(index);
        return tokenId;
    }

    /**
     * @dev See {IERC721-approve}.
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(_msgSender() == owner || ERC721.isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _tokenApprovals[tokenId];
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     */
    function setApprovalForAll(address operator, bool approved) public virtual override {
        require(operator != _msgSender(), "ERC721: approve to caller");

        _operatorApprovals[_msgSender()][operator] = approved;
        emit ApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     */
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `_data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(address from, address to, uint256 tokenId, bytes memory _data) internal virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    /**
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _tokenOwners.contains(tokenId);
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || ERC721.isApprovedForAll(owner, spender));
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`.
     *
     * Requirements:
     d*
     * - `tokenId` must not exist.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
    }

    /**
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function _safeMint(address to, uint256 tokenId, bytes memory _data) internal virtual {
        _mint(to, tokenId);
        require(_checkOnERC721Received(address(0), to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _beforeTokenTransfer(address(0), to, tokenId);

        _holderTokens[to].add(tokenId);

        _tokenOwners.set(tokenId, to);

        emit Transfer(address(0), to, tokenId);
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */
    function _burn(uint256 tokenId) internal virtual {
        address owner = ERC721.ownerOf(tokenId); // internal owner

        _beforeTokenTransfer(owner, address(0), tokenId);

        // Clear approvals
        _approve(address(0), tokenId);

        // Clear metadata (if any)
        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }

        _holderTokens[owner].remove(tokenId);

        _tokenOwners.remove(tokenId);

        emit Transfer(owner, address(0), tokenId);
    }

    /**
     * @dev Transfers `tokenId` from `from` to `to`.
     *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     *
     * Emits a {Transfer} event.
     */
    function _transfer(address from, address to, uint256 tokenId) internal virtual {
        require(ERC721.ownerOf(tokenId) == from, "ERC721: transfer of token that is not own"); // internal owner
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        _holderTokens[from].remove(tokenId);
        _holderTokens[to].add(tokenId);

        _tokenOwners.set(tokenId, to);

        emit Transfer(from, to, tokenId);
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    /**
     * @dev Internal function to set the base URI for all token IDs. It is
     * automatically added as a prefix to the value returned in {tokenURI},
     * or to the token ID if {tokenURI} is empty.
     */
    function _setBaseURI(string memory baseURI_) internal virtual {
        _baseURI = baseURI_;
    }
    
     
    

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(address from, address to, uint256 tokenId, bytes memory _data)
        private returns (bool)
    {
        if (!to.isContract()) {
            return true;
        }
        bytes memory returndata = to.functionCall(abi.encodeWithSelector(
            IERC721Receiver(to).onERC721Received.selector,
            _msgSender(),
            from,
            tokenId,
            _data
        ), "ERC721: transfer to non ERC721Receiver implementer");
        bytes4 retval = abi.decode(returndata, (bytes4));
        return (retval == _ERC721_RECEIVED);
    }

    function _approve(address to, uint256 tokenId) private {
        _tokenApprovals[tokenId] = to;
        emit Approval(ERC721.ownerOf(tokenId), to, tokenId); // internal owner
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual { }
}

/**
 * @title ERC721 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 * from ERC721 asset contracts.
 */


/**
 * @dev Collection of functions related to the address type
 */







contract ContractBurger is ERC721, Ownable {

    using SafeMath for uint256;
    using Strings for uint256;


    mapping(uint256 => uint256) private assignOrders;

    uint256 public SALE_START_TIMESTAMP = 1 ; // 1628535570

    uint256 public constant MAX_SUPPLY = 20020;
    uint256 public texugosRemainingToAssign = MAX_SUPPLY;


    uint256 public constant MAX_RESERVE = 10;
    uint256 public reserved = 0;
    
    uint256 public randIndex = 0;
    uint256 public texugoIndex =0;

    
    // Base URI
    address private _donationRecipient;
    address private _addressDraw1;
    address private _royalRecipient;

    
    //uint256[] private drawAmounts = [1 ether, 2 ether, 5 ether]; //Prod represents [2021, 7071, ALL]
    
    uint256 public  unitprice = 1 ether/10;
    uint256[] public  drawAmounts = [1 ether, 2 ether, 3 ether]; //tests 
    uint public constant drawAfterTotalSupply = 3 ether / 10; // define a reasonable value for open market draw


    uint256 public dateDraw1;
    
    
    //Better make private after validations
    uint256 public fundsDon = 0;
    uint256 public fundsDraw = 0;
    uint256 public fundsRoyal = 0;

    
    uint256 public currentDraw = 0;
    
    
    address constant private nul = 0x0000000000000000000000000000000000000000;



    string public _dataVault;
    
    string public constant imageHash = "notneeded-after-erc721";
    
    
    
    
    
    function changeDonationRecipient(address  donationRecipient) onlyOwner public {
       _changeDonationRecipient(donationRecipient);
    }
    
    function _changeDonationRecipient(address  donationRecipient_) internal virtual {
        _donationRecipient = donationRecipient_;
    }
    
    function getDonationRecipient() public view virtual returns (address ) {
        return _donationRecipient;
    }
    
    function withdrawDonation() external {
        require(msg.sender == _donationRecipient);
        //uint256 don = address(this).balance / 2
        uint256 f = fundsDon;
        fundsDon = 0;
        payable(msg.sender).transfer(f);

        
    }
    
    
    
    function changeRoyalRecipient(address  royalRecipient) onlyOwner public {
       _changeRoyalRecipient(royalRecipient);
    }
    
    function _changeRoyalRecipient(address  royalRecipient_) internal virtual {
        _royalRecipient = royalRecipient_;
    }
    
    function getRoyalRecipient() public view virtual returns (address ) {
        return _royalRecipient;
    }
    
    function withdrawRoyal() external {
        require(msg.sender == _royalRecipient);
        //uint256 don = address(this).balance / 2
        uint256 f = fundsRoyal;
        fundsRoyal = 0;
        payable(msg.sender).transfer(f);

        
    }
    
    
    
    
    
    function changeDraw1Recipient(address  draw1Recipient)  internal {
       _changeDraw1Recipient(draw1Recipient);

    }
    
    function _changeDraw1Recipient(address  draw1Recipient_) internal virtual {
        _addressDraw1 = draw1Recipient_;
    }
    
    function getDraw1Recipient() public view virtual returns (address ) {
        return _addressDraw1;
    }
    
    function withdrawFundsDraw() external {
        require(msg.sender == _addressDraw1,"Address not Eligible");
        uint256 prize =  (currentDraw < 3) ? drawAmounts[currentDraw] : drawAfterTotalSupply;
        require(fundsDraw > prize,"Not enough Burgers sold yet");
        fundsDraw = fundsDraw - prize;
        currentDraw +=1;
        _changeDraw1Recipient(nul);
        payable(msg.sender).transfer(prize);
        
    
    }
    
    function doDraw() internal {
        changeDraw1Recipient(ownerOf(tokenByIndex(_random(totalSupply()) % totalSupply())));
        
        /*
        uint256 winnerTokenId = _random(totalSupply) % totalSupply;
        uint256 winnerToken = tokenByIndex(winnerTokenId);
        address winnerAddr = ownerOf(winnerToken);
        */
        
        
        }
    
    
    function dataVaultOnChain(string  memory dataVault)  public {
       _dataVaultOnChain(dataVault);
    }
    
    function _dataVaultOnChain(string memory  dataVault_) internal virtual {
        _dataVault = dataVault_;
    }
    
    
    
    
    
    

    constructor(string memory name, string memory symbol, string memory baseURI) ERC721(name, symbol) {
        _setBaseURI(baseURI);
    }

   /* function reserveNFTs(uint256 amount) onlyOwner public {
        require(SafeMath.add(totalSupply(), amount) <= MAX_SUPPLY, "Exceeds maximum supply. Please try to mint less Nfts.");
        require(reserved.add(amount) <= MAX_RESERVE, "Exceeds maximum reserve. Please try to mint less Nfts.");

        for (uint i = 0; i < amount; i++) {
            uint mintIndex = totalSupply();
            _safeMint(msg.sender, mintIndex);
        }
        reserved += amount;
    }*/

    function setSaleTimestamp(uint256 new_SALE_START_TIMESTAMP) onlyOwner public {
        SALE_START_TIMESTAMP = new_SALE_START_TIMESTAMP;
    }

    function getNFTPrice(uint256 amount) public view returns (uint256) {
        require(totalSupply() < MAX_SUPPLY, "Sale has already ended.");

        return amount.mul(unitprice);
    }

    function _random(uint256 capme) internal view returns(uint256) {
        return uint256(
            keccak256(
                abi.encodePacked(block.timestamp + block.difficulty + ((uint256(keccak256(abi.encodePacked(block.coinbase)))) / block.timestamp) + block.gaslimit + ((uint256(keccak256(abi.encodePacked(_msgSender())))) / block.timestamp) + block.number)
            )
        ) / capme;
    }

    function _fillAssignOrder(uint256 orderA, uint256 orderB) internal returns(uint256) {
        uint256 temp = orderA;
        if (assignOrders[orderA] > 0) temp = assignOrders[orderA];
        assignOrders[orderA] = orderB;
        if (assignOrders[orderB] > 0) assignOrders[orderA] = assignOrders[orderB];
        assignOrders[orderB] = temp;
        return assignOrders[orderA];
    }

    function mintBurger(uint256 amount) public payable {
        // require(block.timestamp >= SALE_START_TIMESTAMP, "Sale has not started yet.");
        require(totalSupply() < MAX_SUPPLY, "Sale has already ended.");
        require(amount > 0, "You cannot mint 0 Nfts.");
        require(amount <= 20, "You cannot mint more than 20 Nfts per once");
        require(SafeMath.add(totalSupply(), amount) <= MAX_SUPPLY, "Exceeds maximum supply. Please try to mint less Nfts.");
        require(getNFTPrice(amount) == msg.value, "Amount of Ether sent is not correct.");
        
        fundsDraw += (msg.value * 5 /100);
        fundsDon += (msg.value * 5 /100);
        fundsRoyal += (msg.value * 45 /100);

        (bool success,) = owner().call{value: (msg.value * 45 ) /100}("");
        require(success);

        for (uint i = 0; i < amount; i++) {
            randIndex = _random(texugosRemainingToAssign) % texugosRemainingToAssign;
            texugoIndex = _fillAssignOrder(--texugosRemainingToAssign, randIndex);
            _safeMint(msg.sender, texugoIndex);
            
        }
        
        if (fundsDraw > drawAmounts[currentDraw]){
            doDraw();
        }
    }

    unction buyTexugo(uint256 tokenId) payable public {
        Offer memory offer = texugosOfferedForSale[tokenId];
        require(tokenId < MAX_SUPPLY, "Out of tokenId");
        require(offer.isForSale, "No Sale");
        require(offer.onlySellTo == address(0) || offer.onlySellTo == _msgSender(), "Unable to sell");
        require(msg.value >= offer.minValue, "Insufficient amount");
        require(ownerOf(tokenId) == offer.seller, "Not seller");
        address seller = offer.seller;
        // Transfer the NFT
        _safeTransfer(seller, _msgSender(), tokenId, "");
        pendingWithdrawals[seller] += msg.value * 95 / 100;
        // handle
        (bool success,) = owner().call{value: msg.value * 25 / 1000}("");
        fundsDon += msg.value * 13 / 1000;
        fundsDraw += msg.value * 12 / 1000;
        
        if (fundsDraw > drawAmounts[currentDraw]){
            doDraw();
        }
        
        require(success);
        // handle
        // emit TexugoBought(tokenId, msg.value, seller, _msgSender());
    }

    function texugoNoLongerForSale(uint256 tokenId) public {
        _texugoNoLongerForSale(_msgSender(), tokenId);
    }

    function _texugoNoLongerForSale(address from, uint256 tokenId) internal onlyTradableTexugo(from, tokenId) {
        texugosOfferedForSale[tokenId] = Offer(false, tokenId, from, 0, address(0));
        // emit TexugoNoLongerForSale(tokenId);
    }

    function offerTexugoForSale(uint256 tokenId, uint256 minSalePriceInWei) public onlyTradableTexugo(_msgSender(), tokenId) {
        texugosOfferedForSale[tokenId] = Offer(true, tokenId, _msgSender(), minSalePriceInWei, address(0));
        // emit TexugoOffered(tokenId, minSalePriceInWei, address(0));
    }

    function enterBidForTexugo(uint256 tokenId) public payable {
        require(tokenId < MAX_SUPPLY, "Out");
        require(ownerOf(tokenId) != _msgSender(), "Invalid");
        require(msg.value > texugoBids[tokenId].value, "Invalid");
        Bid memory existing = texugoBids[tokenId];
        if (existing.value > 0) {
            // Refund the failing bid
            pendingWithdrawals[existing.bidder] += existing.value;
        }
        texugoBids[tokenId] = Bid(true, tokenId, _msgSender(), msg.value);
        // emit TexugoBidEntered(tokenId, msg.value, _msgSender());
    }

    function acceptBidForTexugo(uint256 tokenId, uint256 minPrice) public onlyTradableTexugo(_msgSender(), tokenId) {
        require(texugoBids[tokenId].value >= minPrice, "Invalid");
        Bid memory bid = texugoBids[tokenId];

        texugoBids[tokenId] = Bid(false, tokenId, address(0), 0);
        _safeTransfer(_msgSender(), bid.bidder, tokenId, "");

        pendingWithdrawals[_msgSender()] += bid.value * 95 / 100;
        (bool success,) = owner().call{value: bid.value * 5 / 100}("");
        require(success);
        
        // emit TexugoBought(tokenId, bid.value, _msgSender(), bid.bidder);
    }

    function withdrawBidForTexugo(uint256 tokenId) public {
        require(tokenId < MAX_SUPPLY, "Out");
        require(ownerOf(tokenId) != _msgSender(), "Invalid");
        require(texugoBids[tokenId].bidder == _msgSender(), "Invalid");
        texugoBids[tokenId] = Bid(false, tokenId, address(0), 0);
        // Refund the bid money
        (bool success,) = _msgSender().call{value: texugoBids[tokenId].value}("");
        require(success);
        // emit TexugoBidWithdrawn(tokenId, texugoBids[tokenId].value, _msgSender());
    }
    
    function transferEther(address payable recipient, uint256 amount) onlyOwner public payable {
      recipient.transfer(amount);
  }

    
    function withdraw() public {
        uint256 amount = pendingWithdrawals[_msgSender()];
        pendingWithdrawals[_msgSender()] = 0;
        (bool success,) = _msgSender().call{value: amount}("");
        require(success);
    }

    function withdraw(uint256 amount) onlyOwner public {
        payable(msg.sender).transfer(amount);
    }

    function changeBaseURI(string memory baseURI) onlyOwner public {
       _setBaseURI(baseURI);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return string(abi.encodePacked(baseURI(), tokenId.toString()));
    }
}
