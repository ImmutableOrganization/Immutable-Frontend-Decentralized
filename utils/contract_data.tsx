
interface IContractData {
    TokenContract: {
        address: string;
    },
    Goerli: {
        address: string,
        networkID: number
    },
    PostContract: {
        address: string,
        chain: string,
        blockExplorer: string,
        networkID: number
    }
    Mainnet: {
        address: string,
    }
    abi: {
        BoardContract: any,
    }
}

export const default_chain = () => {
    return { id: contracts.PostContract.networkID, name: contracts.PostContract.chain };
}

export const contract_exists_on_chain = (chain_name: string) => {
    switch (chain_name.toLowerCase()) {
        case 'goerli':
            return true;
        default:
            return false;
    }
}

export const chainID_from_chain_name = (chain_name: string) => {
    switch (chain_name.toLowerCase()) {
        case 'goerli':
            return contracts.Goerli.networkID;
        default:
            return undefined;
    }
}


export const contracts: IContractData = {
    TokenContract: {
        address: "0xd7D8f486ebB333ee1CCD4859D12778F5D7F60bd7",
    },
    Goerli: {
        address: '0x9B81844CD15BCdbec4EC9E16C1c0018A522D9522',
        networkID: 5
    },
    PostContract: {
        address: '0x85D8a0287a12F2C4eFc92EabE11dFcCe2fCCe0Fc',
        blockExplorer: 'https://arbiscan.io/address/0x85d8a0287a12f2c4efc92eabe11dfcce2fcce0fc',
        chain: "Arbitrum One",
        networkID: 42161
    },
    Mainnet: {
        address: 'Not Implemented'
    },
    abi: {
        BoardContract: require('../abi/PostContract.json').abi,
    }
}