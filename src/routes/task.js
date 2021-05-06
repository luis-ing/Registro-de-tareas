const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth')

router.get('/add', isLoggedIn, (req, res) => {
    res.render('task/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    //console.log(req.body);
    var now = new Date();
    const { name_task, date_public = now , date_final = now,  status = 1 } = req.body;
    const newLink = {
        name_task,
        date_public,
        date_final,
        status,
        users_idusers: req.user.idusers
    };
    //console.log(newLink);
    await pool.query('INSERT INTO task_table set ?', [newLink]);
    req.flash('success', 'Libro guardado correctamente');
    res.redirect('/task');
});

router.get('/', isLoggedIn, async (req, res) => {
    const task = await pool.query('SELECT * FROM task_table WHERE status=1 AND users_idusers = ? ORDER BY name_task ASC', [req.user.idusers]);
    const hechos = await pool.query('SELECT TIMESTAMPDIFF (MINUTE, date_public, date_final) AS minutos, TIMESTAMPDIFF (HOUR, date_public, date_final) AS horas, TIMESTAMPDIFF (DAY, date_public, date_final) AS dias, name_task, date_public, date_final FROM task_table WHERE status=2 AND users_idusers = ? ORDER BY name_task ASC', [req.user.idusers]);
    console.log(task);
    res.render('task/list', {task, hechos});
});

router.get('/delete/:idtask', isLoggedIn, async (req, res) =>{
    const { idtask } = req.params;
    await pool.query('DELETE FROM task_table WHERE idtask = ?', [idtask]);
    req.flash('success', 'Datos eliminados correctamente');
    res.redirect('/task');
});


router.get('/realizado/:idtask', isLoggedIn, async (req, res) =>{
    var now = new Date();
    const { idtask } = req.params;
    const { status=2, date_final = now } = req.body;
    const newLink = {
        date_final,
        status
    };
    await pool.query('UPDATE task_table set ? WHERE idtask = ?', [newLink, idtask]);
    req.flash('success', 'Cambios guardados correctamente');
    res.redirect('/task');
});

router.get('/edit/:idtask', isLoggedIn, async (req, res) => {
    const { idtask } = req.params;
    const task = await pool.query('SELECT * FROM task_table WHERE idtask = ?', [idtask]);
    res.render('task/edit', {task: task[0]});
});

router.post('/edit/:idtask', isLoggedIn, async (req, res) => {
    const { idtask } = req.params;
    const { name_task } = req.body;
    const newLink = {
        name_task
    };
    await pool.query('UPDATE task_table set ? WHERE idtask = ?', [newLink, idtask]);
    req.flash('success', 'Cambios guardados correctamente');
    res.redirect('/task');
});

module.exports = router;