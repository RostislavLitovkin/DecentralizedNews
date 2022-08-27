# DecentralizedNews

Platform for saving news articles on Solana blockchain.

Available here: https://rostislavlitovkin.github.io/DecentralizedNews/#

### !! Disclaimer !!

this is just **MVP** and will be continually improved.

Currently provides all the basic functionality needed.

The program is deployed on Devnet.

### Things to improve the most:

- image input when writing new article - currently supports only entering image link
- ideally allowing the user to save the image to IPFS of some sort directly
- adding more metadata to the article it-self - like a timestamp, creater etc... or if possible, fetching it from the blockchain data it-self
- credits page
- proper governance of some sort

### Setup:

To run the already set front-end:
```
cd app
npm install
npm start
```

To build the Solana program (smart-contract):
```
anchor build
```

To test the Solana program:
```
anchor test
```

To deploy the Solana program:
```
anchor deploy
```
