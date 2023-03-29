<?php

$page = 1;
if(!empty($_GET['page'])) {
    $page = filter_input(INPUT_GET, 'page', FILTER_VALIDATE_INT);
    if(false === $page) {
        $page = 1;
    }
}

$limit = 10;
if(!empty($_GET['limit'])) {
    $limit = filter_input(INPUT_GET, 'limit', FILTER_VALIDATE_INT);
}

$offset = ($page - 1) * $limit;

header('Content-Type: application/json');
header("access-control-allow-origin: *");

require './app_core.php';

    $sqlQuery = "SELECT SQL_CALC_FOUND_ROWS deals.*, (SELECT AVG(rating) FROM reviews WHERE reviews.item = deals.deal_id AND reviews.status = 1) AS deal_rating, CAST(deals.deal_price AS UNSIGNED) AS price, CAST(deals.deal_oldprice AS UNSIGNED) AS oldprice, categories.*, subcategories.*, stores.*, locations.*, users.user_name AS author_name, (SELECT COUNT(*) FROM reviews WHERE reviews.item = deals.deal_id AND reviews.status = 1) AS total_reviews FROM deals LEFT JOIN categories ON deals.deal_category = categories.category_id LEFT JOIN stores ON deals.deal_store = stores.store_id LEFT JOIN locations ON deals.deal_location = locations.location_id LEFT JOIN users ON deals.deal_author = users.user_id LEFT JOIN subcategories ON deals.deal_subcategory = subcategories.subcategory_id LEFT JOIN reviews ON reviews.item = deals.deal_id WHERE deals.deal_status = 1 AND deals.deal_start <= '".getDateByTimeZone()."' AND ('".getDateByTimeZone()."' < deals.deal_expire OR deals.deal_expire IS NULL OR deals.deal_expire = '')";

    if(getParamsID()){

        $sqlQuery .= " AND deals.deal_id = '".getParamsID()."'";
    }

	if(getParamsCategory()){

        $sqlQuery .= " AND deals.deal_category = (SELECT categories.category_id FROM categories WHERE categories.category_id = '".getParamsCategory()."' LIMIT 1) ";
    }

    if(getParamsQuery()){

        $sqlQuery .= " AND deals.deal_title LIKE '%".getParamsQuery()."%'";
    }

    if(getParamsSubCategory()){

        $sqlQuery .= " AND deals.deal_subcategory = (SELECT subcategories.subcategory_id FROM subcategories WHERE subcategories.subcategory_id = '".getParamsSubCategory()."' LIMIT 1) ";
    }

    if(getParamsLocation()){

        $sqlQuery .= " AND deals.deal_location = (SELECT locations.location_id FROM locations WHERE locations.location_id = '".getParamsLocation()."' LIMIT 1) ";
    }

    if(getParamsStore()){

        $sqlQuery .= " AND deals.deal_store = (SELECT stores.store_id FROM stores WHERE stores.store_id = '".getParamsStore()."' LIMIT 1) ";
    }

    if(getParamsRating() && getParamsRating() != "all"){

        $sqlQuery .= " AND rating >= '".getParamsRating()."'";
    }

    if(getParamsFilter()){

        if(getParamsFilter() == "exclusive"){
            $sqlQuery .= " AND deals.deal_exclusive = 1";
        }elseif(getParamsFilter() == "featured"){
            $sqlQuery .= " AND deals.deal_featured = 1";
        }else{
            return NULL;
        }
        
    }

    if(getParamsPrice() && getParamsPrice() != "all"){

        $values = explode(',', getParamsPrice());
        $from = (isset($values[0]) ? $values[0] : "0");
        $to = (isset($values[1]) ? $values[1] : "999999999");

        $sqlQuery .= " AND CAST(deals.deal_price AS UNSIGNED) BETWEEN '".$from."' AND '".$to."'";
    }

    $sqlQuery .= " GROUP BY deals.deal_id";

    if (getParamsSort()) {

        if(getParamsSort() == 'relevance') {

            $sqlQuery .= " ORDER BY deals.deal_created DESC";

        }elseif(getParamsSort() == 'price-asc') {

            $sqlQuery .= " ORDER BY price ASC";

        }elseif (getParamsSort() == 'price-desc') {

            $sqlQuery .= " ORDER BY price DESC";

        }elseif (getParamsSort() == 'best-rated') {

            $sqlQuery .= " ORDER BY total_reviews DESC";
        }

    }elseif(!isset($_GET['sortby']) || empty($_GET['sortby'])) {

        $sqlQuery .= " ORDER BY deals.deal_created DESC";
    }

    if(isset($_GET['page']) && !empty($_GET['page'])) {
        $sqlQuery .= " LIMIT ".$offset.",".$limit;
    }

    if(isset($_GET['limit']) && !empty($_GET['limit']) && !isset($_GET['page'])) {
        $sqlQuery .= " LIMIT ".$limit;
    }

    $sentence = $connect->prepare($sqlQuery);

    $sentence->execute();

    $qResults = $sentence->fetchAll(PDO::FETCH_ASSOC);

	$data = array();

	foreach ($qResults as $row) {

		$id = $row['deal_id'];
		$title = $row['deal_title'];
		$description = $row['deal_description'];
		$image = $row['deal_image'];
		$gif = $row['deal_gif'];
		$category = $row['category_title'];
		$category_id = $row['category_id'];
		$subcategory = $row['subcategory_title'];
		$subcategory_id = $row['subcategory_id'];
		$store = $row['store_title'];
		$store_id = $row['store_id'];
		$location = $row['location_title'];
		$location_id = $row['location_id'];
		$video = $row['deal_video'];
		$date = $row['deal_created'];
		$start = $row['deal_start'];
        $expire = $row['deal_expire'];
		$price = $row['price'];
		$oldprice = $row['oldprice'];
		$rating = $row['deal_rating'];
		$link = $row['deal_link'];
		$tagline = $row['deal_tagline'];
		$total_reviews = $row['total_reviews'];
        $exclusive = $row['deal_exclusive'];

		$data[] = array(
			'id'=> $id,
			'title'=> html_entity_decode($title),
			'description'=> html_entity_decode($description),
			'image'=> getImage($image),
			'gif'=> $gif,
			'category'=> html_entity_decode($category),
			'category_id'=> $category_id,
			'subcategory'=> html_entity_decode($subcategory),
			'subcategory_id'=> $subcategory_id,
			'store'=> html_entity_decode($store),
			'store_id'=> $store_id,
			'location'=> html_entity_decode($location),
			'location_id'=> $location_id,
			'video'=> html_entity_decode($video),
			'date'=> formatDate($date),
			'start'=> formatDate($start),
            'expire'=> $expire ? formatDate($expire) : null,
            'timeleft'=> $expire ? timeLeft($expire) : null,
            'countdown'=> $expire ? getCountDown($expire) : null,
			'price'=> getPrice($price),
			'oldprice'=> getPrice($oldprice),
            'discount'=> getPercent($price, $oldprice),
			'rating'=> $rating,
			'formatrating'=> formatRating($rating)." ",
			'link'=> $link,
			'tagline'=> html_entity_decode($tagline),
			'total_reviews'=> countFormat($total_reviews),
            'exclusive'=> $exclusive
		);
	}

	print json_encode($data, JSON_NUMERIC_CHECK);

?>