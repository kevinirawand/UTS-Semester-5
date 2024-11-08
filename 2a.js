const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function validasiInput(jariJari, tinggi) {
    if (!jariJari || isNaN(jariJari) || jariJari <= 0) {
        throw new Error("Input jari-jari harus berupa angka positif");
    }
    if (tinggi !== undefined && (isNaN(tinggi) || tinggi <= 0)) {
        throw new Error("Jika tinggi diberikan, maka harus berupa angka positif");
    }
}

// Fungsi menghitung luas lingkaran
function hitungLuasLingkaran(jariJari) {
    return Math.PI * Math.pow(jariJari, 2);
}

function hitungLuasPersegiPanjang(jariJari, tinggi) {
    return 2 * Math.PI * jariJari * tinggi;
}

function hitungLuasPermukaanTabung(luasAlas, luasSelimut) {
    return 2 * luasAlas + luasSelimut;
}

function main() {
    rl.question('Masukkan jari-jari: ', (inputJariJari) => {
        const jariJari = parseFloat(inputJariJari);

        rl.question('Masukkan tinggi (opsional): ', (inputTinggi) => {
            const tinggi = inputTinggi ? parseFloat(inputTinggi) : undefined;

            try {
                validasiInput(jariJari, tinggi);

                let hasil;
                let luasAlas = hitungLuasLingkaran(jariJari);

                if (tinggi !== undefined) {
                    let luasSelimut = hitungLuasPersegiPanjang(jariJari, tinggi);
                    hasil = hitungLuasPermukaanTabung(luasAlas, luasSelimut);
                    console.log(`Luas permukaan tabung adalah: ${hasil.toFixed(2)}`);
                } else {
                    hasil = luasAlas;
                    console.log(`Luas lingkaran adalah: ${hasil.toFixed(2)}`);
                }

            } catch (error) {
                console.error(error.message);
            } finally {
                rl.close();
            }
        });
    });
}

main();