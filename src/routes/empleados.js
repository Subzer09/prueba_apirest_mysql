const { Router } = require('express');
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database')

//CREANDO LAS RUTAS
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM empleados', (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log(err)
        }
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    mysqlConnection.query('SELECT * FROM empleados WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0])
        } else {
            console.log(err)
        }
    })
})

router.post('/', (req, res) => {
    const { id, nombre, salary } = req.body
    const query = `
        SET @id = ?;
        SET @nombre = ?;
        SET @salary = ?;
        CALL empleadoAddOrEdit(@id, @nombre, @salary)
    `
    mysqlConnection.query(query, [id, nombre, salary] , (err, rows, fields) => {
        if (!err) {
            res.json("empleado guardado")
        } else {
            console.log(err)
        }
    })
})

router.put('/:id', (req, res) => {
    const { nombre, salary } = req.body;
    const { id } = req.params;
    const query = `
        SET @id = ?;
        SET @nombre = ?;
        SET @salary = ?;
        CALL empleadoAddOrEdit(@id, @nombre, @salary)
    `
    mysqlConnection.query(query, [id, nombre, salary] , (err, rows, fields) => {
        if (!err) {
            res.json({ status: "empleado actualizado" })
        } else {
            console.log(err)
        }
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM empleados WHERE ID = ?', [id] , (err, rows, fields) => {
        if (!err) {
            res.json({ status: "empleado eliminado" })
        } else {
            console.log(err)
        }
    })
})

module.exports = router;