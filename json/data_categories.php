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


	$sqlQuery = "SELECT categories.*, (SELECT COUNT(*) FROM deals WHERE deals.deal_category = categories.category_id AND deal_status = 1) AS total_deals FROM categories WHERE categories.category_status = 1";

	if(getParamsID()){

		$sqlQuery .= " AND categories.category_id = '".getParamsID()."'";
	}

	if(getParamsFeatured()){

        $sqlQuery .= " AND categories.category_featured = 1";
	}

    $sqlQuery .= " ORDER BY categories.category_id DESC";

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

		$id = $row['category_id'];
		$title = $row['category_title'];
		$description = $row['category_description'];
		$image = $row['category_image'];
		$total_deals = $row['total_deals'];

		$data[] = array(
			'id'=> $id,
			'title'=> html_entity_decode($title),
			'description'=> html_entity_decode($description),
			'image'=> getImage($image),
			'total_deals'=> $total_deals,
		);
	}

	print json_encode($data, JSON_NUMERIC_CHECK);

?>