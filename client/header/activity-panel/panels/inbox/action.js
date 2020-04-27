/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import PropTypes from 'prop-types';

/**
 * WooCommerce dependencies
 */
import { ADMIN_URL as adminUrl } from '@woocommerce/wc-admin-settings';

/**
 * Internal dependencies
 */

class InboxNoteAction extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			inAction: false,
		};

		this.handleActionClick = this.handleActionClick.bind( this );
	}

	handleActionClick( event ) {
		const {
			action,
			actionCallback,
			dismissType,
			noteId,
			triggerNoteAction,
		} = this.props;
		const href = event.target.href || '';
		let inAction = true;

		if ( href.length && ! href.startsWith( adminUrl ) ) {
			event.preventDefault();
			inAction = false; // link buttons shouldn't be "busy".
			window.open( href, '_blank' );
		}

		if ( dismissType ) {
			// updateNote( noteId, { deleted: true } );
			actionCallback();
		} else {
			this.setState( { inAction }, () =>
				triggerNoteAction( noteId, action.id )
			);
		}
	}

	render() {
		const { action, dismiss, label } = this.props;
		return (
			<Button
				isDefault
				isPrimary={ dismiss || action.primary }
				isBusy={ this.state.inAction }
				disabled={ this.state.inAction }
				href={ action ? action.url : undefined }
				onClick={ this.handleActionClick }
			>
				{ dismiss ? label : action.label }
			</Button>
		);
	}
}

InboxNoteAction.propTypes = {
	noteId: PropTypes.number,
	noteName: PropTypes.string,
	label: PropTypes.string,
	dismiss: PropTypes.bool,
	dismissType: PropTypes.string,
	actionCallback: PropTypes.func,
	action: PropTypes.shape( {
		id: PropTypes.number.isRequired,
		url: PropTypes.string,
		label: PropTypes.string.isRequired,
		primary: PropTypes.bool.isRequired,
	} ),
};

export default compose(
	withDispatch( ( dispatch ) => {
		const { triggerNoteAction, updateNote } = dispatch( 'wc-api' );

		return {
			triggerNoteAction,
			updateNote,
		};
	} )
)( InboxNoteAction );
