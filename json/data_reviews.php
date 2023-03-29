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

	$sqlQuery = "SELECT reviews.*, users.user_name AS user_name, users.user_email AS user_email, users.user_avatar AS user_avatar FROM reviews LEFT JOIN users ON users.user_id = reviews.user WHERE item = '".getParamsItemID()."' AND reviews.status = 1 AND users.user_status = 1 ORDER BY reviews.created DESC";

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

        $id = $row['id'];
        $comment = $row['comment'];
		$created = $row['created'];
		$rating = $row['rating'];
        $user = $row['user'];
		$user_name = $row['user_name'];
		$user_avatar = $row['user_avatar'];

		$data[] = array(
			'id'=> $id,
            'comment'=> html_entity_decode($comment),
            'created'=> formatDate($created),
            'rating'=> $rating,
            'user'=> $user,
			'user_name'=> html_entity_decode($user_name),
			'user_avatar'=> getImage($user_avatar),
		);
	}

	print json_encode($data, JSON_NUMERIC_CHECK);

?>