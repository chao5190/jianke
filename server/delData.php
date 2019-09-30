<?php
$commodityid=$_POST['commodityid'];
$db=mysqli_connect("127.0.0.1","root","root","jianke");
$sql="DELETE FROM commodity WHERE commodityid = $commodityid";
// echo $sql;
// echo "<br>";
/* --  $sql= str_replace("\"","",$sql); */
$result=mysqli_query($db,$sql);
$sql="SELECT * FROM commodity";
// echo $sql;
$result=mysqli_query($db,$sql);
$data=mysqli_fetch_all($result,MYSQLI_ASSOC);
$response=array("status"=>"success","data"=>$data);
echo json_encode($response, true);
?>