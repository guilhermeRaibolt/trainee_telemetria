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
  updateAt: "00/00/0000 00:00:00"
};

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.emit('info', newData);
  console.log(newData);

  setInterval(() => {

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
    console.log(newData);

    io.emit('info', newData);
  }, 5000);

  // handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/site.html');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});