/**
 * External dependencies
 */
import { controls } from '@wordpress/data-controls';
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_NAME } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import * as resolvers from './resolvers';

registerStore( STORE_NAME, {
	reducer,
	actions,
	controls,
	resolvers,
	selectors,
} );

export const NAVIGATION_STORE_NAME = STORE_NAME;
