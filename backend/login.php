<?php

$arrPost=[$_POST['email'],$_POST['password']];

try {
    $pdo = new PDO('mysql:host=localhost;dbname=darkroom_timer;charset=utf8','root','');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e) {
   echo $e->getMessage();
}
$sql = "SELECT * FROM `users` WHERE `email`='$arrPost[0]' AND `password`='$arrPost[1]'";
$result = $pdo->query($sql);
$response=$result->fetch();
$response=$response?$response['token']:'false';
?>
<?=$response;
