const list = document.getElementById("todolist");
let indexOfSelection = undefined;
const todoInput = document.getElementById("todo-input");
let todolist = [];
let showDeletedTodos = true;
const displayStateButton = document.getElementById("unshow-finished-todos");

function checkShowDeletedTodos() {
    const displayStateString = localStorage.getItem("showDeletedTodos");
    if (displayStateString == "false") {
        displayStateButton.textContent = "Show Finished Todos";
        showDeletedTodos = false;
    } else {
        displayStateButton.textContent = "Unshow Finished Todos";
    }
}

checkShowDeletedTodos();

function getTodolistFromLocal() {
    let i = 0;
    todo = "";
    todolist = [];
    while (todo != null || todo != undefined) {
        todo = localStorage.getItem(i.toString());
        if (todo != null || todo != undefined) {
            const todoString = todo.toString();
            const todoLength = todoString.length;
            const todoData = todoString.slice(0, todoLength - 5);
            const isActive = todo.toString().slice(todoLength - 5, todoLength);

            todolist.push({ todo: todoData, isActive: isActive }); //todo:find simple solution here nested conditon
        }
        i++;
    }
}

getTodolistFromLocal();

function markupSelection(index) {
    indexOfSelection = index;
    toggleTodo();
}

function addTodo() {
    todo = todoInput.value;
    if (todo == "" || todo.split(" ").length - 1 == todo.length) {
        todoInput.value = "";
        return;
    }
    const todoListLengthString = todolist.length.toString();
    localStorage.setItem(todoListLengthString, todo + " true");
    todolist.push({ todo: todo, isActive: " true" });
    todoInput.value = "";
    showTodolist();
}

function toggleTodo() {
    todolist[indexOfSelection].isActive = "false";
    localStorage.setItem(
        indexOfSelection.toString(),
        todolist[indexOfSelection].todo + "false"
    );
    lineThrough();
}

function lineThrough() {
    const selectedTodo = document.getElementById(indexOfSelection.toString());

    selectedTodo.style.textDecoration = "line-through";
    showTodolist();
}

function unshowFinishedTodos() {
    if (showDeletedTodos) {
        showDeletedTodos = false;
        localStorage.setItem("showDeletedTodos", "false");
    } else {
        showDeletedTodos = true;
        localStorage.setItem("showDeletedTodos", "true");
    }
    checkShowDeletedTodos();
    getTodolistFromLocal();
    showTodolist();
}

function showTodolist() {
    list.innerHTML = "";

    todolist.forEach((todo) => {
        const index = todolist.indexOf(todo);
        if (todo.isActive == " true") {
            list.innerHTML += `<li><a href="javascript:markupSelection(${index})" id="${index}">${todo.todo}</a></li>`;
        } else if (showDeletedTodos) {
            list.innerHTML += `<li><a class="deactive-todo"
            href="javascript:markupSelection(${index})"  style="text-decoration: line-through;" id="${index}">${todo.todo}</a></li>`;
        }
    });
}

showTodolist();
