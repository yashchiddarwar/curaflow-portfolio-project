import {users} from "@/lib/appwrite.config";
import {ID, Query} from "node-appwrite";
import {parseStringify} from "@/lib/utils";

export const createUser = async(user: CreateUserParams) => {
    try{
        const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);
        return newUser;
    }catch (error:any) {
        if(error && error?.code === 409){
            const documents = await users.list([
                Query.equal('email', [user.email])
            ])
            return documents?.users[0];
        }
    }
}

export const getUser = async(userId: string) => {
    try {
        const user = await users.get(userId);
        return parseStringify(user);
    } catch (error) {
        console.log(error);
        return null;
    }
}