// // i only need this for local build
// // i need to disable this when uploaded to ipfs
// const replace = require('replace-in-file');
// const options = {
//     //you may need to modify the file address to suite your project
//     files: ['./out/token/index.html',
//         './out/404/index.html',
//         './out/chat/index.html',
//         './out/nft/index.html',
//         './out/whitepaper/index.html'],
//     from: [/src="\./g, /href="\./g],
//     to: ['src="..', 'href="..'],
// };
// (async function () {
//     try {
//         const results = await replace(options);
//         console.log('Replacement results:', results);
//     } catch (error) {
//         console.error('Error occurred:', error);
//     }
// })();
