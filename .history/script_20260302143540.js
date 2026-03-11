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

  if (!nama || !kategori || !harga || !stok || !supplier) {
    alert("Semua field wajib diisi!");
    return;
  }

  db.ref("barang").push({
    nama: nama,
    kategori: kategori,
    harga: harga,
    stok: stok,
    supplier: supplier
  });

  alert("Barang berhasil ditambahkan!");

  window.location.href = "index.html";
}

function tambahBarang() {
  const nama = document.getElementById("nama").value;
  const kategori = document.getElementById("kategori").value;
  const harga = document.getElementById("harga").value;
  const stok = document.getElementById("stok").value;
  const supplier = document.getElementById("supplier").value;

  if (!nama || !kategori || !harga || !stok || !supplier) {
    alert("Semua field wajib diisi!");
    return;
  }

  db.ref("barang").push({
    nama: nama,
    kategori: kategori,
    harga: harga,
    stok: stok,
    supplier: supplier
  });

  alert("Barang berhasil ditambahkan!");
  window.location.href = "index.html";
}