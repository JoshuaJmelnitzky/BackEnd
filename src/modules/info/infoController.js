const numCpu = require('os').cpus().length;

const obtenerInfo = async (req,res) => {

    const info = {
        platform: process.platform,
        version: process.version,
        memory: process.memoryUsage().rss + ' bytes',
        path: process.execPath,
        id: process.pid,
        folder: process.cwd(),
        cpus: numCpu
    }
    res.render('info', {info});
};

module.exports = {
    obtenerInfo
}