import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const ipfsMatchBaseElement = `
(function () {
  const { pathname } = window.location
  const ipfsMatch = /.*\\/Qm\\w{44}\\//.exec(pathname)
  const base = document.createElement('base')
  base.href = ipfsMatch ? ipfsMatch[0] : '/'
  document.head.append(base)
})();
`;

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<Script dangerouslySetInnerHTML={{ __html: ipfsMatchBaseElement }} />
					<link rel='shortcut icon' href='https://ipfs.io/ipfs/Qmes8Ycb9JCLG9Ny2xeJxCFY7kSpyDfATEdgmncQ4TPVEs?filename=token.svg' />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
