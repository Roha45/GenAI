import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync';

const ai = new GoogleGenAI({apiKey:"AIzaSyCruvipp5gjiF0q_l0FCO1_N-WgScC7aT0"});


const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history:[],
});

async function main(){
    const userproblem=readlineSync.question("ask me anything-->");
    const response = await chat.sendMessage({
        message:userproblem,
    });
    console.log(response.text);
    main();
}
main();