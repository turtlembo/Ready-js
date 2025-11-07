// let i = JSON.parse(localStorage.getItem('logged'));
// console.log(i);
const hello = document.querySelector("#hello");
const btnExit = document.querySelector("#btn-exit");
const formTasks = document.querySelector("#form-tasks");
const nameTask = document.querySelector("#name-task");
const priorityTask = document.querySelector("#priority-task");
const btnAdd = document.querySelector("#btn-add");

let user = JSON.parse(localStorage.getItem('logged'));
let isList = false;

const randomId = () =>{
    return Math.floor(Math.random() * (20000 - 1 + 1)) + 1;
}

const addNameUserForHeader=(user)=>{
        if (!user) {
        alert("Пользователь не найден");
        location.href = "index.html";
        return;
        }
        hello.textContent = `Привет, ${user}!`; 
}

btnExit.addEventListener('click', ()=>{
    location.href = 'index.html'
})

const getTaskFromLS =()=>{
    let taskLS;
    const task = localStorage.getItem('tasks');
    if(!task){
        taskLS = {users:{}}
    }else{
        taskLS = JSON.parse(task)
    }
    return taskLS;
}

const saveTaskFromLS= (item) =>{
    let taskLS = getTaskFromLS();
    if (!taskLS.users[user]) {
        taskLS.users[user] = [];
    }
    taskLS.users[user].push(item)
    localStorage.setItem('tasks', JSON.stringify(taskLS))
}

const renderFromLS = () =>{
    let tasks = getTaskFromLS().users;
    let markup = '';
    for (const element in tasks) {
        if (element === user){
            const userTasks = tasks[element];
            if(userTasks.length>0){
                createList();
                isList = true;
                document.querySelector("#not-tasks").classList.add('hidden');
                for (const task of userTasks) {
                    let color = '';
                    let checked = '';
                    if(task.priorityTask === "medium"){
                        color= 'text-orange-400';
                    }else if(task.priorityTask === "high"){
                        color= 'text-red-600';
                    }
                    if(task.done === true){
                        checked = 'checked'
                    }else{
                        checked = '';
                    }
                    markup += `
                    <li class="task flex justify-between py-3 px-3.5 bg-[#f9fafb] hover:bg-[#eef3ff] rounded-[10px] mb-2.5 ${color}" data-id="${task.id}">
                    <span class="${task.done?'line-through':''}">${task.title}</span>
                    <div class="flex gap-2">
                        <input class="m-1 w-4.5 crossing-out" type="checkbox" ${checked}>
                        <button class="text-[18px] px-1.5 editing">✏️</button>
                        <button class="text-[18px] px-1.5 delete-task">🗑️</button>
                    </div>
                    </li>
                `
                }
                document.querySelector("#task-list").insertAdjacentHTML('beforeend', markup)
            }   
        }
    }  
}

const deleteTaskFromLS = (value) =>{
    let taskLS = getTaskFromLS();
    if (!taskLS.users[user]) {
        taskLS.users[user] = [];
    }
    taskLS.users[user].forEach((el, ind) =>{
        if(el.id == Number(value)){
            taskLS.users[user].splice(ind,1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(taskLS))        
}

const crossingOutFromLS = (value, crossing) =>{
    let taskLS = getTaskFromLS();
    if (!taskLS.users[user]) {
        taskLS.users[user] = [];
    }
    taskLS.users[user].forEach((el) =>{
        if(el.id == Number(value)){
            if(crossing.classList.contains('line-through')){
                el.done = true;
            }else{
                el.done = false
                
            }
        }
    })
    localStorage.setItem('tasks', JSON.stringify(taskLS))  
}

const editingFromLS = (value, newTask) =>{
    let taskLS = getTaskFromLS();
    if (!taskLS.users[user]) {
        taskLS.users[user] = [];
    }
    taskLS.users[user].forEach((el) =>{
        if(el.id == Number(value)){
            el.title = newTask;
        }
    })
    localStorage.setItem('tasks', JSON.stringify(taskLS)) 
}

formTasks.addEventListener('submit',(e)=> {
    e.preventDefault();
    if(!nameTask.value){
        alert("Введите задачу")
    }else{
        if(!isList){
            isList = true;
            createList();
            document.querySelector("#not-tasks").classList.add('hidden');
        }
        const newTask ={
            id: randomId(),
            title: nameTask.value,
            priorityTask: priorityTask.value,
            done:false
        }
        let color = ''
        if(priorityTask.value === "medium"){
            color= 'text-orange-400';
        }else if(priorityTask.value === "high"){
            color= 'text-red-600';
        }
        createTask(newTask,color);
        saveTaskFromLS(newTask)
    nameTask.value = '';
    }
})

document.addEventListener('DOMContentLoaded', ()=>{
    renderFromLS();
    crossingOut();
    editing();
    deleteTask();
    addNameUserForHeader(user);
})

const createList = ()=>{
    const markup = `
    <ul id = "task-list" class="w-full">
    </ul>
    `
    formTasks.insertAdjacentHTML('afterend',markup)
}

const createTask = (task, color)=>{
    const markup = `
    <li class="task flex justify-between py-3 px-3.5 bg-[#f9fafb] hover:bg-[#eef3ff] rounded-[10px] mb-2.5 ${color}" data-id="${task.id}">
        <span class="${task.done?'line-through':''}">${task.title}</span>
        <div class="flex gap-2">
            <input class="m-1 w-4.5 crossing-out" type="checkbox">
            <button class="text-[18px] px-1.5 editing">✏️</button>
            <button class="text-[18px] px-1.5 delete-task">🗑️</button>
        </div>
    </li>
    `
    document.querySelector("#task-list").insertAdjacentHTML('beforeend', markup)
}

const crossingOut = () =>{
    // const task = document.querySelector(".task")
    document.addEventListener('click', (e)=>{
        if(e.target.matches("#task-list .crossing-out")){
            const taskItem = e.target.closest('.task');
            const span = taskItem.querySelector('span');
            span.classList.toggle("line-through");
            crossingOutFromLS(e.target.closest(".task").dataset.id, e.target.closest('.task').querySelector('span'))
        }
    })
}

const editing = () =>{
    document.addEventListener('click', (e)=>{
        if(e.target.matches("#task-list .editing")){
            const newTask = prompt("Введите новую задачу");
            if(newTask.trim() !== ''){
                const taskItem = e.target.closest('.task');
                const span = taskItem.querySelector('span');
                span.textContent = newTask;
                editingFromLS(e.target.closest(".task").dataset.id, newTask)
            }
        }
    })
}

const deleteTask = () =>{
    document.addEventListener('click', (e)=>{
        if(e.target.matches("#task-list .delete-task")){
            deleteTaskFromLS(e.target.closest(".task").dataset.id);
            e.target.closest('.task').remove();
                if(!document.querySelector("#task-list .task")){
                    document.querySelector("#task-list").remove();
                    isList=false
                    document.querySelector("#not-tasks").classList.remove('hidden');
                }       
        }
    })
}

