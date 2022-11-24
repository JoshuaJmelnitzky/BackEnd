require("dotenv").config();
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
                path: __dirname+`/../public/avatars/${dataUser.username}.jpeg` 
            }
        ]
    };
      
    transporter.sendMail(mailOptions)
    .then((result) => {
        console.log(result);
    }).catch (console.log);
};


const sendMailOrder = (user, order, total, products) => {
    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: EMAIL,
            pass: NODEMAILER_GMAIL
        }
    });

    let list = "";
    products.forEach(product => {
      list += `<li>${product.cant} ${product.title}, Precio unitario: ${product.price}</li>`            
    });

    const mailOptions = {
        from: 'Backend <joshua@coder.com>',
        to: EMAIL,
        subject: "Nueva order de compra",
        html: ` <h1>Datos de la nueva orden de compra N°: ${order}</h1>
                <p>Nombre de usuario (email): ${user}</p>
                <ul>
                    ${list}
                </ul>
                <p>Total de la compra: ${total}</p>`,

                
    };
      
    transporter.sendMail(mailOptions)
    .then((result) => {
        console.log(result);
    }).catch (console.log);
};

module.exports = {
    sendMail,
    sendMailOrder
};
