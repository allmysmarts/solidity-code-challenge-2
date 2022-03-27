//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EthPool is Ownable {
    struct DepositAgreement {
        uint256 amount;
        uint256 subtractRewards;
    }

    mapping(address => DepositAgreement) deposits;

    uint256 totalDepositAmount;

    uint256 cumulatedRewardsPerShare;

    // events
    event NewDeposit(address indexed user, uint256 amount);

    event WithdrawDeposit(address indexed user, uint256 amount, uint256 rewards);

    event NewRewards(uint256 amount);


    function deposit() external payable {
        DepositAgreement storage agreement = deposits[msg.sender];
        agreement.amount += msg.value;
        agreement.subtractRewards = (cumulatedRewardsPerShare * msg.value);

        totalDepositAmount += msg.value;

        emit NewDeposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        DepositAgreement storage agreement = deposits[msg.sender];
        require((agreement.amount >= amount) && (amount > 0), "Invalid amount");

        uint256 pendingRewards = agreement.amount * cumulatedRewardsPerShare - agreement.subtractRewards;
        agreement.amount -= amount;
        agreement.subtractRewards += pendingRewards;
        totalDepositAmount -= amount;

        payable(msg.sender).transfer(amount + pendingRewards);

        emit WithdrawDeposit(msg.sender, amount, pendingRewards);
    }

    function addNewReward() external payable onlyOwner {
        cumulatedRewardsPerShare += msg.value / totalDepositAmount;

        emit NewRewards(msg.value);
    }
}
