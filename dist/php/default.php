<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Base-theme
 */
?>

<base-content-container>

	<?php
	if ( have_posts() ) {

		require __DIR__ . "/page-header.php";

		/* Start the Loop */
		while ( have_posts() ) {
			the_post();

			/*
				* Include the Post-Type-specific template for the content.
				* If you want to override this in a child theme, then include a file
				* called content-___.php (where ___ is the Post Type name) and that will be used instead.
				*/
			get_template_part( BaseThemeDirectory . '/php/template-parts/content', get_post_type() );

		}

		the_posts_navigation();

	} else {

		get_template_part( BaseThemeDirectory . '/php/template-parts/content', 'none' );

	}
	?>

</base-content-container>
