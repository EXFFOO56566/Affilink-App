<?php

header('Content-Type: application/json');
header("access-control-allow-origin: *");

require './app_core.php';

	$sqlQuery = "SELECT * FROM translations";

	$sentence = $connect->prepare($sqlQuery);

	$sentence->execute();

	$qResults = $sentence->fetchAll(PDO::FETCH_ASSOC);

	$data = array();

	foreach ($qResults as $row) {

		$tr_1 = $row['tr_termsandconds'];
		$tr_2 = $row['tr_aboutus'];

		$data[] = array(
			'tr_termsandconds'=> formatHTML($tr_1),
			'tr_aboutus'=> formatHTML($tr_2)
		);
	}

	print json_encode($data, JSON_NUMERIC_CHECK);

?>