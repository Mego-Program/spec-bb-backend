import axios from "axios";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

 
const users = async function(req, res){   
    try {
        const token = req.headers.authorization  
        const response = await axios.get(`${process.env.API_URL}/api/users/list`, {
        headers: {'authorization': token}});

        return res.status(200).json({data: response.data});

    } catch (error) {
       console.error(error)

    }
}

export {router as usersRouter, users}; 

router.get('/infra', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const result = await allUsers(token);
        res.status(200).json(result);
    } catch (err) {
        console.error(err)
        res.status(500).json({message: err.message});
    }
})

