const express = require('express')
const router = express.Router()
const Park = require('../models/park.model')

// Aquí los endpoints

// Creación de nuevos parques
router.get('/new', (req, res) => res.render('parks/new-park'))
router.post('/new', (req, res) => {


    const {
        name,
        description,
    } = req.body

    Park.create({
            name,
            description,
        })
        .then(() => res.redirect('/parks'))
        .catch(err => console.log(err))
})

module.exports = router