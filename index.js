const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const fs = require('fs')

const jsonReader = (filePath, cb) =>{
      fs.readFile(filePath, 'utf-8', (err, fileData)=>{
            if(err){
                  return cb && cb(err)
            }else{
                  try {
                        const object = JSON.parse(fileData)
                        return cb && cb(null, object)
                  } catch (error) {
                        return cb && cb(err)
                  }
            }
      })
}

const io = new Server(server)
const PORT = process.env.PORT || 3000

app.use(express.static("public"))

io.on("connect", (socket)=>{

      //TEST A LISTENER FOR EACH PART TO CHECK HOW LONG IT TAKES 
      socket.on("r1", (data)=>{
            let obj = {
                  commitment: "Top Left",
                  timeStamp : data.timeStamp
            }
            // jsonReader('./db.json',(err, data)=>{
            //       if(err){
            //             console.log(err)
            //       }else{
            //             data.clicks.push(obj)
            //             fs.writeFile('./db.json', JSON.stringify(data), err =>{
            //                   if(err){
            //                         err
            //                   }
            //             })
            //       }
            // })
            console.log(data)
            io.emit("r1",{key: 11, round: data.round})
      })
      socket.on("r2", (data)=>{
            let obj = {
                  commitment: "Top Right",
                  timeStamp : data.timeStamp
            }
            // jsonReader('./db.json',(err, data)=>{
            //       if(err){
            //             console.log(err)
            //       }else{
            //             data.clicks.push(obj)
            //             fs.writeFile('./db.json', JSON.stringify(data), err =>{
            //                   if(err){
            //                         err
            //                   }
            //             })
            //       }
            // })
            console.log(data)
            io.emit("r2",{key: 22,round: data.round})
      })
      socket.on("r3", (data)=>{
            let obj = {
                  commitment: "Bottom Left",
                  timeStamp : data.timeStamp
            }
            // jsonReader('./db.json',(err, data)=>{
            //       if(err){
            //             console.log(err)
            //       }else{
            //             data.clicks.push(obj)
            //             fs.writeFile('./db.json', JSON.stringify(data), err =>{
            //                   if(err){
            //                         err
            //                   }
            //             })
            //       }
            // })
            console.log(data)
            io.emit("r3",{key: 33,round: data.round})
      })
      socket.on("r4", (data)=>{
            let obj = {
                  commitment: "BottomRight",
                  timeStamp : data.timeStamp
            }
            // jsonReader('./db.json',(err, data)=>{
            //       if(err){
            //             console.log(err)
            //       }else{
            //             data.clicks.push(obj)
            //             fs.writeFile('./db.json', JSON.stringify(data), err =>{
            //                   if(err){
            //                         err
            //                   }
            //             })
            //       }
            // })
            console.log(data)
            io.emit("r4",{key: 44,round: data.round})
      })
      console.log("a user connected")

      socket.on("disconnect", ()=>{
            console.log("a user disconnected")
      })
})


server.listen(PORT, ()=>{
      console.log(`listening to port ${PORT}`)
})