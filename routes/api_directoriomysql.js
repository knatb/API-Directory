var express = require('express'); //requiere manda a llamar el modulo de express
var router = express.Router(); //libreria para gestionar url's//instancia la libreria 
var mysql = require('mysql'); //se instancia toda la libreria

//console.log(__dirname.split("routes")[0] + "public\\img");

var multiparty = require('connect-multiparty'); //libreria 
var MiddlewareMultipart = multiparty({
    uploadDir: __dirname.split("routes")[0] + "public\\img"
    //"C:\Users\Raúl Contreras\Documents\ISSC 3\WEB\P2\Ejemplos NodeJS\DIRECTORIOMYSQL\public\img"
}); //objeto de la libreria

//CREAR CONEXION
var conn = mysql.createConnection({
    host:   "localhost", //IP DEL SERVIDOR MYSQL
    user:   "root",
    password: "4ss-Kicker",
    database: "web1"
});

//CONEXION
conn.connect(function(err){
    if(err){
        console.log("NO SIRVE COMPA"+err);
    }
    else{
        console.log("EXCELSIOR");
    }
})

//OBTENER USUARIOS
router.get('/getAllUsers',(req,res,next)=>{
    var query = "CALL getAllUsers()";
    conn.query(query, true, function(err,results,fields){
    //la consulta, valida lo que hace la conexion, callback
    if(err){
        console.log("CONSULTA ERRONEA"+err);
        res.send("CONSULTA ERRONEA"+err)
    }
    else{
        console.log(results[0]);
        res.send(results);
    }
    })
})

//CREATE USER
//se incrusta el manejador 'middleware'
router.post('/createUser',MiddlewareMultipart,function(req,res,next){
    console.log('.'+req.files.image.path.split("public")[1]);
    console.log(req.body);

    var imgPath='http://localhost:3000'+req.files.image.path.split("public")[1];
    var query='CALL createUser(?,?,?,?,?,?)';

    var datos=[
        req.body.nombre,
        req.body.telefono,
        req.body.curp,
        req.body.edocivil,
        Number(req.body.edad),
        imgPath
    ]

    conn.query(query,datos,function(err,results,fields){
        if(err){
            console.log('ERROR DE CONSULTA'+err)
            res.send('ERROR'+err)
        }
        else{
            console.log(results[0])
            res.send('Usuario creado')
        }
    })
    //res.send(JSON.stringify("INFORMACIÓN RECIBIDA"));
})

//UPDATE USER
router.put('/updateUser',MiddlewareMultipart,function(req,res,next){
    //console.log('.'+req.body.file.image.path.split("public")[1]);
    console.log(req.body);

    var imgPath='http://localhost:3000'+req.files.image.path.split("public")[1];
    var query='CALL updateUser(?,?,?,?,?,?,?)';

    var datos=[
        Number(req.body.id),
        req.body.nombre,
        req.body.telefono,
        req.body.curp,
        req.body.edocivil,
        Number(req.body.edad),
        imgPath
    ]

    conn.query(query,datos,function(err,results,fields){
        if(err){
            console.log('ERROR DE CONSULTA'+err)
            res.send('ERROR'+err)
        }
        else{
            console.log(results[0])
            res.send('Usuario Actualizado')
        }
    })
})

//DELETE USER
router.delete('/deleteUser/:id',MiddlewareMultipart,function(req,res,next){
    console.log(req.body);
    var query='CALL deleteUser(?)';

    var datos=[
        req.body.id
    ]

    conn.query(query,datos,function(err,results,fields){
        if(err){
            console.log('ERROR DE CONSULTA'+err)
            res.send('ERROR'+err)
        }
        else{
            console.log(results[0])
            res.send('Usuario Eliminado')
            res.send(results[0])
        }
    })
})

//SEARCH USER
router.get('/ByName/:id',MiddlewareMultipart,function(req,res,next){
    //console.log(req.body);
    var query='CALL ByName(?)';

    var datos=[
        req.params.id
    ]

    conn.query(query,datos,function(err,results,fields){
        if(err){
            console.log('ERROR DE CONSULTA'+err)
            res.send('ERROR'+err)
        }
        else{
            console.log(results[0])
            res.send(results[0])
        }
    })
})

//SELECTED
router.get('/selectedUser/:id',MiddlewareMultipart,function(req,res,next){
    var query = "SELECT * FROM tbldirectorio WHERE id = "+req.params.id;
    var datos = [Number(req.params.id)]
    conn.query(query,datos,function(err,results,fields){
        if(err){
            console.log('ERROR AL SELECCIONAR'+err)
            res.send('ERROR'+err)
        }
        else{
            console.log(results[0])
            res.send(results[0])
        }
    })
})

module.exports = router;

