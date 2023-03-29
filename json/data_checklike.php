<?php

header('Content-Type: application/json');
header("access-control-allow-origin: *");
 
require './app_core.php';

$user_id = getParamsUserID();
$item_id = getParamsItemID();

if ($user_id && $item_id) {

	$Sql_Query = "SELECT * FROM favorites WHERE user = '".$user_id."' AND item = '".$item_id."' LIMIT 1";

	$sentence = $connect->prepare($Sql_Query);

	$sentence->execute();

	$qResults = $sentence->fetch();

	if($qResults){

		$InvalidMSG = 'true';
		 
		$InvalidMSGJSon = json_encode($InvalidMSG);
		 
		echo $InvalidMSGJSon;

	}else{
	 
		$InvalidMSG = 'false';
		 
		$InvalidMSGJSon = json_encode($InvalidMSG);
		 
		echo $InvalidMSGJSon;
	 
	}

}

 
?>