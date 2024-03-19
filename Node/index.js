const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Pool } = require("pg");

app.use(cors());

const server = http.createServer(app);
const pool = new Pool({
  user: "zindar",
  host: "172.104.240.106",
  database: "zindar",
  password: "@Ryan20072003@",
  port: 5432
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const connectedUsers = {}; // Utilisateurs connectés

io.on("connection", (socket) => {
  const userId = socket.id; // Identifiant unique du socket utilisateur



  socket.on("join_room", (data) => {
    const room = data.room;
    console.log(room);
    const tableName = `${data.room}_room`;
  
    if (room !== 'general') {
      
      const query = `SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = '${tableName}'
     );`;
  
      // Exécutez la requête pour vérifier si la table existe
      // Utilisez votre bibliothèque ou votre méthode spécifique pour exécuter la requête 
      pool.query(query, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
  
        const tableExists = result;
  
        if (tableExists) {
          console.log(`La table ${tableName} existe`);
          pool.query( `SELECT * FROM ${tableName}`)
          .then((result) => {
            const messages = result.rows;
            console.log(messages)
            socket.emit("previous_private_messages", messages);
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des messages précédents :", error);
          });
          socket.join(room);
        } else {
          console.log(`La table ${tableName} n'existe pas. Création de la table...`);
  
          const createTableQuery = `
          CREATE TABLE ${tableName} (
            id SERIAL PRIMARY KEY,
            gamertag VARCHAR(255),
            date VARCHAR(255),
            time VARCHAR(255),
            message VARCHAR(255)
          );
        `;
  
       
        pool.query(createTableQuery, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log(`La table ${tableName} a été créée avec succès`);
          console.log(`La table ${tableName} existe`);
          pool.query( `SELECT * FROM ${tableName}`)
          .then((result) => {
            const messages = result.rows;
            socket.emit("previous_private_messages", messages);
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des messages précédents :", error);
          });
      
        });
        socket.join(room);
      }
    });
  }else {
    socket.join(room);

    pool.query('SELECT * FROM chat_general')
    .then((result) => {
      const messages = result.rows;
      socket.emit("previous_messages", messages);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des messages précédents :", error);
    });

  }

  });


  

  socket.on('leave_room', (data) => {
    const room = data.room;
    socket.leave(room);
    console.log('User left room:', room);
  });

  // Récupérer les messages précédents du chat général




    

    socket.on("send_private_message", (data) => {
      console.log("send_private_message "+ data.message)
      const { message, date, time, gamertag, room } = data;
  
      const messageObject = {
        message: message,
        date: date,
        time: time,
        gamertag: gamertag
      };
      const query = {
        text: ` INSERT INTO ${data.room}_room (gamertag, date, time, message) VALUES ($1, $2, $3, $4)`,
        values: [messageObject.gamertag, messageObject.date, messageObject.time, messageObject.message]
      };
  
      pool.query(query)
        .then(() => {
          console.log("Message inséré avec succès");
          console.log(messageObject)
          io.to(room).emit("receive_private_message", messageObject); // Diffuser le message à tous les utilisateurs dans la même room
        })
        .catch((error) => {
          console.error("Erreur lors de l'insertion du message :", error);
        });
  
  
    });

  socket.on("send_message", (data) => {
    const { message, date, time, gamertag, room } = data;

    const messageObject = {
      message: message,
      date: date,
      time: time,
      gamertag: gamertag
    };

    const query = {
      text: "INSERT INTO chat_general (gamertag, date, time, message) VALUES ($1, $2, $3, $4)",
      values: [messageObject.gamertag, messageObject.date, messageObject.time, messageObject.message]
    };

    pool.query(query)
      .then(() => {
        console.log("Message inséré avec succès");
        console.log(messageObject)
        io.to(room).emit("receive_message", messageObject); // Diffuser le message à tous les utilisateurs dans la même room
      })
      .catch((error) => {
        console.error("Erreur lors de l'insertion du message :", error);
      });
  });

  socket.on("disconnect", () => {
    if (connectedUsers[userId]) {
      delete connectedUsers[userId];
    }
  });
});

server.listen(5000, () => {
  console.log("Le serveur est en cours d'exécution");
});
