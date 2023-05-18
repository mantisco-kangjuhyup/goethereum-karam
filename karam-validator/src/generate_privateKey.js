import { ethers } from 'ethers';
import * as readline from 'readline';
import * as fs from 'fs';

const generate = async (pwd) => {
    const wallet = ethers.Wallet.createRandom();
    return JSON.parse(await wallet.encrypt(pwd));
}

const repeatPassword = async (pwd) => {    
    return new Promise((resolve, _) => {
        const rlRepeat = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        console.log('Repeat your Password');
        rlRepeat.on("line", (line) => {
            if (line === pwd) {
                resolve(generate(pwd));
                rlRepeat.close();
            } else {
                console.log("Password is not same.");
                rlRepeat.close();
                process.exit(1);
            }
        });
    });
}

const inputPassword = () => {    
    return new Promise((resolve,_) => {
        const rlPwd = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        console.log('Input your Password');
    
        rlPwd.on("line", async (line) => {            
            rlPwd.close();
            resolve(await repeatPassword(line));            
        });    
    });
    
}

inputPassword().then((wallet) => {
    console.log(wallet);
    fs.writeFileSync(`./execution/keystore/key.json`,JSON.stringify(wallet));
    process.exit(0);
});