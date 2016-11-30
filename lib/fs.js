// tooling
const fs = require('fs');

// fs module then-ified, extendable, and dependency free
Object.assign(exports, fs, ...[
	'access',
	'appendFile',
	'chmod',
	'chown',
	'close',
	'exists',
	'fchmod',
	'fchown',
	'fdatasync',
	'fstat',
	'fsync',
	'ftruncate',
	'futimes',
	'lchmod',
	'lchown',
	'link',
	'lstat',
	'mkdir',
	'mkdtemp',
	'open',
	'read',
	'readdir',
	'readFile',
	'readlink',
	'realpath',
	'rename',
	'rmdir',
	'stat',
	'symlink',
	'truncate',
	'unlink',
	'utimes',
	'write',
	'write',
	'writeFile'
].map((name) => ({
	[name]: (...args) => new Promise(
		(resolve, reject) => fs[name].apply(null, args.concat(
			(error, data) => error ? reject(error) : resolve(data)
		))
	)
})));
