<?php

namespace Pendulum;

use WP_REST_Controller;

/**
 * Class WP_REST_API_Menus_Controller
 *
 * Extends abstract WP_REST_Controller class as a guide. We're actually only
 * overriding the register_routes method.
 *
 * @package Amorphous
 */
class PublicSettingsRestController extends WP_REST_Controller {

	/**
	 * @var string $namespace
	 */
	protected $namespace = 'bt-api/v1';
	/**
	 * @var MenusRestController
	 */
	protected static $instance;

	/**
	 * Get instance of class in the singleton pattern
	 *
	 * @return MenusRestController
	 */
	public static function getInstance() {
		if ( self::$instance === NULL ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Register the routes. Leaving permissions callback and args parameters to their
	 * defaults for now.
	 */
	public function registerRoutes() {
		register_rest_route( $this->namespace, '/public-settings', [
			[
				'methods' => \WP_REST_Server::READABLE,
				'callback' => [$this, 'getPublicSettings']
			],
			[
				'methods' => \WP_REST_Server::EDITABLE,
				'callback' => [$this, 'setPublicSettings'],
				'permission_callback' => function() { return current_user_can('manage_options'); }
			]
		]);
	}



	/**
	 * @param \WP_REST_Request $request
	 * - $request has <id> parameter as found in $wpdb_prefix_terms table as term_id column
	 * - slug column is queried
	 *
	 * @return mixed|\WP_REST_Response
	 */
	public function getPublicSettings(\WP_REST_Request $request) {
		return rest_ensure_response(get_option('base-theme-settings') );
	}

	public function setPublicSettings(\WP_REST_Request $request) {
		$success = update_option('base-theme-settings', json_decode($request->get_body()));

		return rest_ensure_response(['success' => $success]);
	}
}