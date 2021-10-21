'use static'
const express= require('express')
//const bodyParser = require('body-parser')
const bodyParser = require('body-parser')
const mongose= require('mongoose')
const Pasos= require('./models/paso')

const app = express()

const port = process.env.PORT || 3000


const cors = require('cors'); 
app.use(cors());
//https://stackoverflow.com/questions/36878255/allow-access-control-allow-origin-header-using-html5-fetch-api

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
/*
app.get('/hola/:nombre',(req,res) =>
{
    res.send(  "Mensaje : Hola soy "+ req.params.nombre)
})
*/
app.get('/api/paso',(req,res)=>{
    
    Pasos.find({},(err,paso) =>{
        if(err) res.status(500).send('message : Error al leer: '+err)
        if(!paso) return res.status(404).send('No existen pasos')
        //res.send(200, {products:products})
         res.status(200).send(paso)
    })

})
app.get('/api/paso/:pasoId',(req,res)=>{
    let pasoId=req.params.pasoId
    Pasos.findById(isbn,(err, paso)=>{
        if(err) res.status(500).send('message : Error al leer: '+err)
        if(!paso) return res.status(404).send('No existe')
        res.status(200).send({paso})
    })
}) 
app.post('/api/paso',(req,res)=>{
    //console.log(req.body)
   // res.send({message : 'Producto recibido'})
    console.log('POST /api/paso')
    console.log(req.body)
   
    let paso = new  Pasos()
    paso.idRegistro= req.body.idRegistro
    paso.direccion= req.body.direccion
    paso.latitud= req.body.latitud
    paso.longitud= req.body.longitud
    
    
  


    paso.save((err,pasoStored)=>{
        if(err) res.status(500).send('message : Error al grabar: '+err)
        res.status(200).send({paso:pasoStored})
    })

    
})

app.delete('/api/paso/:pasoId',(req,res)=>{

    let pasoId=req.params.pasoId
    Pasos.findById(pasoId,(err, paso)=>{
        if(err) res.status(500).send({message:'Error al borrar : ${err}'})
        paso.remove(err =>{
            if(err) res.status(500).send('message : Error al borrar : '+err)  
            res.status(200).send({message: 'Regsitro borrdo : '})
        })
      //  if(!product) return res.status(404).send('No existe')
       
    })
})


app.put('/api/paso/:pasoId',(req,res)=>{
    let pasoId = req.params.pasoId
    let registroModificado= req.body;
    Pasos.findByIdAndUpdate(pasoId,registroModificado, (err,pasoUpdated) => {
        if(err) res.status(500).send({message: 'Error al modificar: ${err}'})
        res.status(200).send({paso:pasoUpdated})
    })
    
})
 

//mongose.connect('mongodb://localhost:58140/mydatabase',(err,res)=>{
mongose.connect('mongodb://localhost:27017/mydatabasee',(err,res)=>{
    if(err) {
        return console.log("Erroe de conexion ${}")
    }
    console.log('Conexión establecida')

    app.listen(port,()=>{
        console.log(`Api Rest ejecutandose en http:/localhost:${port}`)
    })

})