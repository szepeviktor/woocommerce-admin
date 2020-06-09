<?php
/**
 * Rule processor for sending after a specified date/time.
 *
 * @package WooCommerce Admin/Classes;
 */

namespace Automattic\WooCommerce\Admin\RemoteInboxNotifications;

defined( 'ABSPATH' ) || exit;

use \Automattic\WooCommerce\Admin\DateTimeProvider\CurrentDateTimeProvider;

/**
 * Rule processor for sending after a specified date/time.
 */
class PublishAfterTimeRuleProcessor implements RuleProcessorInterface {
	/**
	 * Constructor.
	 *
	 * @param DateTimeProviderInterface $date_time_provider The DateTime provider.
	 */
	public function __construct( $date_time_provider = null ) {
		$this->date_time_provider = null === $date_time_provider
			? new CurrentDateTimeProvider()
			: $date_time_provider;
	}

	/**
	 * Process the rule.
	 *
	 * @param object $rule The specific rule being processed by this rule processor.
	 *
	 * @return bool Whether the rule passes or not.
	 */
	public function process( $rule ) {
		return $this->date_time_provider->get_now() >= new \DateTime( $rule->publish_after );
	}

	/**
	 * Validates the rule.
	 *
	 * @param object $rule The rule to validate.
	 *
	 * @return bool Pass/fail.
	 */
	public function validate( $rule ) {
		if ( ! isset( $rule->publish_after ) ) {
			return false;
		}

		return true;
	}
}