<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Base-theme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
	
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<!-- TODO: Only include icons needed -->
	<script defer src="https://pro.fontawesome.com/releases/v5.7.2/js/all.js" integrity="sha384-I3Hhe9TkmlsxzooTtbRzdeLbmkFQE9DVzX/19uTZfHk1zn/uWUyk+a+GyrHyseSq" crossorigin="anonymous"></script>
	<!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous"> -->
	
	<!-- GSS engine -->
	<!-- <script src="https://s3-us-west-2.amazonaws.com/cdn.thegrid.io/gss/v2.0.0/v2.0.0/gss.min.js"></script>
	<script type="text/javascript">
		window.engine = new GSS(document);
	</script>

	<style type="text/gss">
		bt-top-navigation[height] == ::window[height] / 2;
	</style> -->

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<bt-page-wrapper>
<bt-page>
<!-- <div id="page" class="site"> -->
	<!-- <a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'base-theme' ); ?></a> -->

	<header>
		<bt-top-navigation></bt-top-navigation>
	</header>
	<!-- <header class="bt-topnav">
		<div class="bt-topnav-logo">
			the_custom_logo();
		</div>
		<div class="bt-topnav-links">
		</div>
	</header> -->

	<!-- <header id="masthead" class="site-header">
		<div class="site-branding">
			<?php
			//the_custom_logo();
			//if ( is_front_page() && is_home() ) :
				?>
				<h1 class="site-title"><a href="<?php //echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php //bloginfo( 'name' ); ?></a></h1>
				<?php
			//else :
				?>
				<p class="site-title"><a href="<?php //echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php //bloginfo( 'name' ); ?></a></p>
				<?php
			// endif;
			// $base_theme_description = get_bloginfo( 'description', 'display' );
			// if ( $base_theme_description || is_customize_preview() ) :
				?>
				<p class="site-description"><?php //echo $base_theme_description; /* WPCS: xss ok. */ ?></p>
			<?php //endif; ?>
		</div>

		<nav id="site-navigation" class="main-navigation">
			<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'base-theme' ); ?></button>
			<?php
			// wp_nav_menu( array(
			// 	'theme_location' => 'menu-1',
			// 	'menu_id'        => 'primary-menu',
			// ) );
			?>
		</nav>
	</header> -->

	<div id="content" class="site-content">
