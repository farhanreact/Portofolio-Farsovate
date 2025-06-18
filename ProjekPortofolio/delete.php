<?php
$conn = new mysqli("localhost", "root", "", "db_contact1");
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['id'])) {
  $id = intval($_POST['id']);
  $conn->query("DELETE FROM contact_messages WHERE id = $id");
}

$conn->close();
header("Location: inbox.php");
exit;
