// import Link from "next/link";
import { useEffect, useState } from 'react';
import { BaseLink } from '../BaseLink';

interface HeaderProps {
	setHeaderExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header: React.FC<HeaderProps> = ({ setHeaderExpanded }) => {
	const [selectedPage, setSelectedPage] = useState<string>('');

	useEffect(() => {
		const path_name = window.location.pathname;
		if (path_name === '/') {
			setSelectedPage('posts');
		} else if (path_name.includes('posts') || path_name.includes('post')) {
			setSelectedPage('posts');
		} else if (path_name.includes('/token')) {
			setSelectedPage('token');
		} else if (path_name.includes('/nft')) {
			setSelectedPage('nft');
		} else if (path_name.includes('/chat')) {
			setSelectedPage('chat');
		}
	}, []);

	return (
		<div className='header nav-header'>
			<a className={'button selected'} onClick={() => setHeaderExpanded(false)}>
				<h2>CLOSE</h2>
			</a>
			<BaseLink href='/' passHref={true} as={undefined}>
				<a className={'button ' + (selectedPage === 'posts' ? 'selected' : '')} onClick={() => setSelectedPage('posts')}>
					<h2>POSTS</h2>
				</a>
			</BaseLink>
			<BaseLink href='/chat' passHref={true} as={undefined}>
				<a className={'button ' + (selectedPage === 'chat' ? 'selected' : '')} onClick={() => setSelectedPage('chat')}>
					<h2>CHAT</h2>
				</a>
			</BaseLink>
			{/* <Link href="/nft" passHref={true}>
                <a className={'button ' + (selectedPage === 'nft' ? 'selected' : '')} onClick={() => setSelectedPage('nft')} ><h2>NFT</h2></a>
            </Link> */}
			<BaseLink href='/token' passHref={true} as={undefined}>
				<a className={'button ' + (selectedPage === 'token' ? 'selected' : '')} onClick={() => setSelectedPage('token')}>
					<h2>ORG</h2>
				</a>
			</BaseLink>
		</div>
	);
};

export default Header;
