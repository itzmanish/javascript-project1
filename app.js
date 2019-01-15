// Define UI vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-task')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

loadEventListner()

// load all eventlistner
function loadEventListner() {
    // DOM event listener
    document.addEventListener('DOMContentLoaded', getItem)
    // add task event
    form.addEventListener('submit', addTask)
    // remove task event
    taskList.addEventListener('click', removeTask)
    // clear all task event
    clearBtn.addEventListener('click', clearTask)
    // filter task
    filter.addEventListener('keyup', filterTask)
}
// Onload update tasks list
function getItem() {
    tasks = getTaskFromLS()
    tasks.forEach(function (task) {
        // create li element
        const li = document.createElement('li')
        // add class
        li.className = 'collection-item'
        // create text node and append li
        li.appendChild(document.createTextNode(task))
        // create new link element
        const link = document.createElement('a')
        // add class
        link.className = 'delete-item secondary-content'
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // append link to li
        li.appendChild(link)
        // append li to ul
        taskList.appendChild(li)
    })
}
// Get item from localstorage
function getTaskFromLS() {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    return tasks
}
// Set item to localstorage
function addTaskToLS(task) {
    const tasks = getTaskFromLS()
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
// delete one item from localstorage
function deleteTaskFromLS(task) {
    const tasks = getTaskFromLS()
    tasks.forEach(function (Item, index) {
        if (task.textContent === Item) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
// delete all item from localstorage
function clearAllTaskFromLS() {
    localStorage.removeItem('tasks')
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task')
    }
    // create li element
    const li = document.createElement('li')
    // add class
    li.className = 'collection-item'
    // create text node and append li
    li.appendChild(document.createTextNode(taskInput.value))
    // create new link element
    const link = document.createElement('a')
    // add class
    link.className = 'delete-item secondary-content'
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // append link to li
    li.appendChild(link)
    // append li to ul
    taskList.appendChild(li)

    // add to local storage
    addTaskToLS(taskInput.value)
    // clear the field
    taskInput.value = ''

    e.preventDefault();
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            deleteTaskFromLS(e.target.parentElement.parentElement)
        }
    }
}

function clearTask(e) {
    // taskList.innerHTML = ''

    // faster way
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    clearAllTaskFromLS()
}

function filterTask(e) {
    const text = e.target.value.toLowerCase()

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
}