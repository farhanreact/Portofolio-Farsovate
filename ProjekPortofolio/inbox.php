<?php
$conn = new mysqli("localhost", "root", "", "db_contact1");
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$result = $conn->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Inbox Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    ::selection {
      background-color: #60a5fa; /* Biru muda saat seleksi */
      color: white;
    }
  </style>
</head>
<body class="bg-gradient-to-br from-blue-100 via-teal-100 to-green-100 min-h-screen font-sans text-gray-800">

  <div class="max-w-6xl mx-auto py-10 px-6">
    
    <!-- Header -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-blue-800 drop-shadow-sm mb-2">📨 Inbox Messages</h1>
      <p class="text-gray-600">All messages received through your contact form</p>
    </div>

    <!-- Table Container -->
    <div class="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gradient-to-r from-blue-200 via-teal-200 to-green-200 text-gray-700 text-sm uppercase">
          <tr>
            <th class="px-6 py-4 text-left">#</th>
            <th class="px-6 py-4 text-left">👤 Name</th>
            <th class="px-6 py-4 text-left">📧 Email</th>
            <th class="px-6 py-4 text-left">💬 Message</th>
            <th class="px-6 py-4 text-left">⏰ Time</th>
            <th class="px-6 py-4 text-left">🗑️ Action</th>
          </tr>
        </thead>
        <tbody class="text-sm divide-y divide-gray-100">
          <?php $no = 1; while($row = $result->fetch_assoc()): ?>
            <tr class="hover:bg-teal-50 transition duration-200">
              <td class="px-6 py-4 font-semibold"><?= $no++ ?></td>
              <td class="px-6 py-4"><?= htmlspecialchars($row['name']) ?></td>
              <td class="px-6 py-4 text-blue-600"><?= htmlspecialchars($row['email']) ?></td>
              <td class="px-6 py-4 whitespace-pre-line"><?= nl2br(htmlspecialchars($row['message'])) ?></td>
              <td class="px-6 py-4 text-gray-500"><?= $row['created_at'] ?></td>
              <td class="px-6 py-4">
                <!-- Delete -->
                <form action="delete.php" method="POST" onsubmit="return confirm('Are you sure you want to delete this message?');">
                  <input type="hidden" name="id" value="<?= $row['id'] ?>">
                  <button type="submit" class="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded shadow-md">
                    Delete
                  </button>
                </form>
                <!-- Delete end-->
              </td>
            </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div class="mt-10 text-center text-sm text-gray-500">
      &copy; <?= date("Y") ?> Your Cool Inbox Dashboard 🧊 Made with 💻 by Farhan
    </div>

  </div>

</body>
</html>

<?php $conn->close(); ?>
