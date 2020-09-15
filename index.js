const fs = require("fs");
const http = require('http');
const axios = require('axios');

const getProveedores = async () =>{
    return  await axios({
        url: 'https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json'
    })
}

const getClientes = async () =>{
    return  await axios({
        url: 'https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json'
    })
}

let readFile = (callback) =>{
     fs.readFile("index.html", (err, data) => {
        let pageContent = data.toString();
        let infoP="";
        let infoPC="";
        let provedores = getProveedores();
        let clientes = getClientes();
        for(i=0; i<provedores.length;i++){
            infoP+="<tr><th>"+provedores[i].idproveedor+"</th><td>"+provedores[i].nombrecompania+"</td><td>"+provedores[i].nombrecontacto+"</td></tr>";
        }

        for(j=0; j<clientes.length;j++){
            infoP+="<tr><th>"+clientes[j].idcliente+"</th><td>"+clientes[j].nombrecompania+"</td><td>"+clientes[j].nombrecontacto+"</td></tr>";
        }


        pageContent = pageContent.replace(
            "{{replaceP}}",infoP
        );
        pageContent = pageContent.replace(
            "{{replaceC}}",infoc
        );
        callback(data);
     });
};

// Crea una nueva instancia del servidor
http.createServer(function (req, res) {
    readFile((data)=>{
        res.writeHead(200, {'Content-Type': 'text/html'}); 
        res.end(data.toString());
    });
}).listen(8081);