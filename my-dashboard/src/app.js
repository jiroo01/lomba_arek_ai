const GEMINI_API_KEY = "AIzaSyAE_pZCXK6QQZS20yIOHl_FitP8VHW8WQM";

function startCamera() {
    const video = document.getElementById("cam");
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { video.srcObject = stream; })
        .catch(err => alert("Akses kamera ditolak"));
}

startCamera();

async function scanWajah() {
    const video = document.getElementById("cam");
    const canvas = document.getElementById("captureCanvas");
    const ctx = canvas.getContext("2d");

    if (!video) {
        alert("Video element 'cam' tidak ditemukan!");
        return;
    }

    // Sesuaikan ukuran canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Tangkap frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");

    if (!imageData || imageData.length < 1000) {
        alert("Gagal menangkap gambar dari kamera!");
        return;
    }

    // Kirim ke Gemini
    try {
        const result = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAE_pZCXK6QQZS20yIOHl_FitP8VHW8WQM",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                { text: "Analisa wajah ini dan tentukan apakah cocok dengan data siswa." },
                                {
                                    inline_data: {
                                        mime_type: "image/jpeg",
                                        data: imageData.split(",")[1]
                                    }
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const response = await result.json();
        console.log(response);

        if (!response.candidates) {
            alert("AI tidak merespon!");
            return;
        }

        alert("Wajah berhasil dianalisa AI!");
    } catch (err) {
        console.error(err);
        alert("Gagal membaca wajah (AI tidak merespon)");
    }
}


// -------------------------
// SIMPAN ABSENSI
// -------------------------
function simpanAbsensi(nama) {
    let absensi = JSON.parse(localStorage.getItem("absensi") || "[]");

    absensi.push({
        nama: nama,
        tanggal: new Date().toISOString().split("T")[0],
        status: "Hadir"
    });

    localStorage.setItem("absensi", JSON.stringify(absensi));

    alert("Absensi berhasil disimpan!");
}
