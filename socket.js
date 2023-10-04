const { Server } = require("socket.io");
const { changeState } = require("./controllers/socket/appointment");
const initializeSocket = (server) => {
   const io = new Server(server);

   io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('call-patient', (data) => {
         const { appointmentId } = data;
         (async function () {
            const result = await changeState(appointmentId);
            if (result) {
               io.to(socket.id).emit('update-doctor-appointments', result);
               io.emit('alert-patient', result);
            }
         })();
      });

      socket.on('disconnect', () => {
         console.log('User disconnected');
      });
   });

   return io;
}

module.exports = initializeSocket;