import type { TodoRecord } from "~/db";

export function sortTodos(todos: TodoRecord[]) {
  return todos?.sort((a, b) =>
    !a.updatedAt &&
    !b.updatedAt &&
    new Date(a.createdAt).toISOString() > new Date(b.createdAt).toISOString()
      ? -1
      : 1 &&
        !a.updatedAt &&
        b.updatedAt &&
        new Date(a.createdAt).toISOString() >
          new Date(b.updatedAt).toISOString()
      ? -1
      : 1 &&
        a.updatedAt &&
        !b.updatedAt &&
        new Date(a.updatedAt).toISOString() >
          new Date(b.createdAt).toISOString()
      ? -1
      : 1 &&
        a.updatedAt &&
        b.updatedAt &&
        new Date(a.updatedAt).toISOString() >
          new Date(b.updatedAt).toISOString()
      ? -1
      : 1
  );
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateDate() {
  const randomDate = (start: Date, end: Date) => {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };
  return randomDate(new Date(2018, 0, 1), new Date());
}

export function ObjectID() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

