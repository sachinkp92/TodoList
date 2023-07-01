let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoBtn = document.getElementById("addTodoBtn");
let todoUserInput = document.getElementById("todoUserInput");
let saveTodoBtn = document.getElementById("saveTodoBtn");

// let todoList = [{
//         text: "Learn HTML",
//         uniqueNo: 1
//     },
//     {
//         text: "Learn CSS",
//         uniqueNo: 2
//     },
//     {
//         text: "Learn JavaScript",
//         uniqueNo: 3
//     },
//     {
//         text: "Learn Bootstrap",
//         uniqueNo: 4
//     }
// ];

function getTodoList() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoList();
let todosCount = todoList.length;

saveTodoBtn.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function onChangeStatusTodo(checkboxId, labelId, todoId) {
    let checkboxEl = document.getElementById(checkboxId);
    // console.log(checkboxEl.checked);
    let labelEl = document.getElementById(labelId);
    labelEl.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}

function onDeleteTodo(todoId) {
    let todoEl = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoEl);

    let deleteIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteIndex, 1);
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onChangeStatusTodo(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);

}

for (let eachTodo of todoList) {
    createAndAppendTodo(eachTodo);
}

function onAddTodo() {
    let todoUserInputValue = todoUserInput.value;
    todosCount = todosCount + 1;
    if (todoUserInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    let newTodo = {
        text: todoUserInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    todoUserInput.value = "";
}
addTodoBtn.onclick = function() {
    onAddTodo();
}