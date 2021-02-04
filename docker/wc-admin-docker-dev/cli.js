/**
 * External dependencies
 */
const yargs = require( 'yargs' );

const path = require( 'path' );
const execSync = require( 'child_process' ).execSync;
const cwd = require( 'path' ).dirname( require.main.filename );

/**
 * Internal dependencies
 **/
const md5 = require( './md5' );
const commands = require( './commands' );

const configPath = path.resolve( `${ cwd }/../.wp-env.json` );
const wpEnvHash = md5( configPath );
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
