const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');
const error = document.getElementById('error');
const search = document.getElementById('search');

let tasks = [];
let completedTasks = [];

function updateCounts() {
  totalCount.textContent = tasks.length;
  completedCount.textContent = completedTasks.length;
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.setAttribute('data-id', task.id);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;
  if (task.completed) {
    span.classList.add('completed');
  }

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';

  // Event listeners
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    if (task.completed) {
      span.classList.add('completed');
      completedTasks.push(task.id);
    } else {
      span.classList.remove('completed');
      completedTasks = completedTasks.filter(id => id !== task.id);
    }
    updateCounts();
  });

  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
    tasks = tasks.filter(t => t.id !== task.id);
    completedTasks = completedTasks.filter(id => id !== task.id);
    updateCounts();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();

  if (text === '') {
    error.textContent = 'Task cannot be empty.';
    return;
  }

  error.textContent = '';
  const task = {
    id: Date.now(),
    text,
    completed: false,
  };

  tasks.push(task);
  const taskElement = createTaskElement(task);
  taskList.appendChild(taskElement);
  taskInput.value = '';
  updateCounts();
});

search.addEventListener('input', () => {
  const searchTerm = search.value.toLowerCase();
  const taskItems = taskList.getElementsByTagName('li');

  Array.from(taskItems).forEach(item => {
    const text = item.querySelector('.task-text').textContent.toLowerCase();
    item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
  });
});
