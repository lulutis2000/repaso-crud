const express = require('express')
const router = express.Router()
const Coaster = require('../models/coaster.model')
const Park = require('../models/park.model')
// Aquí los endpoints

// Creación de nuevos coasters
router.get('/new', (req, res) => {

    Park.find()
        .then(allParks => res.render('coasters/new-coaster', {
            park: allParks
        }))
        .catch(err => console.log("Error consultando los parques en la BBDD: ", err))
})

router.post('/new', (req, res) => {


    const {
        name,
        description,
        inversions,
        length,
        park
    } = req.body

    Coaster.create({
            name,
            description,
            inversions,
            length,
            park
        })
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log(err))
})

// Listados de coasters
router.get('/', (req, res) => {
    Coaster.find()
        .then(allCoasters => res.render('coasters/coasters-index', {
            coaster: allCoasters
        }))
        .catch(err => console.log("Error consultando los coasters en la BBDD: ", err))
})

// Detalle de coasters
router.get('/details/:coasterId', (req, res) => {

    const coasterId = req.params.coasterId

    Coaster.findById(coasterId)
        .populate('park')
        .then(coast => res.render('coasters/coaster-details', coast))
        .catch(err => console.log("Error consultando los detalles del coaster en la BBDD: ", err))
})

//Eliminar coasters


router.get('/delete/:id', (req, res, next) => {

    const coasterId = req.params.id

    Coaster.findByIdAndRemove(coasterId)
        .then(() => res.redirect('/coasters/'))
        .catch(err => console.log(err))
})

// // Editar coaster
router.get('/edit/:coasterId', (req, res) => {

    const coasterId = req.params.coasterId

    const toEdit = {

    }

    Coaster.findById(coasterId)
        .then(coast => {
            toEdit.coaster = coast

        })
        .then(() => Park.find().then(park => {
            toEdit.park = park
            //console.log(toEdit)
        }))
        .then(() => res.render('coasters/coasters-edit', toEdit))
        .catch(err => console.log(err))
})
router.post('/edit/:coasterId', (req, res) => {

    const coasterId = req.params.coasterId

    const coaster1 = {
        name,
        description,
        inversions,
        length,
        park
    } = req.body


    Coaster.findByIdAndUpdate(coasterId, coaster1)
        .then(x => res.redirect(`/coasters/details/${coasterId}`))
        .catch(err => console.log(err))
})

module.exports = router