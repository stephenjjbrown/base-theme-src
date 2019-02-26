<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Base-theme
 */

?>

<footer>
	<?php
		
		$themeSettings = get_option('base-theme-settings');

		$footerPageId = $themeSettings->footerPageId;
		if ($footerPageId) {

			$content_post = get_post($footerPageId);
			$content = $content_post->post_content;
			$content = apply_filters('the_content', $content);
			$content = str_replace(']]>', ']]&gt;', $content);
			echo $content;
			//echo get_post_field('post_content', $footerPageId);
		} else {
			echo 'No footer has been set up';
		}
	
	?>
</footer>