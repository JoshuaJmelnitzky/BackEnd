class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames(){
        return this.libros.map(libro => libro.nombre);
    }

}


// class instance
let usuario = new Usuario('Joshua', 'Jmelnitzky', [{nombre: "Código Limpio", autor: "Robert C. Martin"}], ['Ares']);

// Test getFullName()
console.log('Get full name: ', usuario.getFullName());

// addMascota()
usuario.addMascota('Zeus');

// countMascotas()
console.log(`Tiene ${usuario.countMascotas()} mascotas`);

// addBook
usuario.addBook("The Pragmatic Programmer", "Andy Hunt");

// getBookNames()
console.log("Book names: ", usuario.getBookNames());


