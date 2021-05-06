const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth')

router.get('/add', isLoggedIn, (req, res) => {
    res.render('task/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    //console.log(req.body);
    const { name_book, author, date_public, information } = req.body;
    const newLink = {
        name_book,
        author,
        date_public,
        information,
        users_idusers: req.user.idusers
    };
    //console.log(newLink);
    await pool.query('INSERT INTO favorite_books set ?', [newLink]);
    req.flash('success', 'Libro guardado correctamente');
    res.redirect('/task');
});

router.get('/', isLoggedIn, async (req, res) => {
    const task = await pool.query('SELECT * FROM favorite_books WHERE information=1 AND users_idusers = ? ORDER BY name_book ASC', [req.user.idusers]);
    const hechos = await pool.query('SELECT * FROM favorite_books WHERE information=2 AND users_idusers = ?', [req.user.idusers]);
    console.log(task);
    res.render('task/list', {task, hechos});
});

router.get('/delete/:idbooks', isLoggedIn, async (req, res) =>{
    const { idbooks } = req.params;
    await pool.query('DELETE FROM favorite_books WHERE idbooks = ?', [idbooks]);
    req.flash('success', 'Datos eliminados correctamente');
    res.redirect('/task');
});

router.get('/hecho/:idbooks', isLoggedIn, async (req, res) =>{
    const { idbooks } = req.params;
    const { information=2 } = req.body;
    const newLink = {
        information
    };
    await pool.query('UPDATE favorite_books set ? WHERE idbooks = ?', [newLink, idbooks]);
    req.flash('success', 'Cambios guardados correctamente');
    res.redirect('/task');
});

router.get('/edit/:idbooks', isLoggedIn, async (req, res) => {
    const { idbooks } = req.params;
    const task = await pool.query('SELECT * FROM favorite_books WHERE idbooks = ?', [idbooks]);
    res.render('task/edit', {link: task[0]});
});

router.post('/edit/:idbooks', isLoggedIn, async (req, res) => {
    const { idbooks } = req.params;
    const { name_book, author, date_public, information } = req.body;
    const newLink = {
        name_book,
        author,
        date_public,
        information
    };
    await pool.query('UPDATE favorite_books set ? WHERE idbooks = ?', [newLink, idbooks]);
    req.flash('success', 'Cambios guardados correctamente');
    res.redirect('/task');
});

module.exports = router;