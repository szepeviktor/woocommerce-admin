/**
 * External dependencies
 **/
const execFileSync = require( 'child_process' ).execFileSync;

module.exports = function ( containerId ) {
	execFileSync( 'docker', [ 'exec', '-it', containerId, '/bin/bash' ], {
		stdio: 'inherit',
	} );
};
