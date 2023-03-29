<?php

use voku\helper\AntiXSS;

require_once __DIR__ . '../../classes/anti-xss/autoload.php';
require_once __DIR__ . '../../classes/phpmailer/vendor/phpmailer/phpmailer/src/Exception.php';
require_once __DIR__ . '../../classes/phpmailer/vendor/phpmailer/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '../../classes/phpmailer/vendor/phpmailer/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function connect(){

    global $database;

    try{
        $connect = new PDO('mysql:host='.$database['host'].';dbname='.$database['db'],$database['user'],$database['pass'], array(
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES  \'UTF8\''));
        return $connect;
        
    }catch (PDOException $e){
        return false;
    }
}

function getImage($src){

    return SITE_URL.'/images/'.$src;
}

function getSettings($connect){
    
    $sentence = $connect->prepare("SELECT * FROM settings"); 
    $sentence->execute();
    return $sentence->fetch();
}

function getTheme($connect){
    
    $sentence = $connect->prepare("SELECT * FROM theme"); 
    $sentence->execute();
    return $sentence->fetch();
}

function getStrings($connect){
    
    $sentence = $connect->prepare("SELECT * FROM translations"); 
    $sentence->execute();
    return $sentence->fetch();
}

function getDefaultPage($connect, $page){

    if($page){
        $sentence = $connect->prepare("SELECT * FROM pages WHERE page_status = 1 AND page_id = '".$page."' LIMIT 1");
        $sentence->execute();
        $row = $sentence->fetch();
        return $row;

    }else{
        return NULL;
    }

}

function maskEmail($email){

    $mail_parts = explode('@', $email);
    $username = '@'.$mail_parts[0];
    $len = strlen($username);

    return $username;
}

function isUserVerified($userEmail){

    $sentence = connect()->prepare("SELECT * FROM users WHERE user_email = '".$userEmail."' AND user_verified = 1 LIMIT 1"); 
    $sentence->execute();
    $row = $sentence->fetch();

    if ($row) {
        
        return true;

    }else{

        return false;
    }
    
}

function countFormat($num) {

      if($num>1000) {

        $x = round($num);
        $x_number_format = number_format($x);
        $x_array = explode(',', $x_number_format);
        $x_parts = array('k', 'm', 'b', 't');
        $x_count_parts = count($x_array) - 1;
        $x_display = $x;
        $x_display = $x_array[0] . ((int) $x_array[1][0] !== 0 ? '.' . $x_array[1][0] : '');
        $x_display .= $x_parts[$x_count_parts - 1];

        return $x_display;
    }

  return $num;
}

function formatHTML($content){

    $content = str_replace(array("\n","\r","\t"),'', $content);
    $content = str_replace("</h1>", "</h3><br />", $content);
    $content = str_replace("</h2>", "</h3><br />", $content);
    $content = str_replace("</h3>", "</h3><br />", $content);
    $content = str_replace("</h4>", "</h3><br />", $content);
    $content = str_replace("</h5>", "</h3><br />", $content);
    $content = str_replace("</h6>", "</h3><br />", $content);
    return $content;
    
}

function getPercent($newprice, $oldprice){

    $new = str_replace(',', '.', $newprice);
    $old = str_replace(',', '.', $oldprice);

    $sentence = connect()->prepare("SELECT * FROM translations");
    $sentence->execute();
    $row = $sentence->fetch();

    $calc = (($old - $new) / $old) * 100;
    $percent = round(abs($calc));
    return $percent.$row['tr_9'];
}

function getPrice($price){

    $output = "";
    $sentence = connect()->prepare("SELECT st_currency, st_currencyposition, st_decimalnumber, st_decimalseparator FROM settings");
    $sentence->execute();
    $row = $sentence->fetch();

    $num = str_replace(',', '.', $price);

    if($row['st_decimalnumber'] != 0){

        if ($row['st_currencyposition'] == 'left') {
            $output = $row['st_currency'] . rtrim(rtrim(number_format($num, $row['st_decimalnumber'], $row['st_decimalseparator'], $row['st_decimalseparator']), 0), $row['st_decimalseparator']);
        }elseif ($row['st_currencyposition'] == 'left-space') {
            $output = $row['st_currency'] .' '. rtrim(rtrim(number_format($num, $row['st_decimalnumber'], $row['st_decimalseparator'], $row['st_decimalseparator']), 0), $row['st_decimalseparator']);
        }elseif ($row['st_currencyposition'] == 'right') {
            $output = rtrim(rtrim(number_format($num, $row['st_decimalnumber'], $row['st_decimalseparator'], $row['st_decimalseparator']), 0), $row['st_decimalseparator']) . $row['st_currency'];
        }elseif ($row['st_currencyposition'] == 'right-space') {
            $output = rtrim(rtrim(number_format($num, $row['st_decimalnumber'], $row['st_decimalseparator'], $row['st_decimalseparator']), 0), $row['st_decimalseparator']) .' '. $row['st_currency'];
        }

    }else{

        if ($row['st_currencyposition'] == 'left') {
            $output = $row['st_currency'] . number_format($num, $row['st_decimalnumber'], $row['st_decimalseparator']);
        }elseif ($row['st_currencyposition'] == 'left-space') {
            $output = $row['st_currency'] .' '. number_format($num, $row['st_decimalnumber'], $row['st_decimalseparator']);
        }elseif ($row['st_currencyposition'] == 'right') {
            $output = number_format($num, $row['st_decimalnumber'], $row['st_decimalseparator']) . $row['st_currency'];
        }elseif ($row['st_currencyposition'] == 'right-space') {
            $output = number_format($num, $row['st_decimalnumber'], $row['st_decimalseparator']) .' '. $row['st_currency'];
        }

    }

    return $output;
}

