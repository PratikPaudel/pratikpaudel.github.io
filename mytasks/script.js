const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTasks(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTasks()
})

function addTasks(todo) {
    let myTaskText = input.value
    
    if(todo) {
        myTaskText = todo.text
    }

    if (myTaskText) {
        const todoEl = document.createElement('li')
        if (todo && todo.completed) {
            todoEl.classList.add('completed')
        }
        todoEl.innerText = myTaskText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            
        })

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()
        })
        todosUL.appendChild(todoEl)
        input.value = ''

        modifyList()
    }
}

function modifyList() {
    todosEl = document.querySelectorAll('li')
    const todos = []
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText, 
            completed: todoEl.classList.contains
            ('completed')
        })
    })
    localStorage.setItem('todos', JSON.stringify(todos))
}
