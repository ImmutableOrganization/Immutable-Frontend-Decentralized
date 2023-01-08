import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: string;
  openToast: boolean;
  setOpenToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toast: React.FC<ToastProps> = ({ message, type, openToast, setOpenToast }) => {
  useEffect(() => {
    let timer1: NodeJS.Timeout;
    if (openToast && type === 'success') {
      timer1 = setTimeout(() => {
        setOpenToast(false);
      }, 1000);
    }
    if (openToast && type === 'failure') {
      timer1 = setTimeout(() => {
        setOpenToast(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timer1);
    };
  }, [message, openToast]);

  return (
    <>
      {openToast && (
        <div className='frameHeader toast'>
          <div className='toast-body'>
            <h2>{message}</h2>
            {type === 'loading' && (
              <img src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/spinner-solid.svg' className='spinner' />
            )}
            {type === 'success' && (
              <img src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/check-solid.svg' className='success check-icon' />
            )}
            {type === 'failure' && (
              <img
                src='https://gateway.pinata.cloud/ipfs/QmR3abnQmUWuS3tUWSdKMs7uSnjVtGTGSjxgYK3GgLgEgf/triangle-exclamation-solid.svg'
                className='failure exclamation-triangle'
              />
            )}
          </div>
          <input type='button' className='button' value='close' onClick={() => setOpenToast(false)} />
        </div>
      )}
    </>
  );
};
