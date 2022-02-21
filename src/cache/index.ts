import { createClient } from "redis";

export const getOnAzureCache = async (key?:string) => {
    if(!key) {
        throw new Error("No key provided");
    }
    const client = createClient({
        url: `rediss://${process.env.AZURE_CACHE_HOST}:${process.env.AZURE_CACHE_PORT}`,
        password: process.env.AZURE_CACHE_KEY,
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    console.log(`Connected to Azure Redis Cache at port: ${process.env.AZURE_CACHE_PORT}`);
    const value = await client.get(key);
    console.log(`cache: ${value}`);
    client.quit();
    return JSON.parse(value as string);
}

export const setOnAzureCache = async (key?:string, data?: object): Promise<any> => {
    if(!key || !data) {
        throw  new Error("No key or data provided")
    }
    const client = createClient({
        url: `rediss://${process.env.AZURE_CACHE_HOST}:${process.env.AZURE_CACHE_PORT}`,
        password: process.env.AZURE_CACHE_KEY,
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    const value = JSON.stringify(data);
    await client.set(key, value);
    console.log(`cached new info: ${value}`);
    client.expire(key, 60*60*24);
    client.quit();
    return
}
