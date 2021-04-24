const Block = require('./Block');
const Transaction = require('./Transaction');

class Blockchain {
    constructor(diffuculty = 5) {
        // The difficulty means the hash should have predefined number of zeros at the beginning. It makes the adding new block harder.
        this.diffuculty = diffuculty;
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block('02/01/1992', 'Genesis Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     *
     *  @deprecated don't use it, it is just the simplest example to understand the concept
     * // TODO: should be removed.
     */
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.diffuculty);
        this.chain.push(newBlock);
    }

    /**
     *
     * @param {*} miningRewardAddress address of the wallet which the reward coins will be sent.
     */
    minePendingTransactions(miningRewardAddress) {
        // In real world, it is not possible to adding all pendingTransactions to the block.
        // Because the block size cannot increase 1MB, generally miners just select which transactions are include and which are not.
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.diffuculty);
        this.chain.push(block);

        // create a new transaction as reward
        // It means miner will get the reward after the next mining is done.
        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceofAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.from === address) {
                    balance -= transaction.amount;
                }
                if (transaction.to === address) {
                    balance += transaction.amount;
                }
            }
        }
        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash != currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;
