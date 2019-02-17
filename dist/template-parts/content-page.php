<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Base-theme
 */

?>

<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?/* <header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</header><!-- .entry-header -->

	<?php base_theme_post_thumbnail(); ?> */?>

	
	<div class="bt-page-content">
		<?php if( function_exists( 'is_gutenberg_page' ) && !is_gutenberg_page() ) { ?>
			<header class="entry-header">
				<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
			</header><!-- .entry-header -->
		<?php } ?>

		<?php
		the_content();

		wp_link_pages( array(
			'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'base-theme' ),
			'after'  => '</div>',
		) );
		?>
	</div>

	<?/*<?php if ( get_edit_post_link() ) : ?>
		<footer class="entry-footer">
			<?php
			edit_post_link(
				sprintf(
					wp_kses(
						// translators: %s: Name of current post. Only visible to screen readers
						__( 'Edit <span class="screen-reader-text">%s</span>', 'base-theme' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					get_the_title()
				),
				'<span class="edit-link">',
				'</span>'
			);
			?>
		</footer><!-- .entry-footer -->
	<?php endif; ?>*/?>
</div>
