<?php

require("connect.php");


$firstName = $_POST['first_name'];
$last_name = $_POST['last_name'];
$postal_code = $_POST['postal_code'];
$street = $_POST['street'];
$house_number = $_POST['house_number'];
$city = $_POST['city'];
$age = $_POST['age'];
$rcp = $_POST['rcp_number'];

$sql = "INSERT INTO usersrcp(RCP, Imie, Nazwisko, `Kod pocztowy`, Ulica, `Numer domu`, Miasto, Wiek) 
VALUES ('$rcp','$firstName','$last_name','$postal_code','$street','$house_number','$city','$age')";
$sql2 = "SELECT RCP, Imie, Nazwisko from usersrcp";

$result = $conn->query($sql);
$result2 = $conn->query($sql2);

if ($result2->num_rows > 0) {
    while ($row = $result2->fetch_assoc()) {
        echo "Imię: " . $row['Imie'] . " Nazwisko: " . $row['Nazwisko'] . " RCP: " . $row['RCP'] . "<br />";
    }
} else {
    echo "Nie znaleziono rekordów!";
}
?>

