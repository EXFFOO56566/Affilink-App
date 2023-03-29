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


	$sqlQuery = "SELECT subcategories.*, categories.category_id AS category_id FROM subcategories, categories WHERE subcategories.subcategory_parent = '".getParamsCategory()."' AND subcategories.subcategory_status = 1 GROUP BY subcategories.subcategory_id";

    $sqlQuery .= " ORDER BY subcategories.subcategory_id DESC";

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

		$id = $row['subcategory_id'];
		$title = $row['subcategory_title'];
		$total_deals = $row['total_deals'];

		$data[] = array(
			'id'=> $id,
			'title'=> html_entity_decode($title),
			'total_deals'=> $total_deals,
		);
	}

	print json_encode($data, JSON_NUMERIC_CHECK);

?>