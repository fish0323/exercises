import fs from "fs";
import {resolve} from "path";

async function listAllJs(path:string) {
    try{
        let dir = await fs.promises.readdir(path)
        for (let file of dir) {
        if (file.indexOf("js") > 0 && file.indexOf("json") < 0){
            console.log(resolve(file))
        }
    }
    }catch(err){
        console.log(err)
    }
}

// const path = require('C:\Users\fish\Tecky\hk-map-21-may-22-tw-exercises');

listAllJs(__dirname)
