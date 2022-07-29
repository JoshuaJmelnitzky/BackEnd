const { generateRandom } = require('../../utils/randomNumber');

process.on('message', (cant) => {
    const nums = generateRandom(cant);
    process.send(nums);
});