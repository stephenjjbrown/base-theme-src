<?php
/**
 * Base-theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Base-theme
 */

if ( ! function_exists( 'base_theme_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
 	function base_theme_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Base-theme, use a find and replace
		 * to change 'base-theme' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'base-theme', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'top-navigation' => esc_html__( 'Primary', 'base-theme' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'base_theme_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'base_theme_setup' );












/**
 * 
 */
function baseThemeAdminOptionsPage() { ?>
	<bt-theme-settings></bt-theme-settings>
<?php }


/**
 * 
 */
function baseThemeMenuOptions() {
	add_theme_page('Base Theme Settings', 'Base Theme Settings', 'edit_theme_options', 'base-theme-settings', 'baseThemeAdminOptionsPage');
}
add_action('admin_menu', 'baseThemeMenuOptions');


/**
 * 
 */
function baseThemeRegisterSettings() {
	// update_option( 'base-theme-settings', ['thing' => '500']);
	// register_setting( 'general', 'base-theme-settings', [
	// 	'show_in_rest' => true,
	// 	['thing' => 30]
	// ]);
}
add_action('admin_init', 'baseThemeRegisterSettings');


/**
 * 
 */
function baseThemeSettingsPageScripts($hook) {
	if ($hook !== 'appearance_page_base-theme-settings')
		return;

	?>
		<script>
			var wpApiSettings = <?php echo json_encode(
				[
					'restUrl' => esc_url_raw(rest_url()),
					'nonce' => wp_create_nonce('wp_rest')
				]);
			?>
		</script>
	<?php

	wp_enqueue_script('base-theme-settings-page', get_template_directory_uri() . '/js/theme-settings.js', [], null, true);
}
add_action( 'admin_enqueue_scripts', 'baseThemeSettingsPageScripts' );




















/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function base_theme_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'base_theme_content_width', 640 );
}
add_action( 'after_setup_theme', 'base_theme_content_width', 0 );



/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function base_theme_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'base-theme' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'base-theme' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'base_theme_widgets_init' );



/**
 * Enqueue scripts and styles. x
 */
function base_theme_scripts() {
	wp_enqueue_style( 'base-theme-style', get_stylesheet_uri() );

	wp_enqueue_script('base-theme-main', get_template_directory_uri() . '/js/main.js', ['wp-element'], null, true);

	wp_enqueue_script( 'base-theme-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'base-theme-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'base_theme_scripts' );


/**
 * Register custom blocks
 */
function base_theme_blocks() {
	$handle = 'base-theme-blocks';
	
	wp_register_script(
		$handle,
		get_template_directory_uri() . '/js/editor.js',
		['wp-blocks', 'wp-element'],
		null,
		true
	);

	wp_register_style(
		$handle,
		get_template_directory_uri() . '/css/editor.css',
		['wp-edit-blocks']
	);

	if (function_exists('register_block_type')) {
		register_block_type( 'base-theme/section', [
			'editor_script' => $handle,
			'editor_style' => $handle
		]);

		register_block_type( 'base-theme/group', [
			'editor_script' => $handle,
			'editor_style' => $handle
		]);

		register_block_type( 'base-theme/anchor-group', [
			'editor_script' => $handle,
			'editor_style' => $handle
		]);

		// register_block_type( 'base-theme/my-peaches', [
		// 	'editor_script' => $handle,
		// 	'editor_style' => $handle
		// ]);
	
		// register_block_type('base-theme/image-section', [
		// 	'editor_script' => $handle,
		// 	'editor_style' => $handle
		// ]);
	}
}
add_action( 'init', 'base_theme_blocks' );




/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Register custom API routes for Base Theme
 */
require get_template_directory() . '/api/register-routes.php';






function yearShortcode() {
    return date("Y");
}

add_shortcode( 'bt-year', 'yearShortcode' );








// require 'theme-update-check.php';
// $MyUpdateChecker = new ThemeUpdateChecker(
//     'base-theme',
//     'https://kernl.us/api/v1/theme-updates/5bce7ed17d5b160b7750a72f/'
// );
// $MyUpdateChecker->license = "aKernlLicenseKey";  <---- Optional!