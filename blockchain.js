
//TODO: TimeSteap - Time and date when the block is created.
//TODO: index - position of the current block.
// TODO: transactions - transactional data of the current block. - it will be an array as because a block can have multiple transactions.
// TODO: previousHash - the hash of the previous Block.


// javascript for a demonstration of blockchain.

const SHA256 = require("crypto-js/sha256");


class Transaction{ // like a bank transaction.
    constructor(fromAddress, toAddress,amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}


class Block {
    constructor(timestap, transactions, previousHash = '') {

        this.timestap = timestap;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
        
    }


    // the hash is the calculated hash of the block.

    calculateHash() {
        // we will be using SHA256 cyptograhioc function to generate the hash of this block



        // converting the transactions of this block into JSON format and then adding it to with timestamp, index, and previoushash to make a hash of this block

        // SHA256 will return an object. so to convert it to string we used .tostring() function.
        return SHA256( this.timestap + this.previousHash + JSON.stringify(this.transactions)+this.nonce).toString();

    }



    mineNewBlock(difficulty){ // for difficulty = 5
        while(this.hash.substring(0,difficulty) !== new Array(difficulty+1).join("0")){
            // it will run until this condition...
            //e4029cc81a5a229759eb5934d76ff4f614a33201941c0713df72410ebb7b430f !== 00000cc81a5a229759eb5934d76ff4f614a33201941c0713df72410ebb7b430f
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(typeof(difficulty));
        // console.log("Mined a new block with hash : "+this.hash);
    }




}


class Blockchain {
    constructor() {
        // the first variable of the array will be the genesis block , created manually.
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactios = [];
        this.miningReward = 10;

    }

    createGenesisBlock() {
        return new Block( "01/01/2018", "This is the genesis block", "0");
    }

    //new block object
    //the hash of the previous block
    // calculate the hash of current block.

    getPreviousBlock() {
        return this.chain[this.chain.length - 1]; // returning the previous block
    }

    // addBlock can only add one block but now we need to add multiple blocks.


    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getPreviousBlock().hash;
    //     // newBlock.hash = newBlock.calculateHash();
    //     newBlock.mineNewBlock(this.difficulty);
    //     this.chain.push(newBlock); // pushing the newblock into the array of blockchain.
    // }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(),this.pendingTransactios,this.getPreviousBlock().hash);
        block.mineNewBlock(this.difficulty);
        console.log("Blocked Mine successfully");
        this.chain.push(block);
        this.pendingTransactios = [
            new Transaction(null,miningRewardAddress,this.miningReward)   //! and this is used to clear the array and This is used to reward the miningReward address.
        ];

    }
    createTransaction(transaction){
        this.pendingTransactios.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
                if(trans.toAddress === address){
                    balance += trans.amount;
                }

            }
        }
        return balance;
    }


    // ! Security measures in blockchain.
    // ?? check for two things - Hash of current block ( is a valid)  - the integrity of the hash of current block
    // ?? if the previous hash is actually the hash of the previous block.


    // TODO: Seacurity mechanism -  #1. Tampering check....

    checkBlockChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            // const previousHash = this.chain[i].previousHash;
            //const Hash = this.chain[i-1].hash;

            const currentBlock = this.chain[i];
            const PrevBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== PrevBlock.hash) {
                return false;
            }

        }
        return true;
    }

}



// // creating two new blocks.
// let block1 = new Block( "02/01/2023", { mybalance: 100 })
// let block2 = new Block("03/01/2023", { mybalance: 500 })

// // creating a blockchain.
// let MyBlockchain = new Blockchain();

// // Adding two blocks to the blockchain.

// console.log("The first block creation");
// MyBlockchain.addBlock(block1);
// console.log("The second block creation");
// MyBlockchain.addBlock(block2);

// //consolinging.

// console.log(JSON.stringify(MyBlockchain, null, 4));

// console.log("Validation check for the blockchain: "+ MyBlockchain.checkBlockChainValid());


//??Tampering with Data.

// MyBlockchain.chain[1].transactions = {mybalance:134560}
// console.log("Validation check for the blockchain: "+ MyBlockchain.checkBlockChainValid());


// console.log("Blockchain validation check: : ");
// console.log(JSON.stringify(MyBlockchain, null, 4));


// security measures.


// TODO: Seacurity mechanism -  #2. Proof of work...

// making the process of creating or adding a new block to the blockchain difficult/slow.




let sahuCoin = new Blockchain();
var transactions1 = new Transaction("Tom","Jerry",100);
sahuCoin.createTransaction(transactions1);

var transactions2 = new Transaction("Jerry","Tom",30);
sahuCoin.createTransaction(transactions2);


console.log("Started mining by the miner....");
sahuCoin.minePendingTransactions("Donald");
console.log("Balance for tom is: "+sahuCoin.getBalanceOfAddress("Tom"));
console.log("Balance for Jerry is: "+sahuCoin.getBalanceOfAddress("Jerry"));
console.log("Balance for Donald is: "+sahuCoin.getBalanceOfAddress("Donald"));


console.log("Started again mining by the miner....");
sahuCoin.minePendingTransactions("Donald");
sahuCoin.minePendingTransactions("Donald");
console.log("Balance for Donald is: "+sahuCoin.getBalanceOfAddress("Donald"));