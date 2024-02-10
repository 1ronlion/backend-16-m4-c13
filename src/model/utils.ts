import DB from '../database/database.json';

import { UserType } from './types';


// let values = Object.values(DB)

export default function findUser (username: string, role: UserType) {
	
	const users = DB.users[role]

	const  result = users.find((user)=> user.username == username)

	return result

}



