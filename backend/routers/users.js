const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// http://localhost:5000/api/v1/user
router.get(`/`, async (req, res) => {
    try {
        const userList = await User.find()//ค้นหาข้อมูล
            .select('-passwordHash')

        if (userList) {
            console.log('user success')
        }
        res.send(userList)
    } catch (err) {
        res.status(500).json({ success: false }) 

    }
})
// read
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-passwordHash')


        res.status(200).send(user);
    } catch (err) {
        res.status(500).json({ message: 'User ID not found' });
    }

})
// create
router.post('/', async (req, res) => {
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            // passwordHash: (req.body.passwordHash),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        })
        user = await user.save();

        res.send(user)
    } catch (err) {
        return res.status(404).send('user cannot  be create')
    }

})
//delete
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({ success: true, message: 'the user is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "user not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})

// count
router.get(`/get/count`, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        // .populate('category'); // จอยกับ table category

        res.send({
            userCount: userCount
        });
    } catch (err) {
        // err
        res.status(500).json({ success: false });
    }
});

//login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const secret = process.env.secret;
    if (!user) {
        return res.status(400).send('The user not found');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            { expiresIn: '1d' } 
        )

        res.status(200).send({ user: user.email, token: token, id:user.id })
    } else {
        res.status(400).send('password is wrong!');
    }
})

//register
router.post('/register', async (req, res) => {
    try{
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        })
        user = await user.save();


        res.send(user);
    }catch(err){
        return res.status(400).send('the user cannot be created!')
    }
})


module.exports = router;