import { PrismaClient } from "@prisma/client";

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
//   const data = await fetch('https://dummyjson.com/todos?limit=10');
// 		const todos = await data.json();
// 		const updatedTodos:TodoRecord[] = todos.todos.map((todo:TodoRecord) => {
//       delete todo.id;
//       return ({...todo, createdAt: formatDate(formatDate(String(generateDate()))), priority: priority[Math.floor(Math.random() * 3)], updatedAt: null})})
// 		console.log(updatedTodos)
// //await prismaClient.todos.createMany({data: updatedTodos});
// }