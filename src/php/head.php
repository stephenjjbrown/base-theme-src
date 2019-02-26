<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">

	<?php
		wp_head();

		$themeSettings = get_option("base-theme-settings");

		// print(3);
		// print_r($themeSettings);
		// print_r($themeSettings->customHeadHtml);

		if (isset($themeSettings->customHeadHtml) && !empty($themeSettings->customHeadHtml)) {
			echo $themeSettings->customHeadHtml;
		}
	?>
</head>
