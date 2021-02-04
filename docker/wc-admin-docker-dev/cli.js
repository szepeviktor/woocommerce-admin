/**
 * External dependencies
 */
const yargs = require( 'yargs' ).strict();

/**
 * Internal dependencies
 **/
const commands = require( './commands' );
const run = require( './run' );
const containerId = require( './container-id' );

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
