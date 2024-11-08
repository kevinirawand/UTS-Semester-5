const readline = require('readline');
const Produk = require('./models/Produk');
const Order = require('./models/Order');

const produkList = [];
let productId = 1;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("===== Selamat datang di Kasir =====");

function tambahProdukBaru() {
    rl.question('Masukkan nama produk (atau ketik "selesai" jika sudah selesai menambah produk): ', (nama) => {
        if (nama.toLowerCase() === 'selesai') {
            if (produkList.length === 0) {
                console.log("Anda harus menambahkan minimal satu produk.");
                return tambahProdukBaru();
            }
            console.log("\nDaftar Produk:");
            produkList.forEach((produk) => {
                console.log(`${produk.id}. ${produk.nama} - Rp${produk.harga}`);
            });
            buatOrder();
            return;
        }

        rl.question('Masukkan harga produk: ', (hargaInput) => {
            const harga = parseInt(hargaInput);
            if (isNaN(harga) || harga <= 0) {
                console.log("Harga tidak valid. Silakan coba lagi.");
                return tambahProdukBaru();
            }

            const produk = new Produk(productId++, nama, harga);
            produkList.push(produk);
            console.log(`Produk "${nama}" berhasil ditambahkan dengan harga Rp${harga}.`);
            tambahProdukBaru();
        });
    });
}

function buatOrder() {
    const order = new Order();

    function tanyaProduk() {
        rl.question('Masukkan ID produk yang ingin ditambahkan (atau ketik "selesai" untuk mencetak struk): ', (inputId) => {
            if (inputId.toLowerCase() === 'selesai') {
                order.cetakStruk();
                rl.close();
                return;
            }

            const produk = produkList.find((p) => p.id === parseInt(inputId));
            if (!produk) {
                console.log("ID produk tidak valid. Silakan coba lagi.");
                return tanyaProduk();
            }

            rl.question(`Masukkan kuantitas untuk ${produk.nama}: `, (inputKuantitas) => {
                const kuantitas = parseInt(inputKuantitas);
                if (isNaN(kuantitas) || kuantitas <= 0) {
                    console.log("Kuantitas tidak valid. Silakan coba lagi.");
                } else {
                    order.tambahProduk(produk, kuantitas);
                    console.log(`Ditambahkan: ${produk.nama} x ${kuantitas} (Subtotal: Rp${produk.harga * kuantitas})`);
                }
                tanyaProduk();
            });
        });
    }

    tanyaProduk();
}

tambahProdukBaru();