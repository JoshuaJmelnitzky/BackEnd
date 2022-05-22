const socket = io();

socket.on("mensaje", (data) => {
    render(data);
})


const render = (data) => {
    let html = data.map((x) =>{ 
        let dateTime = new Date(x.date);
        
        return `
            <p> 
                <span style="color:blue">${x.email.bold()}</span> 
                <span style="color:brown">[${dateTime.toLocaleString()}]</span>: 
                <span style="color:green; font-style: italic;">${x.msn}</span> 
            </p>
        `
    }).join(" ");
    document.querySelector("#chat").innerHTML = html;
}


const addInfo = () => {
    let dataObj = {
        email: document.querySelector("#nb").value, 
        msn: document.querySelector("#msn").value
    };
    socket.emit("dataChat", dataObj);
    document.querySelector("#msn").value = ""

    return false;
};

