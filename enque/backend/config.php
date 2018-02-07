<?php
$dbhost = "localhost";
$dbuser = "enque_admin";
$dbname = "Enque";
$dbpass = "Hackathon";
$connection = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
if(mysqli_connect_errno()){
	die("Database connection failed: ". mysqli_connect_error(). "(".mysqli_connect_errno().")");
}
function confirm_query($result){
	if(!$result){
	 return false;
}else{
  return true;
}
}
?>
