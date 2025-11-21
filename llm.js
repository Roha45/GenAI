import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync';

const ai = new GoogleGenAI({apiKey:"AIzaSyCruvipp5gjiF0q_l0FCO1_N-WgScC7aT0"});

const histry=[];

async function chatrony(userproblem) {
    histry.push({
        role:'user',
        parts:[{text:userproblem}]
    })
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: histry,
  });
  histry.push({
    role:'model',
    parts:[{text:response.text}]
  })
  console.log(response.text);
}

async function main(){
    const userproblem=readlineSync.question("ask me anything-->");
    await chatrony(userproblem);
    main();
}
main();