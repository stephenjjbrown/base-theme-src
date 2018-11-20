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
class MenusRestController extends WP_REST_Controller {

	/**
	 * @var string $namespace
	 */
	protected $namespace = 'wp-menus/v1';
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
	public function register_routes() {
		register_rest_route( $this->namespace, '/menus', array(
			'methods' => \WP_REST_Server::READABLE,
			'callback' => [$this, 'get_all_menus']
		));
		register_rest_route( $this->namespace, '/menus/(?P<id>[a-zA-Z0-9(-]+)', array(
			'methods' => \WP_REST_Server::READABLE,
			'callback' => [$this, 'get_menu_data'],
		) );
	}

	/**
	 * Get all registered menus
	 *
	 * @return array List of menus with slug and description
	 */
	public function get_all_menus() {
		$menus = [];

		foreach ( get_registered_nav_menus() as $slug => $description ) {
			$obj = new \stdClass;
			$obj->slug = $slug;
			$obj->description = $description;
			$menus[] = $obj;
		}

		return $menus;
	}

	/**
	 * @param \WP_REST_Request $request
	 * - $request has <id> parameter as found in $wpdb_prefix_terms table as term_id column
	 * - slug column is queried
	 *
	 * @return mixed|\WP_REST_Response
	 */
	public function get_menu_data( \WP_REST_Request $request ) {
		$menuId = $request->get_param( 'id' );

//		$cache_key = 'test_menu_cache_' . $menuId;
//		$cached_result = wp_cache_get( $cache_key );
//		if ($cached_result) {
//			return rest_ensure_response( $cached_result );
//		}

		$menu_data = [];
		$menu_locations = get_nav_menu_locations();
		if ( $menu_locations && isset( $menu_locations[ $menuId ] ) ) {
			$menu_term = get_term( $menu_locations[ $menuId ] );

			if ($menu_term) {
				$menu_data = wp_get_nav_menu_items( $menu_term->term_id );
			}
		}

		$items = array_map(function($item) {
			return [
				'title' => $item->title,
				'url' => $item->url
			];
		}, $menu_data);

		//wp_cache_set( $cache_key, $items );

		return rest_ensure_response( $items );
	}
}