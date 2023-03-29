<?php

require './app_core.php';

$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$user_name = filter_var($obj["user_name"], FILTER_SANITIZE_STRING);

$user_email = filter_var(strtolower($obj['user_email']), FILTER_VALIDATE_EMAIL);

$user_password = filter_var($obj["user_password"], FILTER_SANITIZE_STRING);

$encryptPass = hash('sha512', $user_password);

if ($user_email && strlen($user_name) >= 3 && strlen($user_password) >= 8) {

	$Sql_Query = "SELECT * FROM users WHERE user_email = '".$user_email."' LIMIT 1";

	$sentence = $connect->prepare($Sql_Query);

	$sentence->execute();

	$qResults = $sentence->fetch();

	if ($qResults) {

		$existMSGJSon = json_encode('exist');
		echo $existMSGJSon;

}else{

	$statement = $connect->prepare("INSERT INTO users (user_id, user_name, user_email, user_password) VALUES (null, :user_name, :user_email, :user_password)");
	$statement->execute(array(
		':user_name' => $user_name,
		':user_email' => $user_email,
		':user_password' => $encryptPass
	));

	$validMSGJSon = json_encode('success');
	echo $validMSGJSon;

	$userInfo = getUserInfo($connect, $user_email);

	$array_content = array("{LOGO_URL}" => $urlPath->image($theme['th_logo']),
		"{SITE_DOMAIN}" => $urlPath->home(), 
		"{SITE_NAME}" => $translation['tr_1'], 
		"{USER_NAME}" => $userInfo['user_name'], 
		"{USER_EMAIL}" => $userInfo['user_email'], 
		"{TERMS_URL}" => $urlPath->terms(), 
		"{PRIVACY_URL}" => $urlPath->privacy(),
		"{SIGNIN_URL}" => $urlPath->signin()
	);

	$emailTemplate = getEmailTemplate($connect, 1);

	if ($emailTemplate) {

		$emailContent = json_decode($emailTemplate['email_content'],true);

		$mail = sendMail($array_content, $emailContent[0]['message'], $user_email, $emailTemplate['email_fromname'], $emailContent[0]['subject'], $emailTemplate['email_plaintext']);
	}

}

}else{

	$InvalidMSGJSon = json_encode('incomplete');

	echo $InvalidMSGJSon;
}

?>