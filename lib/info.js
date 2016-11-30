// tooling
const get = require('./get');

// plugin info with npm info, npm downloads, and github info
module.exports = (name) => Promise.all([
	// npm info
	get.npmInfo(name),
	// npm downloads
	get.npmDownloads(name)
]).then(([ npmInfo, npmDownloads ]) => {
	// github username and repository
	const [ user, repo ] = npmInfo.repository.url.match(/([^/]+)\/([^/]+)\.git$/).slice(1, 3);

	// plugin info with npm info, npm downloads, and github info
	return get.githubInfo(user, repo).then(
		(githubInfo) => ({
			version: npmInfo.version,
			author: npmInfo.author,
			license: npmInfo.license,
			homepage: npmInfo.homepage,
			description: npmInfo.description,
			keywords: npmInfo.keywords,
			downloads: npmDownloads,
			stars: githubInfo.stargazers_count,
			forks: githubInfo.forks,
			dependencies: npmInfo.dependencies
		})
	);
});
