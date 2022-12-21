import { Connector, useAccount, useConnect } from 'wagmi';
import { useContext, useEffect, useState } from 'react';
import { PopupContext } from '../../pages/_app';

export const WalletOptions: React.FC = () => {
  const { connect, connectors, error, isLoading, pendingConnector, status } = useConnect();
  const { setOpenToast, setToastMessage, setToastType } = useContext(PopupContext);

  const [loadedConnectors, setLoadedConnectors] = useState<Connector<unknown, unknown, unknown>[]>();
  useEffect(() => {
    setLoadedConnectors(connectors);
  }, []);

  useEffect(() => {
    if (error) {
      const connectErrorMessage = `Error connecting to ${pendingConnector?.name}.`;
      // setFormError({ open: true, message: connectErrorMessage });
      setToastMessage(connectErrorMessage);
      setOpenToast(true);
      setToastType('failure');
    }
  }, [error]);

  useEffect(() => {
    if (isLoading && status === 'loading') {
      setToastMessage(`Connecting to ${pendingConnector?.name}`);
      setOpenToast(true);
      setToastType('loading');
    }
  }, [isLoading]);

  const account = useAccount({});

  useEffect(() => {
    if (account && account.isConnected) {
      // setToastMessage(`Connected`);
      setOpenToast(false);
      // setToastType('success');
    }
  }, [account.status]);

  return (
    <>
      {loadedConnectors &&
        loadedConnectors.map(
          (connector: any) =>
            connector.name !== 'Injected' && (
              <div key={connector.id}>
                <input
                  className='button connect-button'
                  type='button'
                  disabled={!connector.ready}
                  onClick={() => connect({ connector })}
                  // value={connector.name.toLocaleUpperCase() + " Connect"}
                  value={'Connect'}
                />
              </div>
            ),
        )}
      {!loadedConnectors && <>NO CONNECTOR</>}
    </>
  );
};
