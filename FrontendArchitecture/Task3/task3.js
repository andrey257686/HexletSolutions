window.onload = function() {  
  let tasks = {};
  tasks.items = [];
  const get = () => {
    return tasks;
  }
  // Возвращает объект: { items: [{ name: 'имя задачи' }, { ... }]  }
  const post = (data) => {
    tasks.items.push(data);
    return 201;
  }
  post({name: 'testTask1'});
  post({name: 'testTask2'});
  post({name: 'testTask3'});
  // Где data это { name: 'имя задачи' }
  // data = { name : 'task 1' }

  const addTasksToForm = (items, listForm) => {
    items.forEach((item)=>{
      const newTask = document.createElement('li');
      newTask.classList.add('list-group-item');
      const newTaskText = document.createTextNode(item.name);
      newTask.append(newTaskText);
      listForm.prepend(newTask);
    })
  }

  const app = () => {
    const taskForm = document.querySelector('.form-inline');
    const listForm = document.querySelector('.list-group');
    const inputForm = document.querySelector('.form-control');
    const state = {};
    state.tasks = get();
    if (state.tasks.items.length){
      addTasksToForm(state.tasks.items, listForm);
    }
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newTask = document.createElement('li');
      newTask.classList.add('list-group-item');
      const inputText = inputForm.value;
      const newTaskText = document.createTextNode(inputText);
      newTask.append(newTaskText);
      listForm.prepend(newTask);
      post({name: inputText});
    })
  }

  app();
  // post({name: 'task 1'});
  // post({name: 'task 2'});
  // const testGet = get();
  // console.log(testGet);
}