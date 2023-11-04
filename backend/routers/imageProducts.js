const { ImageProducts } = require('../models/imageProducts')
const multer = require('multer');
const express = require('express');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// http://localhost:3000/api/v1/community



//list
router.get(`/`, async (req, res) => {
    try {
        const CommunityList = await ImageProducts.find();//ค้นหาข้อมูล

        res.status(200).send(CommunityList) 
    } catch (err) {
        res.status(500).json({ success: false })
    }

})
//read
router.get('/:id', async (req, res) => {
    try {
        const Read = await ImageProducts.findById(req.params.id)


        res.status(200).send(Read);
    } catch (err) {
        res.status(500).json({ message: 'User ID not found' });
    }

})


//post
router.post("/", async (req, res) => {
    const body = req.body;
    try {
        const newImage = await ImageProducts.create(body)
        newImage.save();
        res.status(201).json({ msg: "New image uploaded...!" })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})
 
router.delete('/:id', (req, res) => {
    try {
        ImageProducts.findByIdAndRemove(req.params.id)
            .then(product => {
                if (product) {
                    return res.status(200).json({ success: true, message: 'Image product is delete' })
                } else {
                    return res.status(404).json({ success: false, message: 'Image product is delete' })
                }
            }) 
    } catch (err) {
        console.log(err)
        return res.status(404).json({ success: false, error: err })
    }

})




module.exports = router;




