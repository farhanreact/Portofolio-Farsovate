const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 150;
const spokes = 8;

let angle = 0;
let isSpinning = false;
let animationFrame;
let speed = 0;

// Ambil tombol
const btnStartKanan = document.getElementById('start-kanan');
const btnStartKiri = document.getElementById('start-kiri');
const btnFastKanan = document.getElementById('fast-kanan');
const btnFastKiri = document.getElementById('fast-kiri');
const btnStop = document.getElementById('stop');

// Gambar roda dan jari-jarinya
function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar roda
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#3498db';
    ctx.stroke();
    ctx.closePath();

    // Jari-jari
    for (let i = 0; i < spokes; i++) {
        const spokeAngle = angle + (i * (2 * Math.PI / spokes));
        const x = centerX + radius * Math.cos(spokeAngle);
        const y = centerY + radius * Math.sin(spokeAngle);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#2c3e50';
        ctx.stroke();
        ctx.closePath();
    }
}

// Fungsi rotasi
function rotateWheel() {
    if (isSpinning) {
        angle += speed;
        drawWheel();
        animationFrame = requestAnimationFrame(rotateWheel);
    }
}

// Fungsi untuk mulai putaran
function startSpin(direction) {
    if (!isSpinning) {
        speed = direction === 'kanan' ? 0.05 : -0.05;
        isSpinning = true;
        toggleButtons(true);
        rotateWheel();
    }
}

// Fungsi untuk mempercepat
function speedUp(direction) {
    if (isSpinning) {
        if (direction === 'kanan') {
            speed += 0.02;
        } else {
            speed -= 0.02;
        }
    }
}

// Fungsi berhenti
function stopSpin() {
    isSpinning = false;
    cancelAnimationFrame(animationFrame);
    toggleButtons(false);
}

// Enable/Disable tombol
function toggleButtons(state) {
    btnStartKanan.disabled = state;
    btnStartKiri.disabled = state;
    btnFastKanan.disabled = !state;
    btnFastKiri.disabled = !state;
    btnStop.disabled = !state;
}

// Event Listener
btnStartKanan.addEventListener('click', () => startSpin('kanan'));
btnStartKiri.addEventListener('click', () => startSpin('kiri'));
btnFastKanan.addEventListener('click', () => speedUp('kanan'));
btnFastKiri.addEventListener('click', () => speedUp('kiri'));
btnStop.addEventListener('click', stopSpin);

// Inisialisasi awal
toggleButtons(false);
drawWheel();
