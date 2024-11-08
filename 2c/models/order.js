const OrderDetail = require('./OrderDetail');
class Order {
    constructor() {
        this.orderDetails = [];
        this.total = 0;
    }

    tambahProduk(produk, kuantitas) {
        const detail = new OrderDetail(produk, kuantitas);
        this.orderDetails.push(detail);
        this.updateTotal();
    }

    updateTotal() {
        this.total = this.orderDetails.reduce((acc, detail) => acc + detail.subTotal, 0);
    }

    cetakStruk() {
        console.log("====== Struk Pembelian ======");
        this.orderDetails.forEach((detail, index) => {
            console.log(
                `${index + 1}. ${detail.produk.nama} - Rp${detail.produk.harga} x ${detail.kuantitas} = Rp${detail.subTotal}`
            );
        });
        console.log("=============================");
        console.log(`Total Pembayaran: Rp${this.total}`);
    }
}

module.exports = Order;