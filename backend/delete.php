<?php
$arrPost = [$_POST['token'], $_POST['value']];


try {
    $pdo = new PDO('mysql:host=localhost;dbname=darkroom_timer;charset=utf8', 'root', '');
} catch (PDOException $e) {
    echo $e->getMessage();
}
$response = '';
$sql = "SELECT * FROM `users` WHERE `token`='$arrPost[0]' ";
$result = $pdo->query($sql);
$response_arr = $result->fetchAll();
if ($_POST['value']) {
    $data = explode("$", $response_arr[0]['data']);
    for ($i = 0; $i < count($data); $i++) {
        $response = strpos($data[$i], '"' . $_POST['value'] . '"');
        if ($response) {
            array_splice($data, $i, 1);
        }
    }
    $response = implode('$', $data);
    $sql = "UPDATE `users` SET `data`='$response' WHERE `token`='$arrPost[0]' ";
    $result = $pdo->exec($sql);
}


var_dump($result);