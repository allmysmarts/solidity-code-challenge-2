//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EthPool is Ownable {
    struct DepositAgreement {
        uint256 amount;
        uint256 subtractRewards;
    }

    mapping(address => DepositAgreement) public deposits;

    uint256 public totalDepositAmount;

    uint256 private cumulatedRewardsPerDividend;

    uint256 public constant CUMULATED_REWARDS_MULTIPLIER = 1e9;

    // events
    event NewDeposit(address indexed user, uint256 amount);

    event WithdrawDeposit(address indexed user, uint256 amount);

    event NewRewards(uint256 amount);

    constructor() Ownable() {}

    function deposit() external payable {
        DepositAgreement storage agreement = deposits[msg.sender];
        require(agreement.amount == 0, "Not allowed multiple deposit");

        agreement.amount = msg.value;
        agreement.subtractRewards = (cumulatedRewardsPerDividend * msg.value);

        totalDepositAmount += msg.value;

        emit NewDeposit(msg.sender, msg.value);
    }

    function withdraw() external {
        DepositAgreement storage agreement = deposits[msg.sender];
        require(agreement.amount > 0, "Invalid amount");

        uint256 amount = agreement.amount;
        uint256 rewards = (amount * cumulatedRewardsPerDividend) /
            CUMULATED_REWARDS_MULTIPLIER -
            agreement.subtractRewards;

        totalDepositAmount -= amount;
        agreement.amount = 0;
        agreement.subtractRewards = 0;

        payable(msg.sender).transfer(amount + rewards);

        emit WithdrawDeposit(msg.sender, amount);
    }

    function addNewReward() external payable onlyOwner {
        cumulatedRewardsPerDividend += ((msg.value *
            CUMULATED_REWARDS_MULTIPLIER) / totalDepositAmount);

        emit NewRewards(msg.value);
    }
}
