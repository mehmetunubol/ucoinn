const Block = require('./src/core/Block');
const Blockchain = require('./src/core/Blockchain');
const Transaction = require('./src/core/Transaction');

function test() {
    let ucoinn = new Blockchain(2);
    console.info('Mining block 1 ... ');
    ucoinn.addBlock(new Block(1, '25/04/2021', { amount: 1 }));

    console.info('Mining block 2 ... ');
    ucoinn.addBlock(new Block(2, '25/04/2021', { amount: 1 }));

    console.log(ucoinn);
}

function test2() {
    let ucoinn = new Blockchain(2);
    ucoinn.createTransaction(new Transaction('add1', "add2", 100));
    ucoinn.createTransaction(new Transaction('add2', "add1", 50));

    console.log("Starting the miner...");
    ucoinn.minePendingTransactions('minersAddress');
    console.log("Starting the miner again...");
    ucoinn.minePendingTransactions('minersAddress');
    console.log(ucoinn);
}
//test();
test2();
