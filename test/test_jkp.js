const Jkp  = artifacts.require("Jkp");

contract("Jkp", function() {

    it("First Player can commit his choise", async() => {
      jkp = await Jkp.deployed();
      accounts = await web3.eth.getAccounts()
      let p1 = accounts[0]
      let p2 = accounts[1]
      let p1_cmmt = "0xde9e6c1b9b83a95a27e4eef9dddeee1159d138fc54940e3b71d35ee9483eaba4";
      console.log('Player1: {'+p1+'}')
      console.log('Player2: {'+p2+'}')
      await jkp.commit_choise(p2, p1_cmmt, {from: p1});
    });

	  it("First Player can't change choise", async() => {
      jkp = await Jkp.deployed();
      accounts = await web3.eth.getAccounts()
      let p1 = accounts[0]
      let p2 = accounts[1]
      let p1_cmmt = "0xde9e6c1b9b83a95a27e4eef9dddeee1159d138fc54940e3b71d35ee9483eaba4";

      let isCaught = false;
      try {
        await jkp.commit_choise(p2, "0x123", {from: p1});
      } catch (err) {
        isCaught = true;
      }
      assert.equal(isCaught, true);
    });

    it("First Player can't reval his choise util firt player commit", async() => {
      jkp = await Jkp.deployed();
      accounts = await web3.eth.getAccounts()
      let p1 = accounts[0]
      let p2 = accounts[1]
      let p1_cmmt = "0xde9e6c1b9b83a95a27e4eef9dddeee1159d138fc54940e3b71d35ee9483eaba4";
      let p1_rvl_nonce = "0x125d01ab24c6bd2c00b9ebdc5ae23d67be0c9dcb0bab379736363e22c32d11a7";
      let p1_rvl_val = "1";

      let isCaught = false;
      try {
        await jkp.reval_choise(p2, p1_rvl_val, p1_rvl_nonce, {from: p1});
      } catch (err) {
        isCaught = true;
      }
      assert.equal(isCaught, true);
    });

    it("Second Player can commit his choise", async() => {
      jkp = await Jkp.deployed();
      accounts = await web3.eth.getAccounts()
      let p1 = accounts[0]
      let p2 = accounts[1]
      let p2_cmmt = "0xce045b9b9afd8e77617b708605729c487ecf08f02b59fae1bb2ca8d2381099e9";
      await jkp.commit_choise(p1, p2_cmmt, {from: p2});
    });

    it("First Player can't reval with wrong nonce", async() => {
      jkp = await Jkp.deployed();
      accounts = await web3.eth.getAccounts()
      let p1 = accounts[0]
      let p2 = accounts[1]
      let p1_rvl_nonce = "0x125d01ab24c6bd2c00b9ebdc5ae23d67be0c9dcb0bab379736363e22c32d11a8";
      let p1_rvl_val = "1";

      let isCaught = false;
      try {
        await jkp.reval_choise(p2, p1_rvl_val, p1_rvl_nonce, {from: p1});
      } catch (err) {
        isCaught = true;
      }
      assert.equal(isCaught, true);
    });

    it("First Player can do reval now (after p2 commit & with correct values)", async() => {
      jkp = await Jkp.deployed();
      accounts = await web3.eth.getAccounts()
      let p1 = accounts[0]
      let p2 = accounts[1]
      let p1_rvl_nonce = "0x125d01ab24c6bd2c00b9ebdc5ae23d67be0c9dcb0bab379736363e22c32d11a7";
      let p1_rvl_val = "1";
      await jkp.reval_choise(p2, p1_rvl_val, p1_rvl_nonce, {from: p1});
    });

    it("First Player can't end game until p2 reval his value", async() => {
      jkp = await Jkp.deployed();
      accounts = await web3.eth.getAccounts()
      let p1 = accounts[0]
      let p2 = accounts[1]

      let isCaught = false;
      try {
        await jkp.get_result(p2, {from: p1});
      } catch (err) {
        isCaught = true;
      }
      assert.equal(isCaught, true);
    });

    it("Second Player can do reval now (after p1 commit & with correct values)", async() => {
      jkp = await Jkp.deployed();
      accounts = await web3.eth.getAccounts()
      let p1 = accounts[0]
      let p2 = accounts[1]
      let p2_rvl_nonce = "0x509627b97c0925b2526edc81790aca26d816bb6edf9962c3e769a763dbe0d2a4";
      let p2_rvl_val = "3";
      await jkp.reval_choise(p1, p2_rvl_val, p2_rvl_nonce, {from: p2});
    });

    it("First Player can end game now. He should win.", async() => {
      jkp = await Jkp.deployed();
      accounts = await web3.eth.getAccounts()
      let p1 = accounts[0]
      let p2 = accounts[1]

      result = await jkp.get_result(p2, {from: p1});
      result_data = result.logs[0].args['_result']
      console.log('Game result: {'+result_data+'}')
      assert.equal(result_data, 0);
    });

    it("Second Player can end game now. He should lose.", async() => {
      jkp = await Jkp.deployed();
      accounts = await web3.eth.getAccounts()
      let p1 = accounts[0]
      let p2 = accounts[1]

      result = await jkp.get_result(p1, {from: p2});
      result_data = result.logs[0].args['_result']
      console.log('Game result: {'+result_data+'}')
      assert.equal(result_data, 1);
    });

});
