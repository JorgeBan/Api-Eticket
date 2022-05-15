const EventoServices = require('../../services/EventoServices');

const eventoServices = new EventoServices();

    async function getAllEventoEncabezados(req, res) {
        try{
            const eventos = await eventoServices.getAllEventoEncabezados();
            res.status(200).json(eventos);
        }catch(err){
            res.status(err.status||500).json(err);
        }
    }

    async function getAllEventosDatos(req, res) {
        try{
            const eventos = await eventoServices.getAllEventosDatos();
            res.status(200).json(eventos);
        }catch(err){
            res.status(err.status||500).json(err);
        }
    }

    async function getEventoEncabezadosById(req, res) {
        try{
            const evento = await eventoServices.getEventoEncabezadosById(req.params.id);
            res.status(200).json(evento);
        }catch(err){ 
            res.status(err.status||500).json(err);
        }
    }

    async function getEventosDatosById(req, res) {
        try{
            const evento = await eventoServices.getEventosDatosById(req.params.id);
            res.status(200).json(evento);
        }catch(err){
            res.status(err.status||500).json(err);
        }
    }

    async function createEvento(req, res) {
        try{
            const evento = await eventoServices.create(req.body);
            res.status(201).json(evento);
        }catch(err){
            res.status(err.status||500).json(err);
        }
    }

    async function updateEvento(req, res) {
        try{
            const evento = await eventoServices.updateEvento(req.params.id, req.body);
            res.status(200).json(evento);
        }catch(err){
            res.status(err.status||500).json(err);
        }
    }

    async function deleteEvento(req, res) {
        try{
            const evento = await eventoServices.deleteEvento(req.params.id);
            res.status(200).json(evento);
        }catch(err){
            res.status(err.status||500).json(err);
        }
    }

    async function updateEstadoEvento(req, res) {
        try{
            const evento = await eventoServices.updateEstadoEvento(req.params.id, req.body);
            res.status(200).json(evento);
        }catch(err){
            res.status(err.status||500).json(err);
        }

    }
module.exports = {
    getAllEventoEncabezados,
    getAllEventosDatos,
    getEventoEncabezadosById,
    getEventosDatosById,
    createEvento,
    updateEvento,
    deleteEvento, 
    updateEstadoEvento
}