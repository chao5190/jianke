<?php
$table=$_POST['table'];
$db=mysqli_connect("127.0.0.1","root","root","jianke");
$sql="select * from $table";
$sql= str_replace("\"","",$sql);
$result=mysqli_query($db,$sql);
$data=mysqli_fetch_all($result,MYSQLI_ASSOC);
$response=array("status"=>"success","data"=>$data);
echo json_encode($response, true);
?>