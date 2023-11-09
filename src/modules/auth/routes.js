const express = require('express');
const router = express.Router();
const responses = require('../../network/responses');
const controller = require('./index');

const cors = require('cors');

// Create a CORS middleware
const corsMiddleware = cors({
    origin: '*', // Allow requests from all origins
});

// Apply the CORS middleware to the router
router.use(corsMiddleware);

//RUTAS PARA CONSULTAR
router.post('/login', login);

//CONSULTAR UN SOLO ÍTEM
async function login(req, res, next) {
    try {
        const token = await controller.login(req.body.user, req.body.password);
        responses.success(req, res, token, 200);
    }
    catch (err) {
        next('Server Off');
    }
};


//EXPORTA LOS DATOS
module.exports = router;