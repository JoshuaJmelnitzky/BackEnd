const nodemailer = require('nodemailer');
const {createTransport} = nodemailer;
const {EMAIL, NODEMAILER_GMAIL} = process.env;

const sendMail = (dataUser) => {
    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: EMAIL,
            pass: NODEMAILER_GMAIL
        }
    });

    const mailOptions = {
        from: 'Backend <joshua@coder.com>',
        to: EMAIL,
        subject: "Nuevo registro",
        html: `<h1>Datos del nuevo registro:</h1>
                <p>nombre de usuario (email): ${dataUser.username}</p>
                <p>nombre y apellido: ${dataUser.name}</p>
                <p>dirección: ${dataUser.address}</p>
                <p>edad: ${dataUser.age}</p>
                <p>teléfono: ${dataUser.phone}</p>`,
        attachments: [
            {
                path: `../DESAFIOS/public/avatars/${dataUser.username}.jpeg`
            }
        ]
    };
      
    transporter.sendMail(mailOptions)
    .then((result) => {
        console.log(result);
    }).catch (console.log);
};

module.exports = sendMail;
