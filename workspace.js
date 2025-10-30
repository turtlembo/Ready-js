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

const addNameUserForHeader=(user)=>{
        if (!user) {
        alert("Пользователь не найден");
        return;
        }
        hello.textContent = `Привет, ${user}!`;
    
}
addNameUserForHeader(user);

formTasks.addEventListener('submit',(e)=> {
    e.preventDefault();
    if(!nameTask.value){
        alert("Введите задачу")
    }else{
        if(!isList){
            isList = true;
            createList();
            crossingOut();
            editing();
            deleteTask();
            document.querySelector("#not-tasks").classList.add('hidden');
        }
        if(priorityTask.value === "low"){
            createTask(nameTask.value, '');
        }else if(priorityTask.value === "medium"){
            createTask(nameTask.value, 'text-orange-400');
        }else if(priorityTask.value === "high"){
            createTask(nameTask.value, 'text-red-600');
        }
    nameTask.value = '';
    }
})

document.addEventListener('DOMContentLoaded', ()=>{
    //добавь сюда потом рендер задач4
    // createList();
    // createTask();
    // crossingOut();
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
    <li class="task flex justify-between py-3 px-3.5 bg-[#f9fafb] hover:bg-[#eef3ff] rounded-[10px] mb-2.5 ${color}">
        <span>${task}</span>
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
            }
        }
    })
}

const deleteTask = () =>{
    document.addEventListener('click', (e)=>{
        if(e.target.matches("#task-list .delete-task")){
            e.target.closest('.task').remove();
        }
        if(!document.querySelector("#task-list .task")){
            document.querySelector("#task-list").remove();
            isList=false
            document.querySelector("#not-tasks").classList.remove('hidden');
        }
    })
}

