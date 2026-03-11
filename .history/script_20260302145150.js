const firebaseConfig = {
  apiKey: "AIzaSyA-dzUI7LmOZh_O-YhaBm14Fi_qb3_Zq4Q",
  authDomain: "stok-tokoku.firebaseapp.com",
  databaseURL: "https://stok-tokoku-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stok-tokoku",
  storageBucket: "stok-tokoku.firebasestorage.app",
  messagingSenderId: "1559507486",
  appId: "1:1559507486:web:00a4e167f373e5c95e340f"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function tambahBarang() {

  const nama = document.getElementById("nama").value;
  const kategori = document.getElementById("kategori").value;
  const harga = document.getElementById("harga").value;
  const stok = document.getElementById("stok").value;
  const supplier = document.getElementById("supplier").value;


  db.ref("barang").push({
    nama,
    kategori,
    harga,
    stok,
    supplier
  })
  alert("Barang berhasil ditambahkan!"); window.location.href = "index.html";
}

function tampilBarang() {
  db.ref("barang").on("value", function(snapshot) {
    const data = snapshot.val();
    let html = "";

    console.log(data);

    if (data) {
      Object.keys(data).forEach(function(key) {
        html += `
          <tr>
            <td>${data[key].nama}</td>
            <td>${data[key].kategori}</td>
            <td>Rp ${data[key].harga}</td>
            <td>${data[key].stok}</td>
            <td>${data[key].supplier}</td>
            <td>
              <button onclick="hapusBarang('${key}')" class="btn btn-danger btn-sm">
                Hapus
              </button>
            </td>
          </tr>
        `;
      });
    }

    const tabel = document.getElementById("dataBarang");
    if (tabel) {
      tabel.innerHTML = html;
    }
  });
}

function hapusBarang(id) {
  if (confirm("Yakin mau hapus barang ini?")) {
    db.ref("barang/" + id).remove();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById("dataBarang")) {
    tampilBarang();
  }
});

