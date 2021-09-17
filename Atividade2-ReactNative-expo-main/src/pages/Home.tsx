import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import {TasksList } from '../components/TasksList';
//import {Task} from '../components/TaskItem';

import { TodoInput } from '../components/TodoInput';

interface TaskEdit {
  id: number,
  taskNewTitle: string
}

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    
    const newtask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }  


      const taskfound = tasks.findIndex(task => task.title === newTaskTitle)

      if (taskfound !== -1) {

        Alert.alert(
          'task invalida !',
          'você não pode inserir uma task com o mesmo nome.'
        )

      } else {

        setTasks([...tasks, newtask]); 


      }

  }

  function handleEditTask({id, taskNewTitle}: TaskEdit) {
    // TODO
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
       
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => setTasks(tasks.filter(task => task.id !== id)),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {}
      }
    );
  }

  
  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})