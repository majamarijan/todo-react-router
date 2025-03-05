import { PrismaClient } from "@prisma/client";
import type { TodoRecord } from "~/db";
import { formatDate, generateDate } from "~/utils/utils";

export const prismaClient = new PrismaClient();

async function main() {
  await prismaClient.$connect();
}

main().catch(async(e)=> {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  console.log('connection closed')
  await prismaClient.$disconnect()
});

// const priority = ['low', 'medium', 'high'];
// export async function createMany() {
//   const data = await fetch('https://dummyjson.com/todos?limit=5');
// 		const todos = await data.json();
// 		const updatedTodos:TodoRecord[] = todos.todos.map((todo:TodoRecord) => {
//       delete todo.id;
//       return ({...todo, userId:1, createdAt: (formatDate(String(generateDate()))), priority: priority[Math.floor(Math.random() * 3)], updatedAt: null})})
// 		console.log(updatedTodos)
// await prismaClient.todos.createMany({data: updatedTodos as any});
// }


// export async function createUsers() {
//   const data = await fetch('https://dummyjson.com/users');
//   const users = await data.json();
//   const updateUsers = users.users.map((u:User) => {
//     return {user_id: u.id, username: u.username, password: u.password, email: u.email, image: u.image}
//   })
//   return updateUsers;
// }
