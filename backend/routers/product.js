const { Category } = require('../models/category');
const { Product } = require('../models/product')
const { ImageProducts } = require('../models/imageProducts')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer')

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        // cb = callback
        cb(uploadError, 'C:/Users/golfy/Desktop/lern-mern/backend/public/uploads')
    },
    filename: function (req, file, cb) {
        //ทุกพื้นที่ว่างจะถูกเติมด้วย - เช่น 'golf suriya' จะเป็น 'golf-suriya'
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
})

const uploadOptions = multer({ storage: storage })

// http://localhost:5000/api/v1/product
// list
router.get(`/`, async (req, res) => {
    // สามารถค้นหา product ตาม หมวดหมู่ ได้มากกว่า 1 หมวดหมู่
    // ตัวอย่างการใช้งาน ค้นหา product ที่อยู่หมวดหมู่ วัด , ทะเล // เช็ค ID ได้จาก category
    // http://localhost:5000/api/v1/product?category=6513de3a038cc48872286293,6513de41038cc48872286295
    try {
        let filter = {};
        if (req.query.category) {
            console.log(req.query.category)
            filter = { category: req.query.category.split(',') }
        }
        
        const productList = await Product.find(filter)//ค้นหาข้อมูล
            .populate('category').populate('imageProducts');
        //exmaple .select -> Product.find().select('name iages ratting')

        res.send(productList)
    } catch (err) {
        res.status(500).json({ success: false })

    }

})
//read
router.get(`/:id`, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category'); // จอยกับ table category

        res.send(product)
    } catch (err) {
        // err
        res.status(500).json({ success: false })
    }
})


//create
router.post(`/`, async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        if (!category) return res.status(400).send('invalid Category')

        const image = await ImageProducts.findById(req.body.imageProducts);
        if (!image) return res.status(400).send('invalid image')


        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            imageProducts: req.body.imageProducts,
            location: req.body.location,
            rating: req.body.rating,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        })

        product = await product.save();
        res.send(product)
    } catch (err) {
        res.status(500).send('product cannot be create')
    }
})




// edit
router.put('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id');
        }

        const category = await Category.findById(req.body.category);
        if (!category) {
            res.status(500).send('Invalid Category')
        }

        const product = await Product.findById(req.body.category);
        if (!product) {
            res.status(500).send('Invalid product')
        }

        const file = req.file;
        let imagepath;
        if (file) {
            const fileNanme = req.file.filename
            // req.protocol = htpp // req.get = localhost
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
            imagepath = `${basePath}${fileNanme}`
        } else {
            imagepath = product.image
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                ritchDescription: req.body.ritchDescription,
                image: imagepath,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
            },
            { new: true }
        )
        res.send(updatedProduct)
    } catch (err) {
        res.status(400).send('invalid Product Or Something wrong')
    }
})
// delete
router.delete('/:id', (req, res) => {
    try {
        Product.findByIdAndRemove(req.params.id)
            .then(product => {
                if (product) {
                    return res.status(200).json({ success: true, message: 'product is delete' })
                } else {
                    return res.status(404).json({ success: false, message: 'product not found' })
                }
            })
    } catch (err) {
        console.log(err)
        return res.status(404).json({ success: false, error: err })
    }

})

// count
router.get(`/get/count`, async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        // .populate('category'); // จอยกับ table category

        res.send({
            productCount: productCount
        });
    } catch (err) {
        // err
        console.log(err);
        res.status(500).json({ success: false });
    }
});

// featured เป็น function ที่อยากจะให้โชว์สินค้ากี่อันเช่น products/get/featured/10 ก็จะแสดงสินค้า 10 อัน
//http://localhost:5000/api/v1/products/get/featured/1
router.get(`/get/featured/:count`, async (req, res) => {
    try {
        const count = req.params.count ? req.params.count : 0
        const product = await Product.find({ isFeatured: true }).limit(+count)
        // .populate('category'); // จอยกับ table category

        res.send(product)
    } catch (err) {
        // err
        console.log(err);
        res.status(500).json({ success: false }); 
    }
});

router.put( 
    '/gallery-images/:id', 
    uploadOptions.array('images', 10),
    async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) { 
            return res.status(400).send('Invalid Product Id');
        }
        const files = req.files;
        let imagesPaths = [];
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        if (files) {
            files.map((file) => {
                imagesPaths.push(`${basePath}${file.filename}`);
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths,
            },
            { new: true }
        );

        if (!product)
            return res.status(500).send('the gallery cannot be updated!');

        res.send(product);
    }
);



module.exports = router;