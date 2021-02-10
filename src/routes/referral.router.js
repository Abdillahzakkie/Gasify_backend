const router = require('express').Router();

const { 
    addNewReferral, 
    getAllReferrer, 
    findReferrerByAddress, 
    newUserRegistration,
    getAllRegisteredUser
} = require('../helpers/index');

router.get('/', async (req, res) => {
    try {
        const result = await getAllReferrer();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get('/findReferrerByAddress', async (req, res) => {
    try {
        const result = await findReferrerByAddress(req.query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
})

router.post('/addReferrer', async (req, res) => {
    try {
        const result = await addNewReferral(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
});


router.post('/register', async (req, res) => {
    try {
        const result = await newUserRegistration(req.query);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
})

router.get('/getAllRegisteredUser', async (req, res) => {
    try {
        const result = await getAllRegisteredUser();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
})

module.exports = router;