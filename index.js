// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const newData = {
//   correnteMotor: 0,
//   correnteBaterias: 0,
//   temperatura: 0,
//   umidade: 0,
//   tensaoAlimentacaoPCB: 0,
//   estadoStringSolar1: 0,
//   estadoStringSolar2: 0,
//   tensaoSaidaMPPT: 0,
//   tensaoEntradaMPPT: 0,
//   correnteMPPT: 0,
//   updateAt: "00/00/0000 00:00:00",
//   latitude: 0,
//   longitude: 0,
//   speed: 0
// };

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// io.on('connection', (socket) => {
//   console.log('New client connected');


//   socket.emit('info', newData);
//   console.log(newData);

//   setInterval(() => {

//     newData.correnteMotor = Math.floor(Math.random() * 100);
//     newData.correnteBaterias = Math.floor(Math.random() * 100);
//     newData.temperatura = Math.floor(Math.random() * 50);
//     newData.umidade = Math.floor(Math.random() * 100);
//     newData.tensaoAlimentacaoPCB = Math.floor(Math.random() * 12);
//     newData.estadoStringSolar1 = Math.floor(Math.random() * 2);
//     newData.estadoStringSolar2 = Math.floor(Math.random() * 2);
//     newData.tensaoSaidaMPPT = Math.floor(Math.random() * 100);
//     newData.tensaoEntradaMPPT = Math.floor(Math.random() * 100);
//     newData.correnteMPPT = Math.floor(Math.random() * 10);
//     newData.updateAt = new Date().toLocaleString();
//     console.log(newData);

//     io.emit('info', newData);
//   }, 5000);

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/site.html');
// });

// server.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });




const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const newData = {
  correnteMotor: 0,
  correnteBaterias: 0,
  temperatura: 0,
  umidade: 0,
  tensaoAlimentacaoPCB: 0,
  estadoStringSolar1: 0,
  estadoStringSolar2: 0,
  tensaoSaidaMPPT: 0,
  tensaoEntradaMPPT: 0,
  correnteMPPT: 0,
  updateAt: "00/00/0000 00:00:00",
  latitude: 0,
  longitude: 0,
  speed: 0
};

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const pi = Math.PI;
const R = 6371; // raio da Terra em km
const lat0 = -20.3167; // latitude da Curva da Jurema, ES
const lon0 = -40.2999; // longitude da Curva da Jurema, ES
const n = 100; // número de pontos no círculo
const d = 10; // diâmetro do círculo em km
const speed = 50; // velocidade em km/h

// função para converter graus em radianos
function toRadians(degrees) {
  return degrees * (pi / 180);
}

// criar vetor de pontos em um círculo na Curva da Jurema
const points = [];
for (let i = 0; i < n; i++) {
  const lat = lat0 + (d / (2 * R)) * (180 / pi) * Math.cos(2 * pi * i / n);
  const lon = lon0 + (d / (2 * R)) * (180 / pi) * Math.sin(2 * pi * i / n) / Math.cos(toRadians(lat0));
  points.push({ lat, lon });
}

let i = 0; // índice para percorrer os pontos do círculo

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.emit('info', newData);
  console.log(newData);

  setInterval(() => {
    // atualizar dados aleatórios
    newData.correnteMotor = Math.floor(Math.random() * 100);
    newData.correnteBaterias = Math.floor(Math.random() * 100);
    newData.temperatura = Math.floor(Math.random() * 50);
    newData.umidade = Math.floor(Math.random() * 100);
    newData.tensaoAlimentacaoPCB = Math.floor(Math.random() * 12);
    newData.estadoStringSolar1 = Math.floor(Math.random() * 2);
    newData.estadoStringSolar2 = Math.floor(Math.random() * 2);
    newData.tensaoSaidaMPPT = Math.floor(Math.random() * 100);
    newData.tensaoEntradaMPPT = Math.floor(Math.random() * 100);
    newData.correnteMPPT = Math.floor(Math.random() * 10);
    newData.updateAt = new Date().toLocaleString();

    // atualizar posição no círculo
    newData.latitude = points[i].lat;
    newData.longitude = points[i].lon;
    newData.speed = speed;
    i = (i + 1) % n;

    console.log(newData);
    io.emit('info', newData);
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

  

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/site.html');
});

server.listen(80, () => {
  console.log('Server listening on port 80');
});
