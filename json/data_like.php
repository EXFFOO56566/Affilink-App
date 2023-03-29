<?php
 
require './app_core.php';

$json = file_get_contents('php://input');
 
$obj = json_decode($json, true);

$action = filter_var(strtolower($obj['action']), FILTER_SANITIZE_STRING);
$user_id = filter_var(strtolower($obj['user_id']), FILTER_SANITIZE_STRING);
$item_id = filter_var(strtolower($obj['item_id']), FILTER_SANITIZE_STRING);

    if (isset($action) && $action == 'like') {

        $statement = $connect->prepare("SELECT * FROM favorites WHERE user = :user AND item = :item");
        $statement->execute(array(':user' => $user_id, ':item' => $item_id));
        $result = $statement->fetch();

        if ($result == false) {

	        $statment = $connect->prepare("INSERT INTO favorites (id,item,user) VALUES (null, :item, :user)");

	        $statment->execute(array(
	            ':item' => $item_id,
	            ':user' => $user_id
	        ));
    	}

		$validMSG = 'liked';
		 
		$validMSGJSon = json_encode($validMSG);
		 
		echo $validMSGJSon;

    }elseif(isset($action) && $action == 'unlike') {

        $sentence = $connect->prepare("DELETE FROM favorites WHERE item = :item AND user = :user");

        $sentence->execute(array(
            ':item' => $item_id,
            ':user' => $user_id
        ));

		$InvalidMSG = 'unliked';
		 
		$InvalidMSGJSon = json_encode($InvalidMSG);
		 
		echo $InvalidMSGJSon;

	}else{
	 
		$InvalidMSG = 'error';
		 
		$InvalidMSGJSon = json_encode($InvalidMSG);
		 
		echo $InvalidMSGJSon;
	 
	}
 
?>