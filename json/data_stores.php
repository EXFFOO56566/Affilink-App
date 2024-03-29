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

	$sqlQuery = "SELECT stores.*, (SELECT COUNT(*) FROM deals WHERE deals.deal_store = stores.store_id AND deal_status = 1) AS total_deals FROM stores WHERE stores.store_status = 1";

	if(getParamsID()){

		$sqlQuery .= " AND stores.store_id = '".getParamsID()."'";
	}

	if(getParamsFeatured()){

        $sqlQuery .= " AND stores.store_featured = 1";
	}

    $sqlQuery .= " ORDER BY stores.store_id DESC";

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

		$id = $row['store_id'];
		$title = $row['store_title'];
		$description = $row['store_description'];
		$image = $row['store_image'];
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