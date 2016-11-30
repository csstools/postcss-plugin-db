// tooling
const fs   = require('./fs');
const info = require('./info');
const path = require('path');

// database directory
const pathToPlugin = path.resolve(path.dirname(__dirname), 'database.json');

// update database with plugin info
module.exports = (name) => Promise.all([
	// plugin info
	info(name),
	// database read from database.json
	fs.readFile(pathToPlugin).then(
		(content) => JSON.parse(content)
	)
]).then(
	// database updated with the plugin info
	([ pluginInfo, database ]) => Object.assign(database, {
		[name]: pluginInfo
	})
).then(
	// database sorted by key
	(database) => Object.assign(
		...Object.keys(database).sort().map(
			(key) => ({
				[key]: database[key]
			})
		)
	)
).then(
	// stringified database
	(database) => JSON.stringify(database, null, '  ')
).then(
	// database written to database.json
	(content) => fs.writeFile(pathToPlugin, content + '\n')
);
