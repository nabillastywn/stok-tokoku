const firebaseConfig = {
  apiKey: "AIzaSyA-dzUI7LmOZh_O-YhaBm14Fi_qb3_Zq4Q",
  authDomain: "stok-tokoku.firebaseapp.com",
  databaseURL:
    "https://stok-tokoku-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stok-tokoku",
  storageBucket: "stok-tokoku.firebasestorage.app",
  messagingSenderId: "1559507486",
  appId: "1:1559507486:web:00a4e167f373e5c95e340f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();

//========================= CREATE =========================//

function tambahBarang() {
  const nama = document.getElementById("nama").value;
  const kategori = document.getElementById("kategori").value;
  const harga = document.getElementById("harga").value;
  const stok = document.getElementById("stok").value;
  const supplier = document.getElementById("supplier").value;

  db.ref("barang")
    .push({
      nama,
      kategori,
      harga,
      stok,
      supplier,
    })
    .then(() => {
      alert("Data berhasil diupdate!");
      window.location.href = "index.html";
    });
}

//========================= READ =========================//

function tampilBarang() {
  db.ref("barang").on("value", function (snapshot) {
    const data = snapshot.val();
    let html = "";

    console.log(data);

    if (data) {
      let no = 1;

      Object.keys(data).forEach(function (key) {
        html += `
        <tr>
            <td>${no++}</td>
            <td>${data[key].nama}</td>
            <td>${data[key].kategori}</td>
            <td>Rp ${data[key].harga}</td>
            <td>${data[key].stok}</td>
            <td>${data[key].supplier}</td>
            <td>
                <a href="edit-stok.html?id=${key}" class="btn btn-warning btn-sm me-1">
                    <i class="bi bi-pencil-square"></i>
                </a>
                <button onclick="hapusBarang('${key}')" 
                    class="btn btn-danger btn-sm">
                    <i class="bi bi-trash"></i>
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

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("dataBarang")) {
    tampilBarang();
  }
});

//========================= UPDATE =========================//

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function loadDataEdit() {
  const id = getIdFromUrl();
  if (!id) return;

  db.ref("barang/" + id).once("value", function (snapshot) {
    const data = snapshot.val();
    if (data) {
      document.getElementById("id").value = id;
      document.getElementById("nama").value = data.nama;
      document.getElementById("kategori").value = data.kategori;
      document.getElementById("harga").value = data.harga;
      document.getElementById("stok").value = data.stok;
      document.getElementById("supplier").value = data.supplier;
    }
  });
}

function updateBarang() {
  const id = document.getElementById("id").value;

  const nama = document.getElementById("nama").value;
  const kategori = document.getElementById("kategori").value;
  const harga = document.getElementById("harga").value;
  const stok = document.getElementById("stok").value;
  const supplier = document.getElementById("supplier").value;

  db.ref("barang/" + id)
    .update({
      nama,
      kategori,
      harga,
      stok,
      supplier,
    })
    .then(() => {
      alert("Data berhasil diupdate!");
      window.location.href = "index.html";
    });
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("edit-stok.html")) {
    loadDataEdit();
  }
});

// AUTH
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      user.sendEmailVerification().then(() => {
        alert("Register berhasil! Silakan cek email untuk verifikasi.");
        window.location.href = "login.html";
      });
    })
    .catch((error) => {
      alert(error.message);
    });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Email belum diverifikasi! Silakan cek email kamu.");
        auth.signOut();
        return;
      }

      alert("Login berhasil!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        alert("Akun tidak ditemukan!");
      } else if (error.code === "auth/wrong-password") {
        alert("Password salah!");
      } else {
        alert(error.message);
      }
    });
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}

firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    if (
      !window.location.pathname.includes("login.html") &&
      !window.location.pathname.includes("register.html")
    ) {
      window.location.href = "login.html";
    }
  }
});
