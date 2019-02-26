<?php
    $wpSiteInfo = [
        'siteUrl' => get_site_url(),
        'siteDisplayName' => get_bloginfo( 'name', 'display' ),
        'homeUrl' => home_url( '/' ),
        'themeUrl' => get_template_directory_uri()
    ];

    $customLogoId = get_theme_mod( 'custom_logo' );

    if ($customLogoId) {
        $customLogo = [];

        $customLogo['imageAlt'] = get_post_meta( $customLogoId, '_wp_attachment_image_alt', true );

        // TODO: Get data about image and its available sizes rather than raw HTML
        $customLogo['imageHtml'] = wp_get_attachment_image( $customLogoId, 'full', false);

        $wpSiteInfo['customLogo'] = $customLogo;
    }
?>

<script>
    var _wpSiteInfo = <?php echo json_encode($wpSiteInfo); ?>;
</script>