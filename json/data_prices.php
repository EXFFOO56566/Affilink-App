<?php

header('Content-Type: application/json');
header("access-control-allow-origin: *");

require './app_core.php';

$rangeOne = range(0, 75, 15);
$data = array();
$array = array_merge($rangeOne);

    foreach ($array as $row) {

        $price = $row;

        $value = "".$price.",".($price+15)."";

        $data[] = array(
            'id' => $price >= 75 ? $price+5 : $price.",".$price+15,
            'title'=> $price >= 75 ? getPrice($price)."+" : getPrice($price)." - ".getPrice($price+15),
        );
    }

print json_encode($data);

?>