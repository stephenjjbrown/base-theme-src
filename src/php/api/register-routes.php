<?php 
/*
Plugin Name: WP-REST-API Menus
Version: 1.0
Description: Adds menu endpoints to WP REST API, which is now part of core WP.
Author: Jeff Cicero
Author URI: https://amorphouswebsolutions.com
Plugin URI: https://www.amorphouswebsolutions.com/plugins
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'WP_REST_API_MENUS_VERSION', '1.0' );
define( 'WP_REST_API_MENUS_SCHEMA', '1.0' );

/**
 * Get required dependencies. In this case we're not autoloading anything for back compat.
 */
require plugin_dir_path( __FILE__ ) . '/inc/menus-controller.php';
require plugin_dir_path( __FILE__ ) . '/inc/public-settings-controller.php';

/**
 * Get things started.
 * Hooked into by rest_api_init to register routes
 */
function wp_rest_api_menus_initialize() {
	$menusController = \Pendulum\MenusRestController::getInstance();
	$menusController->register_routes();

	$settingsController = \Pendulum\PublicSettingsRestController::getInstance();
	$settingsController->registerRoutes();
}

add_action( 'rest_api_init', 'wp_rest_api_menus_initialize' );