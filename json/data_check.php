<?php
 
require './app_core.php';

$json = file_get_contents('php://input');
 
$obj = json_decode($json, true);

$user_email = filter_var(strtolower($obj['user_email']), FILTER_SANITIZE_STRING);

$Sql_Query = "SELECT * FROM users WHERE user_email = '".$user_email."' AND user_status = 1 LIMIT 1";

$sentence = $connect->prepare($Sql_Query);

$sentence->execute();

$qResults = $sentence->fetchAll(PDO::FETCH_ASSOC);

if($qResults){

$data = array();

	foreach ($qResults as $row) {

		$user_id = $row['user_id'];
	    $user_name = $row['user_name'];
	    $user_avatar = $row['user_avatar'];
		$user_email = $row['user_email'];
	    $user_verified = $row['user_verified'];

	    $data[] = array(
		'user_id'=> $user_id,
		'user_avatar'=> getImage($user_avatar),
	    'user_name'=> html_entity_decode($user_name),
	    'user_email'=> $user_email,
	    'user_verified'=> $user_verified,
	    );
	}

print json_encode($data, JSON_NUMERIC_CHECK);

}else{
 
$InvalidMSG = 'error';
 
$InvalidMSGJSon = json_encode($InvalidMSG);
 
echo $InvalidMSGJSon;
 
}
 
?>