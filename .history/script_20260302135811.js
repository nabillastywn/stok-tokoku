// 🔥 GANTI DENGAN CONFIG DARI FIREBASE
const firebaseConfig = {
  apiKey: "ISI",
  authDomain: "ISI",
  databaseURL: "ISI",
  projectId: "ISI",
  storageBucket: "ISI",
  messagingSenderId: "ISI",
  appId: "ISI"
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