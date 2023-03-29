<?php
 
require './app_core.php';

$json = file_get_contents('php://input');
 
$obj = json_decode($json, true);

$comment_rating = filter_var(strtolower($obj['comment_rating']), FILTER_SANITIZE_STRING);
$comment_item = filter_var(strtolower($obj['comment_item']), FILTER_SANITIZE_STRING);
$comment_user = filter_var(strtolower($obj['comment_user']), FILTER_SANITIZE_STRING);
$comment_text = clearGetData($obj['comment_text']);
$comment_id = filter_var(strtolower($obj['comment_id']), FILTER_SANITIZE_STRING);

    	if (!empty($comment_item) && !empty($comment_rating) && !empty($comment_user)) {

			$state = $connect->prepare("SELECT * FROM reviews WHERE user = :user AND item = :item LIMIT 1");
			$state->execute(array(':user' => $comment_user, ':item' => $comment_item));
			$result = $state->fetch();
		  
			if ($result != false) {
			  
				$InvalidMSG = 'already';
		 
				$InvalidMSGJSon = json_encode($InvalidMSG);
				 
				echo $InvalidMSGJSon;

			}else{

				$statment = $connect->prepare("INSERT INTO reviews (item, user, rating, comment, created) VALUES (:item, :user, :rating, :comment, null)");

				$statment->execute(array(
					':item' => $comment_item,
					':user' => $comment_user,
					':rating' => $comment_rating,
					':comment' => $comment_text
				));
	
				$validMSG = 'submitted';
				 
				$validMSGJSon = json_encode($validMSG);
				 
				echo $validMSGJSon;

			}

    	}else{
	 
		$InvalidMSG = 'error';
		 
		$InvalidMSGJSon = json_encode($InvalidMSG);
		 
		echo $InvalidMSGJSon;
	 
	}
 
?>