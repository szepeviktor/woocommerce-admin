/**
 * External dependencies
 */
const yargs = require( 'yargs' ).strict();
const path = require( 'path' );
const execSync = require( 'child_process' ).execSync;
const cwd = require( 'path' ).dirname( require.main.filename );
const crypto = require( 'crypto' );

/**
 * Internal dependencies
 **/
const commands = require( './commands' );
const run = require( './run' );

const configPath = path.resolve( `${ cwd }/../.wp-env.json` );
const wpEnvHash = crypto
	.createHash( 'md5' )
	.update( configPath )
	.digest( 'hex' );

const containerId = execSync(
	`docker ps -q --filter="name=^${ wpEnvHash }_wordpress"`
)
	.toString()
	.trim();

module.exports = function cli() {
	for ( const i in commands ) {
		const command = commands[ i ];
		yargs.command( {
			command: i,
			describe: command.describe,
			handler() {
				run( containerId, command.commands );
			},
		} );
	}
	return yargs;
};
