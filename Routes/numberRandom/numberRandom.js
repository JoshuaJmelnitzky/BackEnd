const express = require('express');
const { Router } = express;
let router = new Router();
const { fork } = require('child_process');


router.get('/', (req, res) => {
    let cant = parseInt(req.query.cant);
    if (!cant) cant = 1e8;
    const randomFork = fork('./Routes/numberRandom/forkNumberRandom.js', {root: '.'});
    randomFork.send(cant);
    randomFork.on('message', (nums) => {
        res.send(nums);
    });
});


module.exports = router;