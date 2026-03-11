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

function tampilBarang() {
  db.ref("barang").on("value", function(snapshot) {
    const data = snapshot.val();
    let html = "";

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
              <button onclick="hapusBarang('${key}')" class="btn btn-danger btn-sm">Hapus</button>
            </td>
          </tr>
        `;
      });
    }

    document.getElementById("dataBarang").innerHTML = html;
  });
}

if (window.location.pathname.includes("index.html")) {
  tampilBarang();
}

window.onload = function() {
  if (document.getElementById("dataBarang")) {
    tampilBarang();
  }
};

function hapusBarang(id) {
  if (confirm("Yakin mau hapus barang ini?")) {
    db.ref("barang/" + id).remove();
    alert("Barang berhasil dihapus!");
  }
}