function getDateByTimeZone(){

    $sentence = connect()->prepare("SELECT st_timezone FROM settings");
    $sentence->execute();
    $row = $sentence->fetch();

    $date = new DateTime("now", new DateTimeZone($row['st_timezone']) );

    return $date->format('Y-m-d H:i');

}

function formatDate($date){

    $sentence = connect()->prepare("SELECT st_dateformat FROM settings");
    $sentence->execute();
    $row = $sentence->fetch();

    $newDate = date($row['st_dateformat'], strtotime($date));
    return $newDate;
}

function clearGetData($data){

    $antiXss = new AntiXSS();
    $data = $antiXss->xss_clean($data);
    return $data;
}

function getParamsQuery(){
    
    return isset($_GET['query']) && !empty($_GET['query']) && $_GET['query'] != "undefined" && $_GET['query'] ? clearGetData($_GET['query']) : NULL;
}

function getParamsCategory(){
    
    return isset($_GET['category']) && !empty($_GET['category']) && $_GET['category'] != "undefined" && $_GET['category'] ? clearGetData($_GET['category']) : NULL;
}

function getParamsSubCategory(){
    
    return isset($_GET['subcategory']) && !empty($_GET['subcategory']) && $_GET['subcategory'] != "undefined" && $_GET['subcategory'] ? clearGetData($_GET['subcategory']) : NULL;
}

function getParamsStore(){
    
    return isset($_GET['store']) && !empty($_GET['store']) && $_GET['store'] != "undefined" && $_GET['store'] ? clearGetData($_GET['store']) : NULL;
}

function getParamsLocation(){
    
    return isset($_GET['location']) && !empty($_GET['location']) && $_GET['location'] != "undefined" && $_GET['location'] ? clearGetData($_GET['location']) : NULL;
}

function getParamsRating(){
    
    return isset($_GET['rating']) && !empty($_GET['rating']) && $_GET['rating'] != "undefined" && $_GET['rating'] != "undefined" && $_GET['rating'] ? clearGetData($_GET['rating']) : NULL;
}

function getParamsFilter(){
    
    return isset($_GET['filter']) && !empty($_GET['filter']) && $_GET['filter'] != "undefined" && $_GET['filter'] ? clearGetData($_GET['filter']) : NULL;
}

function getParamsPrice(){
    
    return isset($_GET['price']) && !empty($_GET['price']) && $_GET['price'] != "all" && $_GET['price'] != "undefined" && $_GET['price'] ? clearGetData($_GET['price']) : NULL;
}

function getParamsFeatured(){
    
    return isset($_GET['featured']) && !empty($_GET['featured']) && $_GET['featured'] ? clearGetData($_GET['featured']) : NULL;
}

function getParamsUserID(){
    
    return isset($_GET['user']) && !empty($_GET['user']) ? clearGetData($_GET['user']) : NULL;
}

function getParamsItemID(){
    
    return isset($_GET['item']) && !empty($_GET['item']) ? clearGetData($_GET['item']) : NULL;
}

function getParamsID(){
    
    return isset($_GET['id']) && !empty($_GET['id']) ? clearGetData($_GET['id']) : NULL;
}

function getParamsSort(){
    
    return isset($_GET['sortby']) && !empty($_GET['sortby']) && $_GET['sortby'] !== 'undefined' ? clearGetData($_GET['sortby']) : NULL;
}

