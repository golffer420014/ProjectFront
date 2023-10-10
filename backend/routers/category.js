const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

// http://localhost:5000/api/v1/category
// list
router.get(`/`, async (req, res) => {
    try {
        const categoryList = await Category.find();//ค้นหาข้อมูล

        res.status(200).send(categoryList)
    } catch (err) {
        res.status(500).json({ success: false })
    }
    
})
// read
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        res.status(200).send(category);
    } catch (err) {
        res.status(500).json({ message: 'Category ID not found' });
    }

})
// create
router.post('/', async (req, res) => {
    try {
        let category = new Category({
            name: req.body.name,
            icon: req.body.icon || category.icon,
            color: req.body.color,
        })
        category = await category.save();

        res.send(category)
    } catch (err) {
        return res.status(404).send('category cannot  be create')
    }
    
})
// edit
router.put('/:id',async(req,res)=>{
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color,
            },
            { new: true }
        )

        res.send(category)
    } catch (err) {
        return res.status(404).send('category cannot be update')
    }
    
})
// delete
router.delete('/:id', (req, res) => {
    try {
        Category.findByIdAndRemove(req.params.id)
            .then(category => {
                if (category) {
                    return res.status(200).json({ success: true, message: 'category is delete' })
                } else {
                    return res.status(404).json({ success: false, message: 'category not found' })
                }
            })
    } catch (err) {
        return res.status(404).json({ success: false, error: err })
    }
    
})


module.exports = router;