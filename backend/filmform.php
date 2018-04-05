<?php
$response_arr = '';
$films = [];
$developer = [];

try {
    $pdo = new PDO('mysql:host=localhost;dbname=darkroom_timer;charset=utf8', 'root', '');
} catch (PDOException $e) {
    echo $e->getMessage();
}

$sql = "SELECT DISTINCT `film` FROM `data`";
$result = $pdo->query($sql);
$response_arr = $result->fetchAll();
for ($i = 0; $i < count($response_arr); $i++) {
    array_push($films, $response_arr[$i]['film']);
}
$sql = "SELECT DISTINCT `developer` FROM `data`";
$result = $pdo->query($sql);
$response_arr = $result->fetchAll();
for ($i = 0; $i < count($response_arr); $i++) {
    array_push($developer, $response_arr[$i]['developer']);
}
$response = json_encode([$films, $developer]);
?>
<?= $response;