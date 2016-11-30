// update the database with this plugin
require('./lib/update')(process.argv[2]).then(
	// report the results
	() => console.log('\x1b[32m✔\x1b[0m', `"${ process.argv[2] }" was updated`) || process.exit(0),
	(error) => console.log('\n', error) || process.exit(1)
);
