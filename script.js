let enteredPin = "";
// UBAH PASSWORD DISINI (Tulis 6 digit angka tanggal lahir dia, misal: 270106)
const pinBenar = "100605"; 

// Pastikan animasi love berjalan setelah halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    // Jalankan animasi love setiap 400ms agar lebih ramai
    setInterval(createLove, 400);
});

function nextPage(pageNumber) {
    // Putar musik otomatis saat pertama klik tap disini
    const audio = document.getElementById('music');
    if (audio && audio.paused) {
        audio.play().catch(e => console.log("Musik menunggu interaksi"));
    }

    // Sembunyikan semua page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Tampilkan page tujuan
    const target = document.getElementById('page' + pageNumber);
    if(target) target.classList.add('active');
}

// Fungsi tombol angka keypad
function pressKey(num) {
    if (enteredPin.length < 6) {
        enteredPin += num;
        updateDots();
        
        // Kalau sudah pas 6 angka, langsung otomatis cek pin
        if (enteredPin.length === 6) {
            setTimeout(checkPin, 250);
        }
    }
}

// Fungsi backspace/hapus angka
function pressDelete() {
    if (enteredPin.length > 0) {
        enteredPin = enteredPin.slice(0, -1);
        updateDots();
    }
}

// Menghitamkan bulatan PIN lockscreen
function updateDots() {
    const dots = document.querySelectorAll('#page10 .dot');
    dots.forEach((dot, index) => {
        if (index < enteredPin.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

// Validasi PIN otomatis
function checkPin() {
    if (enteredPin === pinBenar) {
        nextPage(11); // Buka halaman surat kelulusan/ulang tahun
    } else {
        alert("Salah sayang, dipikir-pikir lagi yaa! 🤍");
        enteredPin = "";
        updateDots();
    }
}

function toggleMusic() {
    const audio = document.getElementById('music');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Fungsi untuk membuat elemen love yang melayang ke atas
function createLove() {
    const love = document.createElement('div');
    love.classList.add('love');
    love.innerHTML = '❤️';
    
    // Posisi horizontal acak (0 - 100vw)
    love.style.left = Math.random() * 100 + 'vw';
    
    // Durasi animasi bervariasi (4 - 8 detik)
    love.style.animationDuration = Math.random() * 4 + 4 + 's';
    
    // Ukuran font bervariasi agar terlihat natural
    love.style.fontSize = (Math.random() * 10 + 15) + 'px';
    
    // Variasi rotasi agar terlihat lebih dinamis
    love.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    document.body.appendChild(love);

    // Hapus elemen dari DOM setelah animasi selesai agar tidak memberatkan browser
    setTimeout(() => {
        love.remove();
    }, 8000);
}