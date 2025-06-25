import * as sdk from 'node-appwrite';

export const {
    PROJECT_ID ,
    API_KEY ,
    DATABASE_ID ,
    PATIENT_COLLECTION_ID ,
    DOCTOR_COLLECTION_ID ,
    APPOINTMENT_COLLECTION_ID ,
    NEXT_PUBLIC_BUCKET_ID : BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT : ENDPOINT,
} = process.env


const client = new sdk.Client();

client.setEndpoint('https://fra.cloud.appwrite.io/v1')
      .setProject('6856d915000e05901e86')
      .setKey('standard_8dabf39ef35c5cb3f6cf3f8ada49fe592aa96e68625a42ea73369aa53430c453fd1fbc5d01d3317ae2b74b2beb17f28c7923d52817419ca85545c5cd2b70cb2809823d82bf5dc00680fafc60ef790a74cfac9df2a7910df3b8cf37a70ca19b063ca71204b44c9ab6383febd61c958b8d75a107a057e484b29af62d650fc9c6e2');

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
