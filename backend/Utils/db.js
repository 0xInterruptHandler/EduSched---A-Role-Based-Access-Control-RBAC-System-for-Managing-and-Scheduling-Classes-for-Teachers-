import mongoose from "mongoose";


const DBConexion = async()=>{
    try {
        await mongoose.connect(process.env.MONGODBURL)
        console.log("MongoDB conectado")
    } catch (error) {
        console.log(error)
    }
}

export default DBConexion