let tasks = []

if (localStorage.getItem('stateTask') != undefined)
    tasks = JSON.parse(localStorage.getItem('stateTask')).map((el) => new Task(el.title, el.done))

function localSave(save) {
    localStorage.removeItem('stateTask')
    localStorage.setItem('stateTask', JSON.stringify(save))
}

function deleteTaskHandler() {
    this.done = !this.done
    localSave(tasks)
    renderTasks(tasks)
}

function deletePushTask() {
    tasks = tasks.filter((el) => el.title !== this.title)
    localSave(tasks)
    renderTasks(tasks)
}

function Task(title, done = false) {
    this.title = title
    this.done = done

    this.deleteTaskHandler = deleteTaskHandler
    this.deletePushTask = deletePushTask
}

function getTaskElement(task) {
    const containerEl = document.createElement('div')
    const inputEl = document.createElement('input')
    const titleEl = document.createElement('p')
    const buttonEl = document.createElement('button')

    containerEl.classList.add('task-item')
    inputEl.setAttribute('type', 'checkbox')
    if (task.done) {
        inputEl.setAttribute('checked', 'checked')
        containerEl.classList.add('done')
    }
    titleEl.classList.add('task-item__title')
    titleEl.textContent = task.title
    buttonEl.classList.add('task-item__btn')
    buttonEl.textContent = 'delete'
    buttonEl.addEventListener('click', task.deletePushTask.bind(task))

    inputEl.addEventListener('click', task.deleteTaskHandler.bind(task))

    containerEl.appendChild(inputEl)
    containerEl.appendChild(titleEl)
    containerEl.appendChild(buttonEl)

    return containerEl
}

function renderTasks(tasks) {
    const taskListEl = document.querySelector('#task-list')
    taskListEl.textContent = ''

    tasks.forEach((el) => {
        taskListEl.appendChild(getTaskElement(el))
    })
}

function addTaskHandler() {
    const inputEl = document.querySelector('#new-task')

    if (inputEl.value) {
        tasks.push(new Task(inputEl.value))
        localStorage.setItem('stateTask', JSON.stringify(tasks))
        renderTasks(tasks)
        inputEl.value = ''
    }
}

const addTaskBtnEl = document.querySelector('#add-task-btn')
addTaskBtnEl.addEventListener('click', addTaskHandler)

renderTasks(tasks)
