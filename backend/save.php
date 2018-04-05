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
if ($_POST['table']) {
    $data = $response_arr[0]['data'] . $_POST['table'] . '$';
    $sql = "UPDATE `users` SET `data`='$data' WHERE `token`='$arrPost[0]' ";
    $result = $pdo->exec($sql);
}
echo json_encode(substr($response_arr[0]['data'], 0, -1));

