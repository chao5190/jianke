<?php

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

$db = mysqli_connect("127.0.0.1", "root", "root", "jianke");

$sql = "SELECT * FROM user WHERE username='$username'";
$result = mysqli_query($db,$sql);

$data = array("status" => "error", "data" => array("msg" => "登录失败"));

if(mysqli_num_rows($result) == "1")
{
  $dataT = mysqli_fetch_all($result, MYSQLI_ASSOC);
  if($password == $dataT[0]["password"])
  {
    $data["status"]="success";
    $data["data"]["msg"] = "登录成功";
    echo json_encode($data, true);
  }else
  {
    $data["status"] = "error";
    $data["data"]["msg"] = "登录失败，密码不正确";
    echo json_encode($data, true);
  }

}else
{

  $data["status"] = "error";
  $data["data"]["msg"] = "登录失败，该用户不存在！";
  echo json_encode($data, true);
}

?>