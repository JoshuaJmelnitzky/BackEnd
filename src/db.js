// connection
const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "",
        database: "ecommerce"
    },
    pool: {
        min: 2,
        max: 8
    }
});

// create table for products
knex.schema.createTableIfNotExists("productos", (table) => {
    table.increments("id").primary()
    table.string("title")
    table.float("price")
    table.string("thumbnail")
})

    .then(() => {
       //console.log("Conexion y tabla creada")
    })

    .catch((err)=> {
        throw err;
    })


// create table por chat
knex.schema.createTableIfNotExists("mensajes", (table) => {
    table.increments("id").primary()
    table.string("email")
    table.string("name")
    table.string("lastName")
    table.string("alias")
    table.integer("age")
    table.string("thumbnail")
    table.string("msn")
    table.dateTime("date", { precision: 6 }).defaultTo(knex.fn.now(6))
})
.then(()=> {
    //console.log("Conexion y tabla creada")
})
.catch((err) => {
    throw err;
})


// export module    
module.exports = knex;