import conf from "../conf/conf";
import {Client,Account,ID} from 'appwrite';

export class AuthService{
    client=new Client()
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
    this.account=new Account(this.client)
    }


    async createAccount({email,password,name}){
        try {
           const userAccount=await this.account.create(ID.unique(),email,password,name)
           if (userAccount) {
            // call login function here
           } else {
            return userAccount;
           }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
           return await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const currentAccount= await this.account.get()
            if (currentAccount) {
                return currentAccount;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession()
        } catch (error) {
           console.log("Error appwrite Service :: logout" ,error)
            
        }
    }
}
 
const authService=new AuthService();
export default authService;

