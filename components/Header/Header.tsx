// import Link from "next/link";
import { useEffect, useState } from 'react';
import { BaseLink } from '../BaseLink';

interface HeaderProps {}
const Header: React.FC<HeaderProps> = ({}) => {
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [headerExpanded, setHeaderExpanded] = useState<boolean>(false);

  useEffect(() => {
    const path_name = window.location.pathname;
    if (path_name === '/') {
      setSelectedPage('immutable');
    } else if (path_name.includes('immutable') || path_name.includes('post')) {
      setSelectedPage('immutable');
    } else if (path_name.includes('/token')) {
      setSelectedPage('token');
    } else if (path_name.includes('/nft')) {
      setSelectedPage('nft');
    } else if (path_name.includes('/peertopeer')) {
      setSelectedPage('peertopeer');
    } else if (path_name.includes('/buy')) {
      setSelectedPage('buy');
    }
  }, []);

  const wrapHeaderButton = (_page: string, _dispatcher: React.Dispatch<React.SetStateAction<string>>) => {
    if (_page === selectedPage && headerExpanded) {
      setHeaderExpanded(false);
    }
    _dispatcher(_page);
  };

  return (
    <div className={`header nav-header ${!headerExpanded ? 'expanded' : 'menu-transition"'}`}>
      {headerExpanded ? (
        <>
          <a className={'button selected'} onClick={() => setHeaderExpanded(false)}>
            <h2>CLOSE</h2>
          </a>
          <BaseLink href='/' passHref={true} as={undefined}>
            <a className={'button ' + (selectedPage === 'immutable' ? 'selected' : '')} onClick={() => wrapHeaderButton('immutable', setSelectedPage)}>
              <h2>immutable</h2>
            </a>
          </BaseLink>
          <BaseLink href='/peertopeer' passHref={true} as={undefined}>
            <a className={'button ' + (selectedPage === 'peertopeer' ? 'selected' : '')} onClick={() => wrapHeaderButton('peertopeer', setSelectedPage)}>
              <h2>PEER 2 PEER</h2>
            </a>
          </BaseLink>
          <BaseLink href='/token' passHref={true} as={undefined}>
            <a className={'button ' + (selectedPage === 'token' ? 'selected' : '')} onClick={() => wrapHeaderButton('token', setSelectedPage)}>
              <h2>ORG</h2>
            </a>
          </BaseLink>
          <BaseLink href='/whitepaper' passHref={true} as={undefined}>
            <a className={'button ' + (selectedPage === 'whitepaper' ? 'selected' : '')} onClick={() => wrapHeaderButton('whitepaper', setSelectedPage)}>
              <h2>WHITEPAPER</h2>
            </a>
          </BaseLink>
          <BaseLink href='/buy' passHref={true} as={undefined}>
            <a className={'button ' + (selectedPage === 'buy' ? 'selected' : '')} onClick={() => wrapHeaderButton('buy', setSelectedPage)}>
              <h2>BUY</h2>
            </a>
          </BaseLink>
        </>
      ) : (
        <>
          <a className={'button selected'} onClick={() => setHeaderExpanded(true)}>
            <h2>MENU</h2>
          </a>
        </>
      )}
    </div>
  );
};

export default Header;
