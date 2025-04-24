import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { firestore } from '@/firebaseConfig';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

export default function DetailsScreen() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'Users'), (snapshot) => {
      const usersList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, name: data.name || '' }; // Ensure 'name' exists
      });
      setUsers(usersList);
    });
    return unsubscribe; // Cleanup listener on unmount
  }, []);

  const addUser = async () => {
    if (name.trim()) {
      await addDoc(collection(firestore, 'Users'), { name });
      setName(''); // Clear input
    }
  };

  interface User {
    id: string;
    name: string;
  }

  const deleteUser = async (id: string): Promise<void> => {
    await deleteDoc(doc(firestore, 'Users', id));
  };

  return (
    <View style={styles.container}>
      <Text>Detalles de la pagina de inicio</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nombre"
        value={name}
        onChangeText={setName}
      />
      <Button title="Agregar Nombre" onPress={addUser} />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteUser(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
  },
});
