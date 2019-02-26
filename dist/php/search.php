<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package Base-theme
 */
?>

	<?php if ( have_posts() ) : ?>

		<?php require __DIR__ . "/page-header.php" ?>

		<?php
		/* Start the Loop */
		while ( have_posts() ) :
			the_post();

			/**
			 * Run the loop for the search to output the results.
			 * If you want to overload this in a child theme then include a file
			 * called content-search.php and that will be used instead.
			 */
			get_template_part( BaseThemeDirectory . '/php/template-parts/content', 'search' );

		endwhile;

		the_posts_navigation();

	else :

		get_template_part( BaseThemeDirectory . '/php/template-parts/content', 'none' );

	endif;
	?>