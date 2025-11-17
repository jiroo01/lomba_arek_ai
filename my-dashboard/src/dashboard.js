function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById(id).style.display = "block";

    if (id === "absensi") loadAbsensi();
    if (id === "nilai") loadNilai();
    if (id === "analytics") loadAnalytics();
}

function loadAbsensi() {
    const data = JSON.parse(localStorage.getItem("absensi") || "[]");
    const table = document.getElementById("absensiTable");

    table.innerHTML = "<tr><th>Nama</th><th>Tanggal</th><th>Status</th></tr>";

    data.forEach(row => {
        table.innerHTML += `<tr>
            <td>${row.nama}</td>
            <td>${row.tanggal}</td>
            <td>${row.status}</td>
        </tr>`;
    });
}
/* ===============================
   BAGIAN DATA SISWA
=============================== */
document.addEventListener("DOMContentLoaded", () => {
    loadSiswa();
    loadKnowledge();
});

document.getElementById("formTambahSiswa")?.addEventListener("submit", function(e){
    e.preventDefault();

    let nama = document.getElementById("namaSiswa").value;
    let nis = document.getElementById("nisSiswa").value;
    let kelas = document.getElementById("kelasSiswa").value;
    let foto = document.getElementById("fotoSiswa").files[0];

    let reader = new FileReader();
    reader.onload = function(){
        let imgBase64 = reader.result;

        let dataSiswa = JSON.parse(localStorage.getItem("dataSiswa") || "[]");

        dataSiswa.push({
            nama: nama,
            nis: nis,
            kelas: kelas,
            foto: imgBase64
        });

        localStorage.setItem("dataSiswa", JSON.stringify(dataSiswa));

        loadSiswa();
        alert("Siswa berhasil ditambahkan!");
    };

    reader.readAsDataURL(foto);
});


function loadSiswa() {
    let dataSiswa = JSON.parse(localStorage.getItem("dataSiswa") || "[]");
    let tbody = document.querySelector("#tabelSiswa tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    dataSiswa.forEach((s, i) => {
        let tr = `
            <tr>
                <td><img src="${s.foto}" width="70"></td>
                <td>${s.nama}</td>
                <td>${s.nis}</td>
                <td>${s.kelas}</td>
                <td><button onclick="hapusSiswa(${i})">Hapus</button></td>
            </tr>
        `;
        tbody.innerHTML += tr;
    });
}

function hapusSiswa(i){
    let dataSiswa = JSON.parse(localStorage.getItem("dataSiswa") || "[]");
    dataSiswa.splice(i, 1);
    localStorage.setItem("dataSiswa", JSON.stringify(dataSiswa));
    loadSiswa();
}

/* ===============================
   KNOWLEDGE AI
=============================== */

function simpanKnowledge() {
    let text = document.getElementById("knowledgeText").value;
    localStorage.setItem("knowledgeAI", text);
    alert("Knowledge AI tersimpan!");
}

function loadKnowledge() {
    document.getElementById("knowledgeText").value =
        localStorage.getItem("knowledgeAI") || "";
}

function loadNilai() {
    const table = document.getElementById("nilaiTable");
    table.innerHTML = "<tr><th>Nama</th><th>Mapel</th><th>Nilai</th></tr>";

    const nilai = [
        { nama: "Siswa X", mapel: "Matematika", nilai: 88 },
        { nama: "Siswa X", mapel: "Bahasa Indonesia", nilai: 92 }
    ];

    nilai.forEach(r => {
        table.innerHTML += `<tr>
            <td>${r.nama}</td>
            <td>${r.mapel}</td>
            <td>${r.nilai}</td>
        </tr>`;
    });
}

function saveKnowledge() {
    const knowledge = document.getElementById("knowledgeInput").value;
    localStorage.setItem("knowledge", knowledge);
    alert("Knowledge updated!");
}

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

function loadAnalytics() {
    document.getElementById("totalChat").innerText =
        JSON.parse(localStorage.getItem("chatCount") || "0");
}
.