<!doctype html>
<html <?php language_attributes(); ?>>

<?php require __DIR__ . "/head.php"; ?>

<body <?php body_class(); ?>>
	<base-page-wrapper>
		<base-page>
			<header>
				<base-top-navigation></base-top-navigation>
			</header>

			<main>
				<base-content-container>

					<?php
					if (is_page()) {
						require __DIR__ . "/page.php";
					} else if (is_single()) {
						require __DIR__ . "/single.php";
					} else if (is_404()) {
						require __DIR__ . "/404.php";
					} else if (is_search()) {
						require __DIR__ . "/search.php";
					} else if (is_archive()) {
						require __DIR__ . "/archive.php";
					} else {
						require __DIR__ . "/default.php";
					} ?>

				</base-content-container>
			</main>

			<?php require __DIR__ . "/footer.php"; ?>

		</base-page>
	</base-page-wrapper> <!-- .base-page-wrapper -->

	<?php require __DIR__ . "/wp-site-info.php" ?>

	<?php wp_footer(); ?>

	<script>
			var wpApiSettings = <?php echo json_encode(
				[
					'restUrl' => esc_url_raw(rest_url()),
					'nonce' => wp_create_nonce('wp_rest')
				]);
			?>
		</script>

</body>
</html>
