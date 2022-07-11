const socket = io();

const authorSchema = new normalizr.schema.Entity("authors")
const messagesListSchema = new normalizr.schema.Entity("messagesList",{
    author: authorSchema
})

socket.on("mensaje", (data) => {
    let dataDesnormalize = normalizr.denormalize(data.result, [messagesListSchema], data.entities); 
    const norm = JSON.stringify(data).length;
    const desnorm = JSON.stringify(dataDesnormalize).length;    
    document.querySelector(".compresion").innerHTML = `Chat (Compresión: ${(((desnorm - norm) / desnorm)*100).toFixed(2)}%)`;
    render(dataDesnormalize);
})


const render = (data) => {
    let html = data.map((x) =>{ 
        let dateTime = new Date(x.date);
        
        return `
            <p> 
                <span style="color:blue">${x.author.id.bold()}</span> 
                <span style="color:brown">[${dateTime.toLocaleString()}]</span>: 
                <span style="color:green; font-style: italic;">${x.msn}</span> 
                <span><img style="width:25px; height:25px" src=${x.author.thumbnail} alt=${x.author.thumbnail}></span> 
            </p>
        `
    }).join(" ");
    
    document.querySelector("#chat").innerHTML = html;
}


const addInfo = () => {
    let dataObj = {
        id: 'mensajes', 
        msn: document.querySelector("#msn").value,
        author: {
            id: document.querySelector("#nb").value, 
            name: document.querySelector("#ne").value, 
            lastName: document.querySelector("#ltNe").value, 
            alias: document.querySelector("#al").value, 
            age: document.querySelector("#age").value, 
            thumbnail: document.querySelector("#th").value, 
        }
    };
    socket.emit("dataChat", dataObj);
    document.querySelector("#msn").value = ""

    return false;
};

