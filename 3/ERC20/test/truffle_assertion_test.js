const MonkeyCoin = artifacts.require("MonkeyCoin");
const AssertionError = require('assertion-error');
const truffleAssert = require('truffle-assertions');

// reference to https://www.npmjs.com/package/truffle-assertions
contract("MonkeyCoin", async accounts => {

    it("should throw insufficient balance", async () => {
        const mkc = await MonkeyCoin.deployed();
        const account_one = accounts[0];
        const account_two = accounts[1];
        const amount = 10;

        await mkc.transfer(account_two, amount, { from: account_one });
        await truffleAssert.reverts(
            mkc.transfer(account_one, amount + 1, { from: account_two }),
            "ERC20: transfer amount exceeds balance"
        );
    });

    it("should revert transaction when not approved", async () => {
        const mkc = await MonkeyCoin.deployed();
        const account_one = accounts[0];
        const account_two = accounts[1];
        const account_three = accounts[2];
        const amount = 10;

        // mkc.approve(account_two, amount, { from: account_one });
        await truffleAssert.reverts(
            mkc.transferFrom(account_one, account_three, amount, { from: account_two }),
            "ERC20: transfer amount exceeds allowance"
        );
    });

    it("should receive event emitted from transfer() and transferFrom()", async () => {
        const mkc = await MonkeyCoin.deployed();
        const account_one = accounts[0];
        const account_two = accounts[1];
        const account_three = accounts[2];
        const amount = 10;

        let tx = await mkc.transfer(account_two, amount, { from: account_one });
        await truffleAssert.eventEmitted(
            tx,
            "Transfer",
            (event) => {
                assert.equal(event.from, account_one, "wrong tranfer sender");
                assert.equal(event.to, account_two, "wrong tranfer receiver");
                assert.equal(event.value, amount, "wrong tranfer amount");
                return true;
            }
        );

        await mkc.approve(account_two, amount, { from: account_one });
        let tx2 = await mkc.transferFrom(account_one, account_three, amount, { from: account_two });
        await truffleAssert.eventEmitted(
            tx2,
            "Transfer",
            (event) => {
                assert.equal(event.from, account_one, "wrong tranfer sender");
                assert.equal(event.to, account_three, "wrong tranfer receiver");
                assert.equal(event.value, amount, "wrong tranfer amount");
                return true;
            }
        );
    });

    it("should receive event emitted from approve", async () => {
        const mkc = await MonkeyCoin.deployed();
        const account_one = accounts[0];
        const account_two = accounts[1];
        const amount = 10;

        let tx = await mkc.approve(account_two, amount, { from: account_one });
        await truffleAssert.eventEmitted(
            tx,
            "Approval",
            (event) => {
                assert.equal(event.owner, account_one, "wrong approve sender");
                assert.equal(event.spender, account_two, "wrong approve receiver");
                assert.equal(event.value, amount, "wrong approve amount");
                return true;
            }
        );

    });
});