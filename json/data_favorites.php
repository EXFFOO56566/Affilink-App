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

if(getParamsUserID()){

    $sqlQuery .= "SELECT deals.*, favorites.* FROM deals,favorites WHERE favorites.user = '".getParamsUserID()."' AND favorites.item = deals.deal_id GROUP BY deals.deal_id";

	if(!isset($_GET['sortby']) || empty($_GET['sortby'])) {

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

}

	$data = array();

	foreach ($qResults as $row) {

		$id = $row['deal_id'];
		$title = $row['deal_title'];
		$image = $row['deal_image'];

		$data[] = array(
			'id'=> $id,
			'title'=> html_entity_decode($title),
			'image'=> getImage($image),
		);
	}


	print json_encode($data, JSON_NUMERIC_CHECK);

?>