function getEmailTemplate($connect, $id){

    if (!empty($id) && (int)($id)) {

        $q = $connect->query("SELECT * FROM emailtemplates WHERE email_id = ".$id." LIMIT 1");
        $f = $q->fetch();
        $result = $f;

        if ($result['email_disabled'] == 1) {
            return null;
        }else{
            return $result;
        }
    }else{

        return null;
    }  

}

function getUserInfo($userEmail){

        $email = filter_var(strtolower($userEmail), FILTER_VALIDATE_EMAIL);
    
        $sentence = connect()->prepare("SELECT * FROM users WHERE user_status = 1 AND user_email = '".$email."' LIMIT 1");
        $sentence->execute();
        $row = $sentence->fetch();
        return $row;

}

function sendMail($array_content, $email_content, $destinationmail, $fromName, $subject, $isHtml, $replyToName = NULL, $replyToAddress = NULL) {
    
    $sentence = connect()->prepare("SELECT * FROM settings"); 
    $sentence->execute();
    $settings = $sentence->fetch();
    
    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();                                          
        $mail->Host       = $settings['st_smtphost'];                
        $mail->SMTPAuth   = true;                                   
        $mail->Username   = $settings['st_smtpemail'];              
        $mail->Password   = $settings['st_smtppassword'];                             
        $mail->SMTPSecure = $settings['st_smtpencrypt'];
        $mail->Port       = $settings['st_smtpport'];

        if (isset($replyToAddress, $replyToName) && !empty($replyToAddress) && !empty($replyToName)) {
            $mail->addReplyTo($replyToAddress, $replyToName);
        }

        $mail->setFrom($settings['st_smtpemail'], $fromName);
        $mail->CharSet = "UTF-8";
        $mail->AddAddress($destinationmail); 
        $mail->isHTML($isHtml);

        $find = array_keys($array_content);
        $replace = array_values($array_content);

        $mailcontent = str_replace($find, $replace, $email_content);
        $mailsubject = str_replace($find, $replace, $subject);

        $mail->Subject = $mailsubject;
        $mail->Body = $mailcontent;
        if (!$mail->send()){

            $result = $mail->ErrorInfo;
            
        }else{

            $result = TRUE;
        }

        return $result;

    } catch (Exception $e) {
     return null;
    }

}

function timeLeft($date){

    if(!empty($date)){

            $sqlQuery = "SELECT * FROM translations";

            $sentence = connect()->prepare($sqlQuery);
            $sentence->execute();
            $row = $sentence->fetch();

            $date1 = date_create($date);
            $date2 = date_create(getDateByTimeZone());
            $diff = date_diff($date1, $date2);

            $hour = $diff->h;
            $minutes = $diff->i;

            $hourdiff = round((strtotime($date) - strtotime(getDateByTimeZone()))/3600, 1);

            if((int)$hourdiff  < 24 && (int)$hourdiff >= 1){
                return $hour.' '.$row['tr_17'];
            }elseif((int)$hourdiff = 0 || (int)$hourdiff <= 1){
                return $minutes.' '.$row['tr_18'];
            }else{
                return false;
            }

    }else{
        return false;
    }
}

function formatRating($value){

    if(!empty($value)){

        if($value <= 5){
            $starRating = number_format($value, 1);
            return $starRating;
        }else{
            return "5.0";
        }

    }else{
        return false;
    }

}

function getCountDown($date){

    $sentence = connect()->prepare("SELECT st_timezone FROM settings");
    $sentence->execute();
    $row = $sentence->fetch();

    $datetime= date_create($date, timezone_open($row['st_timezone']));
    $fecha = $datetime->format(DateTime::ATOM); // Updated ISO8601
    return $fecha;

}

/* FOR DEMO ONLY */

function increaseCountDown(){

    $sentence = connect()->prepare("SELECT st_timezone FROM settings");
    $sentence->execute();
    $row = $sentence->fetch();

    $date = new DateTime('now', new DateTimeZone($row['st_timezone']));
    $date->add(new DateInterval('PT2H'));

    $fecha = $date->format(DateTime::ATOM); // Updated ISO8601
    return $fecha;

}

function demotimeLeft(){

            $sqlQuery = "SELECT * FROM translations";
            $sentence = connect()->prepare($sqlQuery);
            $sentence->execute();
            $row = $sentence->fetch();

            $now = date("Y-m-d H:i:s");
            $date1 = new DateTime('now');
            $date2 = new DateTime('now');
            $date2->add(new DateInterval('PT2H'));

            $diff = date_diff($date1, $date2);

            $hour = $diff->h;
            $minutes = $diff->i;

            $hourdiff = round((strtotime($now) - strtotime(getDateByTimeZone()))/3600, 1);

            return $hour.' '.$row['tr_17'];
}

?>