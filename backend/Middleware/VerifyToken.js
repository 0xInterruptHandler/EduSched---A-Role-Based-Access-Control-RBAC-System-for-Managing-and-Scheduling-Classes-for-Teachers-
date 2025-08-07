import jwt from 'jsonwebtoken'
import ModeloUsuario from '../Models/usuario.js'


const esAdmin =async(req,res,next)=>{
    try {

        const token = req.cookies.token
        if(!token){
            return res.status(401).json({success:false,message:"Token No Autorizado"})
        }

        const decodificado =jwt.verify(token,process.env.SECRETKEY)

        const Usuario = await ModeloUsuario.findById(decodificado.UsuarioCodigo)

        if(!Usuario){
            return res.status(401).json({success:false,message:"Accion Invalida"})
        }
        
        if(Usuario.rol!=='Admin'){
            return res.status(403).json({success:false,message:"Usuario no autorizado"})
        }
        req.Usuario=Usuario
        next()

    } catch (error) {
        res.status(500).json({message:"Error en el servidor!"})
        console.log(error)
    }
}



const esUsuario = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({success:false,message:"Token No Autorizado"})
        }

        const decodificado =jwt.verify(token,process.env.SECRETKEY)

        const Usuario = await ModeloUsuario.findById(decodificado.UsuarioCodigo)

        if(!Usuario){
            return res.status(401).json({success:false,message:"Accion invalida"})
        }
        
        req.Usuario=Usuario
        next()
    } catch (error) {
        res.status(500).json({message:"Error en el servidor!"})
        console.log(error)
    }
}

export {esAdmin,esUsuario}