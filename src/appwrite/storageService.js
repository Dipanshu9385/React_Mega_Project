import conf from "../conf/conf";
import { Client , Storage,ID } from "appwrite";

export class StorageService{
    client=new Client()
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.bucket= new Storage(this.client)
        
    }

    async createFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: createFile Error" , error)
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile Error" , error)
            return false;
        }
    }

    getFilePreview(fileID){
        try {
            return this.getFilePreview(
                conf.appwriteBucketId,
                fileID
            )
        } catch (error) {
            console.log("Appwrite Service :: getFilePreview Error" , error)
        }
    }

    getFileDownload(fileID){
        try {
            return this.bucket.getFileDownload(
                conf.appwriteBucketId,
                fileID
            )
        } catch (error) {
            console.log("Appwrite Service :: deleteFile Error" , error)
            return false;
        }
    }

    async getFile(){
        try {
            return await this.bucket.listFiles(conf.appwriteBucketId)
        } catch (error) {
            throw error;
        }
    }
}