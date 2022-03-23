const express=require('express')
const app=express()

app.get('*',(request,response)=>{
    response.send({message:'Este es un mensaje'})
})

app.listen(3005,()=>console.log('nuestro servidor esta escuchando puerto 3005'))



