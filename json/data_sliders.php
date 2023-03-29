<?php

header('Content-Type: application/json');
header("access-control-allow-origin: *");

require './app_core.php';

	$sqlQuery = "SELECT * FROM sliders WHERE sliders.slider_status = 1";

    $sentence = $connect->prepare($sqlQuery);

    $sentence->execute();

    $qResults = $sentence->fetchAll(PDO::FETCH_ASSOC);

	$data = array();

	foreach ($qResults as $row) {

		$id = $row['slider_id'];
		$link = $row['slider_link'];
		$image = $row['slider_image'];

		$data[] = array(
			'id'=> $id,
			'link'=> html_entity_decode($link),
			'image'=> getImage($image),
		);
	}

	print json_encode($data, JSON_NUMERIC_CHECK);

?>