const express = require('express');
const router = express.Router();
const security = require('./security');
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
router.get('/', security(), data);
router.get('/:id', security(), oneData);
router.get('/reportVisitors/:dateandhourentry/:dateandhourexit', security(), reportVisitorEntrysDates);
router.get('/reportResident/:dateandhourentry/:dateandhourexit', security(), reportResidentEntrysDates);
router.post('/', security(), addData);
router.put('/', security(), deleteData);

//CONSULTAR TODOS LOS ÍTEMS
async function data(req, res, next) {
    try {
        const items = await controller.data().then((items) => {
            responses.success(req, res, items, 200);
        });
    }
    catch (err) {
        next(err);
    }
};

//CONSULTAR UN SOLO ÍTEM
async function oneData(req, res, next) {
    try {
        const items = await controller.oneData(req.params.id).then((items) => {
            responses.success(req, res, items, 200);
        });
    }
    catch (err) {
        next(err);
    }
};

//CONSULTAR POR FECHAS VISITANTE
async function reportVisitorEntrysDates(req, res, next) {
    try {
        const items = await controller.reportVisitorEntrysDates(req.params.dateandhourentry, req.params.dateandhourexit).then((items) => {
            responses.success(req, res, items, 200);
        });
    }
    catch (err) {
        next(err);
    }
};

//CONSULTAR POR FECHAS RESIDENTE
async function reportResidentEntrysDates(req, res, next) {
    try {
        const items = await controller.reportResidentEntrysDates(req.params.dateandhourentry, req.params.dateandhourexit).then((items) => {
            responses.success(req, res, items, 200);
        });
    }
    catch (err) {
        next(err);
    }
};

//CREAR UN NUEVO ITEM
async function addData(req, res, next) {
    try {
        const items = await controller.addData(req.body);
        if (req.body.id == 0) {
            message = 'Created OK';
        }
        else {
            message = 'Updated OK';
        }
        responses.success(req, res, items, 201);
    }
    catch (err) {
        next(err);
    }
};

//ELIMINAR ITEM
async function deleteData(req, res, next) {
    try {
        const items = await controller.deleteData(req.body).then((items) => {
            responses.success(req, res, 'Dropped OK', 200);
        });
    }
    catch (err) {
        next(err);
    }
};


//EXPORTA LOS DATOS
module.exports = router;