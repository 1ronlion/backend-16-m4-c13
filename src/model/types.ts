type UserType = 'students' | 'administrators' | 'teachers';

type AdminData = Omit<NormalUserData, 'numSubjects' | 'bithyear'>

interface NormalUserData {
    username: string,
    password: string,
    role: string,
    birthyear : number | 1990
}


export { UserType, NormalUserData, AdminData }