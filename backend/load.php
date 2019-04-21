<?php
$arrPost = [$_POST['token'], $_POST['table']];


try {
    $pdo = new PDO('mysql:host=localhost;dbname=darkroom_timer;charset=utf8', 'root', '');
} catch (PDOException $e) {
    echo $e->getMessage();
}

$sql = "SELECT * FROM `users` WHERE `token`='$arrPost[0]' ";
$result = $pdo->query($sql);
$response_arr = $result->fetchAll();
$data = $response_arr['data'] . $_POST['table'] . ',';
$sql = "UPDATE `users` SET `data`='$data' WHERE `token`='$arrPost[0]' ";
$result = $pdo->exec($sql);

print_r($result);
