<?php
$id=$_POST['id'];
$db=mysqli_connect("127.0.0.1","root","root","jianke");
$sql="select * from `liebiao` where id=$id";
$result=mysqli_query($db,$sql);
$data=mysqli_fetch_all($result,MYSQLI_ASSOC);
$response=array("status"=>"success","data"=>$data);
echo json_encode($response, true);
?>