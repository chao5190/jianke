<?php
$id=$_POST['id'];
$db=mysqli_connect("127.0.0.1","root","root","jianke");
$sql="select * from `liebiao` where id=$id";
$result=mysqli_query($db,$sql);
$data=mysqli_fetch_all($result,MYSQLI_ASSOC);
$commodityId=$data[0]["id"];
$commodityName=$data[0]["p"];
$src=$data[0]["src"];
$count=$_POST['count'];
echo $count;
// echo $src;
// echo $commodityId;
if ($commodityId==2) {
    $commodityName2=strtok($commodityName,"黑");
}else {
    $commodityName2=strtok($commodityName," ");
}
// echo substr(($commodityName),0,10)."<br>";
$price=$data[0]["span"];
// echo $price;
$sql="select * from `commodity` where commodityId=$id";

$result=mysqli_query($db,$sql);
// print_r($result2);
// $totalCount = $result2->num_rows;
$num_rows =mysqli_num_rows($result);
if($num_rows==1){
    echo "更新";
    $sql="update  `commodity` set count=$count where commodityId=$id";
    echo $sql;
    mysqli_query($db,$sql);
}else{
$sql="insert into `commodity` values ('$commodityId','$commodityName2','$src','$price',1)";
$result=mysqli_query($db,$sql);
$sql="select * from `commodity`";
$result=mysqli_query($db,$sql);
// $data3=mysqli_fetch_all($result,MYSQLI_ASSOC);
// print_r($data3);
}
echo "添加成功"
?>