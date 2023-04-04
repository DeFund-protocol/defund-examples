import { UnversalSDK } from '@defund-protocol/v1-sdk';
import { BigNumber, Wallet, providers } from 'ethers';

const chainId = 1; // support 1 for mainnet, 5 for goerli
const alchemyKey = ''; // rpc provider key
const signerKey = '';  // fund gp or op private key
const provider = new providers.AlchemyProvider(chainId, alchemyKey); // custom rpc provider
const signer = new Wallet(signerKey, provider)
const sdk = new UnversalSDK(chainId, signer);

const fundAddress = ''; // fund address
const params = {
    "opType": "exactInput", // exactInput or exactOutput
    "tokenIn": "", // tokenIn address
    "tokenOut": "", // tokenOut address
    "amountIn": BigNumber.from(1), // amountIn for exactInput, amountInMaximum for exactOutput
    "amountOut": BigNumber.from(1), // amountOutMinimum for exactInput, amountOut for exactOutput
    "useNative": true, // if one of tokenIn or tokenOut is Weth and need use ETH balance, set true, else false
    "expiration": 1698074828
}

// options are optional
const options = {
    "gasPrice": 100, // max gas price in gwei,eg: 50 for 50gwei,
    "gasLimit": 500000,
}

console.log("Begin execution")
const tx =await sdk.executeSwap(signer.address, fundAddress, params, options);
console.log(`tx is: ${tx}`)

const result = await tx.wait()
console.log(`result is: ${result}`)
