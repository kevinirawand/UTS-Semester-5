class OrderDetail {
    constructor(produk, kuantitas) {
        this.produk = produk;
        this.kuantitas = kuantitas;
        this.subTotal = this.hitungSubTotal();
    }

    hitungSubTotal() {
        return this.produk.harga * this.kuantitas;
    }
}

module.exports = OrderDetail;