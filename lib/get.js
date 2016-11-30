// tooling
const https = require('https');
const url = require('url');

// get json response from https url
module.exports = (location) => new Promise(
	(resolve, reject) => https.get(Object.assign(url.parse(location), {
		headers: {
			'Accept': 'application/vnd.github.v3+json',
			'User-Agent': 'https://github.com/jonathantneal/postcss-db'
		}
	}), (response) => {
		let body = '';

		response.on('data', (chunk) => {
			body += chunk;
		});

		response.on('end', () => resolve(JSON.parse(body)));
	}).on('error', reject)
);

Object.assign(module.exports, {
	// npm info
	npmInfo: (name) => module.exports(`https://registry.npmjs.org/${ name }/latest`),
	// npm readme
	npmReadme: (name) => module.exports(`https://registry.npmjs.org/${ name }`).then((data) => data.readme),
	// npm downloads
	npmDownloads: (name) => module.exports(`https://api.npmjs.org/downloads/range/1000-01-01:2100-01-01/${ name }`).then((data) => data.downloads.reduce((count, download) => count + download.downloads, 0)),
	// github info
	githubInfo: (user, name) => module.exports(`https://api.github.com/repos/${ user }/${ name }`)
});
