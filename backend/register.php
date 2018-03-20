<?php
////if ($_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') {return;}

$arrPost=[$_POST['email'],$_POST['password']];
$token=uniqid('',true);
try {
    $pdo = new PDO('mysql:host=localhost;dbname=darkroom_timer;charset=utf8','root','');
}
catch(PDOException $e) {
    echo $e->getMessage();
}

$sql = "SELECT * FROM `users` WHERE `email`='$arrPost[0]'";
$result = $pdo->query($sql);
$chec_uniq=$result->fetch();
$chec_uniq=$chec_uniq?$chec_uniq['token']:'false';

if($chec_uniq=='false') {
    $sql = "INSERT INTO `users`(`id`,`email`, `password`,`token`,`data`) VALUES ('','$arrPost[0]','$arrPost[1]','$token','')";
    $result = $pdo->exec($sql);
    $response = $token;
}
else{
    $response='false';
}
?>
<?=$response;
