const mongoose = require('mongoose')

const dbConnection = async () => {

    try{

        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGODB_CNN);
        // , {
        //     useNewURLParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false,
        // });

        console.log('Conectado a la db')

    }catch (error){
        console.log(error);
        throw new Error('Error en la conexion a la base de datos')
    }

}




module.exports = {
    dbConnection
}