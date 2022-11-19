export const addToken = async () => {
    const tokenAddress = '0xA3847dDbC97C6D3AcD265f0A42B3b885e5f8865e';
    const tokenSymbol = 'IMT';
    const tokenDecimals = 18;
    const tokenImage = 'https://ipfs.io/ipfs/QmRneeRA2sNoNDvctwahPUNSa4jKetGobzN97YwP1LsvRd?filename=token.png';

    try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        //@ts-ignore
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address: tokenAddress, // The address that the token is at.
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: tokenDecimals, // The number of decimals in the token
                    image: tokenImage, // A string url of the token logo
                },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
    } catch (error) {
        console.log(error);
    }
}

export const addTokenArbitrum = async () => {
    const tokenAddress = '0x17482Fae07cF2fF29233C4c4e29B5deF5130B7a1';
    const tokenSymbol = 'IMT';
    const tokenDecimals = 18;
    const tokenImage = 'https://ipfs.io/ipfs/QmRneeRA2sNoNDvctwahPUNSa4jKetGobzN97YwP1LsvRd?filename=token.png';

    try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        //@ts-ignore
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address: tokenAddress, // The address that the token is at.
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: tokenDecimals, // The number of decimals in the token
                    image: tokenImage, // A string url of the token logo
                },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
    } catch (error) {
        console.log(error);
    }
}
export const addUSDCArbitrum = async () => {
    const tokenAddress = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8';
    const tokenSymbol = 'USDC';
    const tokenDecimals = 6;
    const tokenImage = 'https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/usdc.svg';

    try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        //@ts-ignore
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address: tokenAddress, // The address that the token is at.
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: tokenDecimals, // The number of decimals in the token
                    image: tokenImage, // A string url of the token logo
                },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
    } catch (error) {
        console.log(error);
    }
}

export const switchToArbitrum = async () => {


    try {
        //@ts-ignore
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xA4B1' }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                //@ts-ignore
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0xA4B1',
                            chainName: 'Arbitrum One',
                            nativeCurrency: {
                                name: 'Ether',
                                symbol: 'ETH',
                                decimals: 18,
                            },
                            rpcUrls: ['https://arb1.arbitrum.io/rpc'],
                            blockExplorerUrls: ['https://arbiscan.io/'],
                        },
                    ],
                });
            } catch (addError) {
                // handle "add" error
            }
        }
        // handle other "switch" errors
    }
}