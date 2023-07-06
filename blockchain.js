
// TimeSteap - Time and date when the block is created.
// index - position of the current block.
// data - transaction data of the current block.
// previousHash - the hash of the previous Block.


// javascript for a demonstration of blockchain.

const SHA256 = require("crypto-js/sha256");



class Block{
    constructor(index,timestap, data, previousHash = ''){

        this.index = index;
        this.timestap = timestap;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }


    // the hash is the calculated hash of the block.

    calculateHash(){
        // we will be using SHA256 cyptograhioc function to generate the hash of this block



        // converting the data of this block into JSON format and then adding it to with timestamp, index, and previoushash to make a hash of this block

        // SHA256 will return an object. so to convert it to string we used .tostring() function.
        return SHA256(this.index+this.timestap+this.previousHash+JSON.stringify(this.data)).toString(); 
        
    }
    


   
}


class Blockchain{
    constructor(){
        // the first variable of the array will be the genesis block , created manually.
        this.chain = [this.createGenesisBlock()];

    }

    createGenesisBlock(){
        return new Block(0,"01/01/2018","This is the genesis block","0");
    }

    //new block object
    //the hash of the previous block
    // calculate the hash of current block.

    getPreviousBlock(){
        return this.chain[this.chain.length-1]; // returning the previous block
    }


    addBlock(newBlock){
        newBlock.previousHash = this.getPreviousBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock); // pushing the newblock into the array of blockchain.
    }
}



// creating two new blocks.
let block1 = new Block(1,"02/01/2023",{mybalance:100})
let block2 = new Block(2,"03/01/2023",{mybalance:500})

// creating a blockchain.
let MyBlockchain = new Blockchain();

// Adding two blocks to the blockchain.
MyBlockchain.addBlock(block1);
MyBlockchain.addBlock(block2);

//consolinging.

console.log(JSON.stringify(MyBlockchain,null,4));