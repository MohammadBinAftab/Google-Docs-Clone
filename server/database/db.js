import mongoose from "mongoose";

export const Connection = async(username = 'root', password = 'root') => {
    const URL = `mongodb://${username}:${password}@ac-28maogh-shard-00-00.8to5ii1.mongodb.net:27017,ac-28maogh-shard-00-01.8to5ii1.mongodb.net:27017,ac-28maogh-shard-00-02.8to5ii1.mongodb.net:27017/GOOGLE-DOCS-CLONE?ssl=true&replicaSet=atlas-ocq3lj-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Google-Docs-Clone`;
    try {
        await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true})
        console.log("Database connected Successfully");
    }catch(error){
        console.log('Error while connection with the database', error.message);
    }
}

export default Connection;