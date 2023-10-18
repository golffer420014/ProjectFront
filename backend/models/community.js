const mongoose = require('mongoose');


const communitySchema = mongoose.Schema({
    userId: {
        type: String,
        require:true
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
    },
    imageUrl: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    likes: {
        type: [String],
        default: []
    },
    
   
}, {timestamps:true})

communitySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

communitySchema.set('toJSON', {
    virtuals: true,
})


//สร้าง tabel Product โดยเรียกใช้ function productSchema
exports.Community = mongoose.model('Community', communitySchema);