import { useContext, useEffect, useState } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { Account, PopupContext } from '../../pages/_app';
import { contracts } from '../../Contracts/contract_data';
import { Frame } from '../Frame';
import { WalletOptions } from './Wallet_Options';

export const WalletHeader: React.FC = () => {
  const { setIsLoading } = useContext(PopupContext);

  const account = useAccount({});
  const [accountData, setAccountData] = useState<Account>();
  useEffect(() => {
    setAccountData(account);
  }, [account.status]);

  const { chain } = useNetwork();
  const { chains, switchNetwork, status } = useSwitchNetwork({ chainId: contracts.PostContract.networkID });

  useEffect(() => {
    if (status === 'success') {
      setIsLoading(false);
    }
    if (status === 'loading') {
      setIsLoading(true);
    }
  }, [status]);

  return !accountData?.address ? (
    <Frame headerText={'Wallet not connected'} body={() => <WalletOptions />} />
  ) : (
    <div className='header frame header-buttons'>
      {chain ? (
        <>
          {chain.name === 'Arbitrum One' ? <>Connected to {chain.name}.</> : <>Not connected to Arbitrum One.</>}
          {chains.map(
            (x) =>
              chain.name != 'Arbitrum One' && (
                <input
                  type='button'
                  className='button'
                  value={'Connect to ' + x.name}
                  disabled={!switchNetwork || x.id === chain?.id}
                  key={x.id}
                  onClick={() => switchNetwork?.(x.id)}
                />
              ),
          )}
          <div className='wrap'>{accountData.address}</div>
        </>
      ) : (
        <p>Connect to a wallet to select network</p>
      )}
    </div>
  );
};
