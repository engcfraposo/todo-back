import { createClient } from 'redis';

export const getOnAzureCache = async (key?: string) => {
    if(!key){
        throw new Error("No key provided");
    }
    const redisClient = createClient({
        url:  `rediss://${process.env.AZURE_CACHE_HOST}:${process.env.AZURE_CACHE_PORT}`,
        password: process.env.AZURE_CACHE_KEY,
    });

    redisClient.on('error', (err) => {
        console.log("Error " + err);
    });

    await redisClient.connect();

    console.log("Connected to Azure Redis Cache");

    const value = await redisClient.get(key);

    console.log("cached: ", value);

    redisClient.quit();

    return JSON.parse(value as string);
};

export const setOnAzureCache = async (key?: string, value?: any) => {
    if(!key || !value){
        throw new Error("No key or value provided");
    }

    const redisClient = createClient({
        url:  `rediss://${process.env.AZURE_CACHE_HOST}:${process.env.AZURE_CACHE_PORT}`,
        password: process.env.AZURE_CACHE_KEY,
    });

    redisClient.on('error', (err) => {
        console.log("Error " + err);
    });

    await redisClient.connect();

    console.log("Connected to Azure Redis Cache");

    const stringifiedValue = JSON.stringify(value);

    await redisClient.set(key, stringifiedValue);

    console.log("cached new value");

    redisClient.quit();

    return;
}