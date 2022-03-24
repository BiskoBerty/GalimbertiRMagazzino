var express = require("express");
var apiServer = express();
var cors = require("cors");
var fs = require("fs");
const mysql = require('mysql2');
var config = require("./config.json");


apiServer.use(cors());

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

var host = "localhost";
var port = 3000;
apiServer.listen(port, host, ()=>{
    console.log("Server partito: http://%s:%d", host, port);
});

apiServer.get("/api/getProdotti", (req,res)=>{
    connection.query('select * from magazzino;', function (error, results, fields) {
        if (error){
            console.log(error);
            res.status(400).json({"message":"error"});
            throw error;
        } 
        else {
            // console.log(results);
            res.status(200).json(results);
        }
    });
}) 

apiServer.get("/api/addProdotti", (req,res)=>{
    connection.query('insert into magazzino values (?,?,?);',[req.query.id,req.query.nome,req.query.numero], function (error, results, fields) {
        if (error){
            console.log(error);
            res.status(400).json({"message":"error"});
            throw error;
        } 
        else {
            // console.log(results);
            res.status(200).json(results);
        }
    });
}) 