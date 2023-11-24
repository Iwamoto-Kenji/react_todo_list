import React, { useState } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, { text: taskText, completed: false }]);
      setTaskText('');
    }
  };

  const deleteTask = (index) => {
    if (window.confirm('削除してもよろしいですか？')) {
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
    }
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], completed: !newTasks[index].completed };
    setTasks(newTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setTaskText(tasks[index].text);
  };

  const saveTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], text: taskText };
    setTasks(newTasks);
    setEditingIndex(null);
    setTaskText('');
  };

  return (
    <div>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="タスク追加"
      />
      <button onClick={addTask}>保存</button>
      <div>
        <h2>ToDo一覧</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              {editingIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                  />
                  <button onClick={() => saveTask(index)}>保存</button>
                </div>
              ) : (
                <div>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(index)}
                  />
                  <span>{task.text}</span>
                  <button onClick={() => startEditing(index)}>編集</button>
                  <button onClick={() => deleteTask(index)}>削除</button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <p>
          全てのタスク: {tasks.length} 完了済み: {tasks.filter((task) => task.completed).length}{' '}
          未完了: {tasks.filter((task) => !task.completed).length}
        </p>
      </div>
    </div>
  );
};

export default TodoApp;
