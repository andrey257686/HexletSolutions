window.onload = function() {  

  const lists = [
    {
      id: 1,
      listName: 'General',
      state: 'current',
    },
    // {
    //   id: 2,
    //   listName: 'notGenral',
    //   state: 'link',
    // }
  ]

  const tasks = [
    // {
    //   id: 1,
    //   listId: 1,
    //   taskName: '',
    // }
  ]

  const renderLists = () => {
    const containerList = document.querySelector('[data-container="lists"]');
    const li = lists.map((list) => list.state === 'current' ? 
      `<li><b>${list.listName}</b></li>` : 
      `<li><a href="#${list.listName.toLowerCase()}">${list.listName}</a></li>`);
    
    containerList.innerHTML = `<ul>${li.join('')}</ul>`;
    refreshLinks();
  }

  const renderTasks = () => {
    const containerTask = document.querySelector(('[data-container="tasks"]'));
    const currentListId = lists.find(list => list.state === 'current').id;
    const currentTasks = tasks.filter(task => task.listId === currentListId);
    const li = currentTasks.map((task) => `<li>${task.taskName}</li>`);
    containerTask.innerHTML = `<ul>${li.join('')}</ul>`;
  }

  const handleSubmitTask = (event) => {
    event.preventDefault();
    const currentListId = lists.find(list => list.state === 'current').id;
    const inputTask = document.getElementById('new-task-name');
    const task = {
      id: tasks.length + 1,
      listId: currentListId,
      taskName: inputTask.value,
    }
    tasks.push(task);
    renderTasks();
  }

  const refreshLinks = () => {
    const elementLists = document.getElementsByTagName('a');
    const ArrElementLists = Array.from(elementLists);
    ArrElementLists.forEach((elementList) => {
      elementList.addEventListener('click', (event) => {
        event.preventDefault();
        const name = elementList.text;
        lists.forEach((list) => list.listName === name ? list.state = 'current' : list.state = 'link');
        renderLists();
        renderTasks();
      })
    })
  }

  const handleSubmitList = (event) => {
    event.preventDefault();
    const inputList = document.getElementById('new-list-name');
    if (lists.find(list => list.listName === inputList.value)){
      return 0;
    }
    const list = {
      id: lists.length + 1,
      listName: inputList.value,
      state: 'link',
    }
    lists.push(list);
    renderLists();
  }

  const app = () => {
    renderLists();
    const formList = document.querySelector('[data-container="new-list-form"]');
    const formTask = document.querySelector('[data-container="new-task-form"]');
    formTask.addEventListener('submit', handleSubmitTask);
    formList.addEventListener('submit', handleSubmitList);
  }

  app();
}