// Ambil elemen canvas
const canvas   = document.getElementById("myCanvas");
const ctx      = canvas.getContext("2d");

// Inisialisasi posisi awal bola
let X           = canvas.width / 2;
let Y           = canvas.height / 2;
const jaribola  = 20;
const speedbola = 5; // kecepatan gerak bola 

// Fungsi umtuk menggambar bola 
function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Bersihkan

    ctx.fillStyle = "#00FF00"; // Warna bola
    ctx.beginPath();
    ctx.arc(X, Y, jaribola, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

// Fungsi untuk menangani input dari keyboard
function moveBall(event) {
    switch (event.key) {
        case "ArrowUp":
            Y -= speedbola; // Gerakan bola ke atas
            break;
        case "ArrowDown":
            Y += speedbola; // Gerakan bola ke bawah
            break;
        case "ArrowLeft":
            X -= speedbola; // Gerakan bola ke kiri
            break;
        case "ArrowRight":
            X += speedbola; // Gerakan bola ke kanan
            break;
    }
    drawBall(); // Gambar ulang bola di posisi baru 
}

// Tambahkan event listener untuk menangkap tombol panah 
document.addEventListener("keydown", moveBall);

// Gambar bola untuk pertama kalinya 
drawBall();