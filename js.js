function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
const input = document.getElementById("todo-input");
const btn = document.getElementById("submit-button");
const root = document.getElementById("root");
let count = 0;
const todos = []
const todosId = []
btn.addEventListener("click", handleAddTodo)
function handleAddTodo() {
    const inputVal = input.value
    if (inputVal !== "") {
        todos.push(inputVal)
        todosId.push(inputVal)



    }
    console.log(typeof inputVal)
    input.value = ""
    return renderTodos()
}
function renderTodosId() {
    let id = 0
    for (let i = 0; i < todosId.length; i++) {
        todosId.splice(i, 1, String(todos[i] + id++))
        document.getElementById(`${todos[i]}`).setAttribute("id", todosId[i])
    }
    return todosId
}
function renderTodos() {
    count = 0
    const template = todos.map(item => {
        console.log(item)
        return ` 
<li id="${item}" style="color:#fccf6d">
            <span>
            ${item}
            </span>
            <button  onclick="deleteItem(this)" style="color: white;
    background-color: #fccf6d; border-radius:  2rem 0 0 2rem;border: 1px solid white;margin: 10px;">حذف</button>
        <button  onclick="editItem(this)" style="color: white;
    background-color: #fccf6d; margin-top: 10px; border-radius:  0 2rem 2rem 0;border: 1px solid white;">ویرایش</button></li>
        `
    })
    const temp = template.join("")
    root.innerHTML = temp
    return renderTodosId()
}
function deleteItem(clickedElement) {
    count = 0
    unFreezAddTodo()
    clickedElement.parentElement.remove()
    console.log(clickedElement.parentElement)
    for (let i = 0; i < todos.length; i++) {
        if (todosId[i] === clickedElement.parentElement.id) {
            todos.splice(i, 1)
            todosId.splice(i, 1)
        }
    }
}
function editItem(clickedElement) {
    count++
    freezAddTodo()
    if (count === 1) {
        let submitBtn = document.createElement("button")
        let editInput = document.createElement("input")
        editInput.getAttribute("type", "text")
        editInput.getAttribute("value")
        editInput.id = "editInput"
        submitBtn.innerText = "ثبت"
        submitBtn.id = "editBtn"
        editInput.placeholder = "متن مورد نظر را وارد کنید"
        clickedElement.parentElement.appendChild(editInput)
        clickedElement.parentElement.appendChild(submitBtn)
        submitBtn.addEventListener("click", () => {
            if (editInput.value === "") {
                editInput.remove()
                submitBtn.remove()
                count = 0
            }
            if (editInput.value !== "") {
                for (let i = 0; i < todos.length; i++) {
                    if (todosId[i] === clickedElement.parentElement.id) {
                        todos.splice(i, 1, editInput.value)
                        editInput.remove()
                        submitBtn.remove()
                        renderTodos()
                        count = 0
                    }
                }
            }
            unFreezAddTodo()
        })
    }
}
function freezAddTodo() {
    btn.classList.add("disabled")
}
function unFreezAddTodo() {
    btn.classList.remove("disabled")
}


