// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.11;

import { IERC20Metadata } from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import { ISuperTokenFactory, ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol";

contract SuperTokenManager {
    ISuperTokenFactory public superTokenFactory;

    constructor(ISuperTokenFactory _superTokenFactory) {
        superTokenFactory = _superTokenFactory;
    }

    function createSuperToken(
        IERC20Metadata underlyingToken,
        uint8 underlyingDecimals,
        string calldata name,
        string calldata symbol,
        address admin
    ) external returns (ISuperToken superToken) {
        superToken = superTokenFactory.createERC20Wrapper(
            underlyingToken,
            underlyingDecimals,
            ISuperTokenFactory.Upgradability.SEMI_UPGRADABLE,
            name,
            symbol,
            admin
        );
    }
}