import mongoose from "mongoose";

let connect = null

const connectToDatabase = async () => {
    const connectionURI = process.env.DB_URL;
    try {
        if (!connect) {
            connect = await mongoose.connect(connectionURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to the database');

        }
        return connect
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export default connectToDatabase ;