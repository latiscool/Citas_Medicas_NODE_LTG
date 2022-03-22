const http = require('http');
const url = require('url');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const chalk = require('chalk');

const fecha = moment().format('MMMM Do YYYY, h:mm:ss a');
const idUser = uuidv4().slice(0, 6);
const PORT = 8080;
const host = 'localhost';
let lista = [];

const requestListener = (req, res) => {
  if (req.url.startsWith('/usuarios')) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    axios
      .get('https://randomuser.me/api/')
      .then((usuario) => {
        usuario.data.results.forEach((u) => {
          lista.push(
            `Nombre: ${u.name.first} - Apellido: ${u.name.last} - ID: ${idUser} - Timestamp: ${fecha}`
          );
        });
        // console.log('lista', lista);
        res.write('<ol>');
        _.forEach(lista, (u) => {
          res.write(`<li>${u}</li>`);
          console.log(chalk.blue.bgWhite(u));
        });
        res.write('</ol>');
        res.end();
      })
      .catch((err) => {
        console.log(`Se ha producido una falla -> ${err}`);
      });
  }
};

const server = http.createServer(requestListener);

server.listen(PORT, host, () => {
  console.log(`El servidor se esta ejecutando en http://${host}:${PORT}`);
});

// *******************************************
// *******************************************
// *******************************************
// *******************************************
// *******************************************
// *******************************************

// METODO 2 // creando un arreglo de objeto

// const http = require('http');
// const url = require('url');
// const axios = require('axios');
// const { v4: uuidv4 } = require('uuid');
// const moment = require('moment');
// const _ = require('lodash');
// const chalk = require('chalk');

// const fecha = moment().format('MMMM Do YYYY, h:mm:ss a');
// const idUser = uuidv4().slice(0, 6);
// const PORT = 8080;
// const host = 'localhost';

// const requestListener = (req, res) => {
//   if (req.url.startsWith('/usuarios')) {
//     res.writeHead(200, { 'Content-type': 'text/html' });
//     axios
//       .get('https://randomuser.me/api/')
//       .then((usuario) => {
//         let lista = [];
//         usuario.data.results.forEach((u) => {
//           lista.push({
//             Nombre: `${u.name.first}`,
//             Apellido: `${u.name.last}`,
//             ID: `${idUser}`,
//             Timestamp: `${fecha}`,
//           });
//         });
//         // console.log('lista', lista);
//         res.write('<ol>');
//         _.forEach(lista, (u) => {
//           res.write(
//             `<li>${`Nombre: ${u.Nombre} - Apellido: ${u.Apellido} - ID: ${u.ID} - Timestamp: ${u.Timestamp}`}</li>`
//           );
//           console.log(
//             chalk.blue.bgWhite(
//               `Nombre: ${u.Nombre} - Apellido: ${u.Apellido} - ID: ${u.ID} - Timestamp: ${u.Timestamp}`
//             )
//           );
//         });
//         res.write('</ol>');
//         res.end();
//       })
//       .catch((err) => {
//         console.log(`Se ha producido una falla -> ${err}`);
//       });
//   }
// };

// const server = http.createServer(requestListener);

// server.listen(PORT, host, () => {
//   console.log(`El servidor se esta ejecutando en http://${host}:${PORT}`);
// });

//console.log(uuidv4()); //obtengo los serial / codigo
//console.log(uuidv4().slice(0, 3)); //obtengo los 3 PRIMEROS DIGITOS del serial / codigo

// console.log(fecha);

//Consultar momentjs.com para ver los formatos y ejemplos

// const requestListener = (req, res) => {};

// OPCION ALTERNATIVA2 1 POR INDICE [0](LLAMAR NOMBRE Y APELLIDO)
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const nombre = usuario.data.results[0].name.first;
// const apellido = usuario.data.results[0].name.last;

// OPCION ALTERNATIVA 2 DESTRUCTURANDO (LLAMAR NOMBRE Y APELLIDO)
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const {first,last}=usuario.data.results[0].name;
// const nombreCompleto = `${first} ${last}`;
