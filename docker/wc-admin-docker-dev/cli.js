/**
 * External dependencies
 */
const yargs = require( 'yargs' );

const path = require( 'path' );
const execSync = require( 'child_process' ).execSync;
const cwd = require( 'path' ).dirname( require.main.filename );
const crypto = require( 'crypto' );

/**
 * Internal dependencies
 **/
const commands = require( './commands' );

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
	yargs.option( 'debug', {
		type: 'boolean',
		describe: 'Enable debug output.',
		default: false,
	} );

	yargs.command( {
		command: 'ssh',
		describe: 'SSH into the running container',
		handler() {
			commands.ssh( containerId );
		},
	} );

	return yargs;
};
