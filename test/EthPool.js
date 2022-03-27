const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Contract EthPool", () => {
    beforeEach(async () => {
        [admin, userA, userB] = await ethers.getSigners()

        EthPool = await ethers.getContractFactory("EthPool")
        ethPool = await EthPool.deploy()
    })

    describe("Deployment", () => {
        it("should assign the correct admin(team) address", async () => {
            _admin = await ethPool.owner()
            expect(_admin).to.equal(admin.address)
        })
    })

    describe("User", () => {
        it("should not be able to deposit multiple times without withdraw", async () => {
            await ethPool.connect(userA).deposit({value: ethers.utils.parseEther("100")})
            await expect(ethPool.connect(userA).deposit({value: ethers.utils.parseEther("100")})).to.be
                .revertedWith("Not allowed multiple deposit")

            await ethPool.connect(userA).withdraw()
        })

        it("should get valid rewards", async () => {
            prevABalance = await userA.getBalance()
            prevBBalance = await userB.getBalance()

            await ethPool.connect(userA).deposit({value: ethers.utils.parseEther("100")})
            await ethPool.connect(userB).deposit({value: ethers.utils.parseEther("300")})

            await ethPool.connect(admin).addNewReward({value: ethers.utils.parseEther("200")})

            // await ethPool.connect(userA).withdraw()  // 100 + 50
            await ethPool.connect(userB).withdraw() // 300 + 150

            await ethPool.connect(admin).addNewReward({value: ethers.utils.parseEther("100")})
            await ethPool.connect(userA).withdraw()  // 100 + 50 + 100

            currentABalance = await userA.getBalance()
            currentBBalance = await userB.getBalance()

            console.log("userA balance: ", currentABalance.sub(prevABalance).toString())
            console.log("userB balance: ", currentBBalance.sub(prevBBalance).toString())
        })
    })
})