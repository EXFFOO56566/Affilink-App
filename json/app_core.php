<?php

require '../config.php';
require '../routes.php';
require './app_functions.php';

$connect = connect();

// Site Configuration
$settings = getSettings($connect);

// Site Theme
$theme = getTheme($connect);

// Get Translation
$translation = getStrings($connect);

// Default Pages
$defaultSearchPage = getDefaultPage($connect, $settings['st_defaultsearchpage']);
$defaultPrivacyPage = getDefaultPage($connect, $settings['st_defaultprivacypage']);
$defaultTermsPage = getDefaultPage($connect, $settings['st_defaulttermspage']);
$defaultCategoriesPage = getDefaultPage($connect, $settings['st_defaultcategoriespage']);
$defaultStoresPage = getDefaultPage($connect, $settings['st_defaultstorespage']);
$defaultLocationsPage = getDefaultPage($connect, $settings['st_defaultlocationspage']);

define('SEARCH_PAGE', $defaultSearchPage['page_slug']);
define('PRIVACY_PAGE', $defaultPrivacyPage['page_slug']);
define('TERMS_PAGE', $defaultTermsPage['page_slug']);
define('CATEGORIES_PAGE', $defaultCategoriesPage['page_slug']);
define('STORES_PAGE', $defaultStoresPage['page_slug']);
define('LOCATIONS_PAGE', $defaultLocationsPage['page_slug']);

$urlPath = new Routes();

?>