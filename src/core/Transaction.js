class Transaction {
    constructor(from, to, amount, timestamp) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.timestamp = timestamp;
    }
}

module.exports = Transaction;