import TodoList from "./components/TodoList";

const App = () => {
  return (
    <main className="flex flex-1 flex-col items-center gap-6 p-8">
      <h1>Lista de tareas</h1>
      <TodoList />
    </main>
  );
};

export default App;
