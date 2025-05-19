import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleAddOrEdit = () => {
    if (task.trim() === '') return;

    if (editId) {
      setTaskList(taskList.map(t =>
        t.id === editId ? { ...t, title: task } : t
      ));
      setEditId(null);
    } else {
      setTaskList([
        ...taskList,
        { id: Date.now().toString(), title: task, completed: false },
      ]);
    }

    setTask('');
  };

  const toggleComplete = (id) => {
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleEdit = (item) => {
    setTask(item.title);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    setTaskList(taskList.filter(t => t.id !== id));
  };

  const clearAll = () => {
  setTaskList([]);
};


  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => toggleComplete(item.id)}
      style={[styles.taskItem, item.completed && styles.taskDone]}
    >
      <Text style={styles.taskText}>
        {item.completed ? '✔️ ' : '⬜ '} {item.title}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={styles.actionText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.actionText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter task..."
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAddOrEdit} style={styles.addBtn}>
          <Text style={styles.btnText}>{editId ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />

      {taskList.length > 0 && (
        <TouchableOpacity onPress={clearAll} style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#222',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: '#222',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  list: {
    marginBottom: 20,
  },
  taskItem: {
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskDone: {
    backgroundColor: '#e0ffe0',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionText: {
    fontSize: 18,
  },
  clearBtn: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  clearText: {
    color: '#888',
    fontSize: 14,
  },
});
