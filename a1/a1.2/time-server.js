const net = require('net');
const server = net.createServer((socket) => {
    const date = new Date();
    const formattedDate = date.toISOString().substring(0, 10);
    const formattedTime = date.toTimeString().substring(0, 5);
    socket.end(`${formattedDate} ${formattedTime}\n`);
});
server.listen(Number(process.argv[2]));
