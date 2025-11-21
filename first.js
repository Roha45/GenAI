import * as dotenv from 'dotenv';
dotenv.config();
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';

async function indexDocument() {
    // Pdf ko lode karne ka
    const PDF_PATH = './dsa.pdf';
    const pdfLoader = new PDFLoader(PDF_PATH);
    const rawDocs = await pdfLoader.load();  
    
    console.log("pdf loaded");

    //chanking karo
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    const chunkedDocs = await textSplitter.splitDocuments(rawDocs);

    console.log("chunck created");

    // vector embedding module
    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: 'text-embedding-004',
    });

    console.log("embedding configure");

    //database ko configure kar lete hai
    //Initialize Pinecone Client
    const pinecone = new Pinecone();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

    console.log("pinecone configure");

    //langchain (chainking,embedding,database);
    await PineconeStore.fromDocuments(chunkedDocs, embeddings, {
        pineconeIndex,
        maxConcurrency: 5,
    });

    console.log("data store succesfuly");

}

indexDocument();