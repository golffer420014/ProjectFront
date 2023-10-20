const mongoose = require('mongoose');


const imageProductsSchema = mongoose.Schema({
    myFile: String
}, { timestamps: true })

imageProductsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

imageProductsSchema.set('toJSON', {
    virtuals: true,
})


//สร้าง tabel Product โดยเรียกใช้ function productSchema
exports.ImageProducts = mongoose.model('ImageProducts', imageProductsSchema);