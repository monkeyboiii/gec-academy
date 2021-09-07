const MonkeyCoin = artifacts.require("MonkeyCoin");

// reference to https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
contract("MonkeyCoin", async accounts => {
    it("should set the token name correctly", async () => {
        const mkc = await MonkeyCoin.deployed();

        assert.equal(await mkc.name(), "MonkeyCoin");
    });

    it("should set initial balance of creator correctly", async () => {
        const mkc = await MonkeyCoin.deployed();
        const balance = await mkc.balanceOf.call(accounts[0]);

        assert.equal(balance.toNumber(), 1000);
    });

    it("should transfer tokens correctly", async () => {
        const mkc = await MonkeyCoin.deployed();
        const account_one = accounts[0];
        const account_two = accounts[1];
        const amount = 10;
        let balance;

        balance = await mkc.balanceOf.call(account_one);
        const account_one_starting_balance = balance.toNumber();

        balance = await mkc.balanceOf.call(account_two);
        const account_two_starting_balance = balance.toNumber();

        await mkc.transfer(account_two, amount, { from: account_one });

        balance = await mkc.balanceOf.call(account_one);
        const account_one_ending_balance = balance.toNumber();

        balance = await mkc.balanceOf.call(account_two);
        const account_two_ending_balance = balance.toNumber();

        assert.equal(
            account_one_ending_balance,
            account_one_starting_balance - amount,
            "Amount wasn't correctly taken from the sender"
        );
        assert.equal(
            account_two_ending_balance,
            account_two_starting_balance + amount,
            "Amount wasn't correctly sent to the receiver"
        );
    });

    it("should set and read allowance", async () => {
        const mkc = await MonkeyCoin.deployed();
        const account_one = accounts[0];
        const account_two = accounts[1];
        const amount = 10;

        await mkc.approve(account_two, amount, { from: account_one });
        let allowance = await mkc.allowance(account_one, account_two, { from: account_one });

        assert.equal(
            allowance.toNumber(),
            amount,
            "Allowance amount wasn't correctly set for the sender and receiver"
        );
    });

    it("should allow transfer on behave if approved", async () => {
        const mkc = await MonkeyCoin.deployed();
        const account_one = accounts[0];
        const account_two = accounts[1];
        const account_three = accounts[2];
        const amount = 10;
        let balance;

        balance = await mkc.balanceOf.call(account_one);
        const account_one_starting_balance = balance.toNumber();

        balance = await mkc.balanceOf.call(account_two);
        const account_two_starting_balance = balance.toNumber();

        balance = await mkc.balanceOf.call(account_three);
        const account_three_starting_balance = balance.toNumber();

        await mkc.approve(account_two, amount, { from: account_one });
        await mkc.transferFrom(account_one, account_three, amount, { from: account_two });

        balance = await mkc.balanceOf.call(account_one);
        const account_one_ending_balance = balance.toNumber();

        balance = await mkc.balanceOf.call(account_two);
        const account_two_ending_balance = balance.toNumber();

        balance = await mkc.balanceOf.call(account_two);
        const account_three_ending_balance = balance.toNumber();

        assert.equal(
            account_one_ending_balance,
            account_one_starting_balance - amount,
            "Amount wasn't correctly taken from the sender"
        );
        assert.equal(
            account_two_starting_balance,
            account_two_ending_balance,
            "Amount wasn't equal in the proxy"
        );
        assert.equal(
            account_three_ending_balance,
            account_three_starting_balance + amount,
            "Amount wasn't correctly sent to the receiver"
        );
    });

});