<?php
require_once("config.php");
$json = json_decode(file_get_contents('php://input'), true);
  global $connection;
  $q1 = $json['q1'];
  $id = $json['id'];
  $q2_goal1 = $json['q2_goal1'];
  $q2_goal2 = $json['q2_goal2'];
  $q2_goal3 = $json['q2_goal3'];
  $q2_goal4 = $json['q2_goal4'];
  $q2_goal5 = $json['q2_goal5'];
  $q2_goal6 = $json['q2_goal6'];
  $q2_goal7 = $json['q2_goal7'];
  $q2_goal8 = $json['q2_goal8'];
  $q2_goal9 = $json['q2_goal9'];
  $q2_goal10 = $json['q2_goal10'];
  $q2_goal11 = $json['q2_goal11'];
  $q2_goal12 = $json['q2_goal12'];
  $q2_goal13 = $json['q2_goal13'];
  $q2_goal14 = $json['q2_goal14'];
  $q2_goal15 = $json['q2_goal15'];
  $q2_goal16 = $json['q2_goal16'];
  $q2_goal17 = $json['q2_goal17'];

  $q3_goal1 = $json['q3_goal1'];
  $q3_goal2 = $json['q3_goal2'];
  $q3_goal3 = $json['q3_goal3'];
  $q3_goal4 = $json['q3_goal4'];
  $q3_goal5 = $json['q3_goal5'];
  $q3_goal6 = $json['q3_goal6'];
  $q3_goal7 = $json['q3_goal7'];
  $q3_goal8 = $json['q3_goal8'];
  $q3_goal9 = $json['q3_goal9'];
  $q3_goal10 = $json['q3_goal10'];
  $q3_goal11 = $json['q3_goal11'];
  $q3_goal12 = $json['q3_goal12'];
  $q3_goal13 = $json['q3_goal13'];
  $q3_goal14 = $json['q3_goal14'];
  $q3_goal15 = $json['q3_goal15'];
  $q3_goal16 = $json['q3_goal16'];
  $q3_goal17 = $json['q3_goal17'];

  $gender = $json['gender'];
  $age = $json['age'];
  $education_level = $json['education_level'];
  $country = $json['country'];
  $city = $json['city'];
  $disability = $json['disability'];
  $disability_type = $json['disability_type'];
  $partner_id = $json['partner_id'];
  $user_id = $json['user_id'];
  $method = $json['method'];
  $start = $json['start'];
  $end = $json['end'];
  $submission_date = $json['submission_date'];
  $query = "INSERT INTO Surveys (id, q1, q2_goal1, q2_goal2, q2_goal3, q2_goal4, q2_goal5, q2_goal6, q2_goal7, q2_goal8, q2_goal9, q2_goal10, q2_goal11, q2_goal12, q2_goal13, q2_goal14, q2_goal15, q2_goal16, q2_goal17, q3_goal1, q3_goal2, q3_goal3, q3_goal4, q3_goal5, q3_goal6, q3_goal7, q3_goal8, q3_goal9, q3_goal10, q3_goal11, q3_goal12, q3_goal13, q3_goal14, q3_goal15, q3_goal16, q3_goal17, gender, age, education_level, country, city, disability, disability_type, partner_id, user_id, method, start, endDate, submission_date) VALUES('{$id}','{$q1}','{$q2_goal1}', '{$q2_goal2}', '{$q2_goal3}', '{$q2_goal4}', '{$q2_goal5}', '{$q2_goal6}', '{$q2_goal7}', '{$q2_goal8}', '{$q2_goal9}', '{$q2_goal10}','{$q2_goal11}', '{$q2_goal12}', '{$q2_goal13}', '{$q2_goal14}','{$q2_goal15}', '{$q2_goal16}', '{$q2_goal17}', '{$q3_goal1}', '{$q3_goal2}',' {$q3_goal3}', '{$q3_goal4}', '{$q3_goal5}', '{$q3_goal6}', '{$q3_goal7}', '{$q3_goal8}', '{$q3_goal9}', '{$q3_goal10}', '{$q3_goal11}', '{$q3_goal12}', '{$q3_goal13}', '{$q3_goal14}', '{$q3_goal15}', '{$q3_goal16}', '{$q3_goal17}', '{$gender}', '{$age}', '{$education_level}', '{$country}', '{$city}', '{$disability}', '{$disability_type}', '{$partner_id}', '{$user_id}', '{$method}', '{$start}', '{$end}', '{$submission_date}')";
    if(confirm_query(mysqli_query($connection, $query))){
      $myArray['success'] = '1';
      echo json_encode($myArray);
    }else{
    $myArray['success'] = '0';
    echo json_encode($myArray);
  }
?>
