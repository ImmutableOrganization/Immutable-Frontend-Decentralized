import Link from 'next/link';
import { useMemo } from 'react';
import { resolve } from 'url';

export const BaseLink = ({ href, as, ...rest }) => {
	const newAs = useMemo(() => {
		let baseURI_as = as || href;

		// during compilation
		if (baseURI_as.startsWith('/')) {
			// baseURI_as = '.' + href

			// this will run in the browser
			if (typeof document !== 'undefined') {
				baseURI_as = resolve(document.baseURI, baseURI_as);
			}
		}
		// console.log(`BaseLink: ${baseURI_as}`)
		return baseURI_as;
	}, [as, href]);

	return <Link {...rest} href={href} as={newAs} />;
};
