const Block = require('./src/core/Block');
const Blockchain = require('./src/core/Blockchain');

function test() {
    let ucoinn = new Blockchain(2);
    console.info('Mining block 1 ... ');
    ucoinn.addBlock(new Block(1, '25/04/2021', { amount: 1 }));

    console.info('Mining block 2 ... ');
    ucoinn.addBlock(new Block(2, '25/04/2021', { amount: 1 }));

    console.log(ucoinn);
}

test();
