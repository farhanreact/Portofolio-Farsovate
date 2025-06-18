<?php
// Connect to database
$host = "localhost";
$user = "root";
$pass = "";
$db   = "db_contact1";

$conn = new mysqli($host, $user, $pass, $db);

// Check Connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Retrieve data from the form
$name    = $_POST['name'];
$email   = $_POST['email'];
$message = $_POST['message'];

// Save to Database
$sql = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $message);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Contact Response</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .fade-in {
      animation: fadeIn 1s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100">

  <div class="bg-white fade-in rounded-xl shadow-xl p-8 max-w-md w-full text-center border border-purple-200">
    <?php if ($stmt->execute()) : ?>
      <svg class="mx-auto mb-4 w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <h1 class="text-2xl font-bold text-green-600 mb-2">Message Sent!</h1>
      <p class="mb-4">Thank you, <span class="font-semibold"><?= htmlspecialchars($name) ?></span>. We'll be in touch!</p>
    <?php else : ?>
      <svg class="mx-auto mb-4 w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <h1 class="text-2xl font-bold text-red-600 mb-2">Something went wrong!</h1>
      <p class="mb-4">Error: <?= $stmt->error ?></p>
    <?php endif; ?>

    <a href="port.html" class="mt-4 inline-block px-5 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition duration-200 shadow">
      ← Back to Site
    </a>
  </div>

</body>
</html>

<?php
$stmt->close();
$conn->close();
?>
