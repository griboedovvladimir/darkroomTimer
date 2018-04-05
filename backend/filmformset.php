<?php
$arrPost = [$_POST['film'], $_POST['dev'], $_POST['type'], $_POST['dilution'], $_POST['ASAISO'], $_POST['temp']];
$time = [];
try {
    $pdo = new PDO('mysql:host=localhost;dbname=darkroom_timer;charset=utf8', 'root', '');
} catch (PDOException $e) {
    echo $e->getMessage();
}

$sql = "SELECT * FROM `data` WHERE `film`='$arrPost[0]' AND `developer`='$arrPost[1]' AND `dilution`='$arrPost[3]' AND `ASA/ISO`='$arrPost[4]' AND `temp`='$arrPost[5]'";
$result = $pdo->query($sql);
$response_arr = $result->fetchAll();
foreach ($response_arr as $key => $value) {
    array_push($time, strval($value[$_POST['type']]));
}
$time = $time[0] == '' ? 'false' : $time[0];
if ($time != 'false') {
    if (iconv_strlen($time) > 3) {
        $arr = explode('-', $time[0]);
        if ($arr[1]) {
            $time = ($arr[0] + $arr[1]) / 2;
        }
        if (!$arr[1]) {
            $arr = explode('+', $time[0]);
            $time = ($arr[0] + $arr[1]);
        }
    }
}
echo $time;