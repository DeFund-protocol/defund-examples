import { UniversalSDK } from '@defund-protocol/v1-sdk';
import { BigNumber, Wallet, providers } from 'ethers';

const chainId = 5;
const provider = new providers.JsonRpcProvider('your rpc url'); // custom rpc provider
const signer = new Wallet('your signer private key', provider)
const sdk = new UniversalSDK(chainId, signer);

const fundAddress = 'your fund address';

/*
*  Swap
*/
const swapParams = {
    "opType": "exactInput",
    "tokenIn": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH Address on mainnet
    "tokenOut": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC Address on mainnet
    "amountIn": BigNumber.from('100000000000000000'), // 0.1 ETH
    "amountOut": BigNumber.from('1000000'), // 1 USDC
    "useNative": true, // use ETH
    "expiration": Math.round(new Date().getTime() / 1000 + 10 * 60), // expires in 10 minutes
}

console.log("Begin swap")
const swapTx = await sdk.executeSwap(signer.address, fundAddress, swapParams);
console.log("swapTx is:", swapTx)

const swapResult = await swapTx.wait()
console.log("swap result is:", swapResult)

/*
* AssetsConvert
*/
const convertParams = {
    ratio: 1000, // 10% of tokenIn
    tokenIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC Address on mainnet
    tokenOut: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // UNI Address on mainnet
}

console.log("Begin convert")
const convertTx = await sdk.executeAssetsConvert(signer.address, fundAddress, convertParams);
console.log("convert tx is:", convertTx)

const convertResult = await convertTx.wait()
console.log("convert result is:", convertResult)
