import DB from "../database/database.json";
import jsonfile from 'jsonfile';
import { randomUUID } from 'node:crypto';
import findUser from './utils'
import { UserType, NormalUserData, AdminData } from './types';

const path = './scr/database/database.json'

type Role = 'student' | 'admin' | 'teacher';

interface UserData{
    username: string, 
    password:string, 
    role: Role
}

class User {
    username;
    password;
    id;
    role;

    constructor(data: UserData){

        const { username, password, role } = data

        this.username = username;
        this.password = password;
        this.id = randomUUID()
        this.role = role 
    }

    login(){}
    logout(){}
    changePassword(){}
}

class Student extends User {

    numSubjects : string[]
    birthyear : number

    constructor(username: string, password: string, birthyear: number ){
        super({ username, password, role: 'student' });

        this.numSubjects = [];
        this.birthyear = birthyear;        

    }


    enroll(){}

}
class Teacher extends User {

    numSubjects : string[]
    birthyear : number

    constructor(username: string, password: string, birthyear: number ){
        super({ username, password, role: 'teacher' });

        this.numSubjects = [];
        this.birthyear = birthyear;        

    }

    grade(){}

}

class Admin extends User {

    constructor(username: string, password: string){
        super({ username, password, role: 'admin' });
    }

    createUser(data: NormalUserData){

        const { username, password, role, birthyear } = data

        const userType : UserType = role === 'admin' ? 'administrators' : ('student' ? 'students' : 'teachers')
        
        const userExist = findUser(username, userType)
        

        if(!userExist){

            let newUser;

            switch(userType){

                case 'administrators': newUser = new Admin(username, password)
                case 'students': newUser = new Student(username, password, birthyear)
                case 'teachers': newUser = new Teacher(username, password, birthyear)
                
            }

            DB.users[userType].push(newUser)
            //jsonfile.writeFileSync(path, DB)

            console.log(DB.users)

            return newUser
        } 
        
        return "El usuario ya existe"

    }
    
    createNewSubject(){}
    editUser(){}

}

let user =  {
    username: "kgarcia", 
    password: "1234", 
    role: "student" as Role,
    birthyear: 1988
}

let admin = new Admin("kgarcia", "1234")

console.log("🚀 ~", admin.createUser(user))
