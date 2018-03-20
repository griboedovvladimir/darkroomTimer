<?php
$arrPost=[$_POST['film'],$_POST['dev']];
$response=[];
$dilution=[];
$ASAISO=[];
$temp=[];

try {
    $pdo = new PDO('mysql:host=localhost;dbname=darkroom_timer;charset=utf8','root','');
}
catch(PDOException $e) {
    echo $e->getMessage();
}

$sql = "SELECT * FROM `data` WHERE `film`='$arrPost[0]' AND `developer`='$arrPost[1]'";
$result = $pdo->query($sql);
$response_arr=$result->fetchAll();

foreach ($response_arr as $key => $value)
{
    array_push($dilution, strval($value['dilution']));
    array_push($ASAISO, strval($value['ASA/ISO']));
    array_push($temp, strval($value['temp']));
}
$dilution=array_unique($dilution);
$dilution_resp=[];
foreach ($dilution as $value ){
    array_push($dilution_resp,$value);
}
$ASAISO=array_unique($ASAISO);
$ASAISO_resp=[];
foreach ($ASAISO as $value ){
    array_push($ASAISO_resp,$value);
}
$temp=array_unique($temp);
$temp_resp=[];
foreach ($temp as $value ){
    array_push($temp_resp,$value);
}

$response=[$dilution_resp,$ASAISO_resp,$temp_resp];
$response=$response!=[[],[],[]]?$response:'false';
?>
<?=json_encode ($response);