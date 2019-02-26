<?php

$themeSettings = get_option('base-theme-settings');

$showPageHeadings = $themeSettings->showPageHeadings;
$shouldShow = true;

if ($showPageHeadings == 'excludeGutenbergPages' &&
    is_page() &&
    has_blocks()) {

    $shouldShow = false;
}

if ($shouldShow) { ?>

<base-page-header>
    <?php the_title( '<h1>', '</h1>' ); ?>
</base-page-header>

<!-- SEARCH RESULTS: <h1 class="page-title">
<?php
    // /* translators: %s: search query. */
    // printf( esc_html__( 'Search Results for: %s', 'base-theme' ), '<span>' . get_search_query() . '</span>' );
    ?>
</h1> -->

<!-- NO RESULTS: <header class="page-header">
    <h1 class="page-title"><?php // esc_html_e( 'Nothing Found', 'base-theme' ); ?></h1>
</header> -->

<!-- SINGLE: the_title( '<h1 class="base-entry-title">', '</h1>' ); -->

<!-- ARCHIVE: <header class="base-page-header">
    <?php
    // the_archive_title( '<h1 class="base-page-title">', '</h1>' );
    // the_archive_description( '<div class="base-archive-description">', '</div>' );
    ?>
</header> -->

<!-- 404 PAGE: <header class="page-header">
    <h1 class="page-title"><?php //esc_html_e( 'Oops! That page can&rsquo;t be found.', 'base-theme' ); ?></h1>
</header> -->

<?php }