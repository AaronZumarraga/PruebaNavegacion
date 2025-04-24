import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';

export default function DetailsScreen() {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text>Detalles de la pagina de inicio</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nombre"
        value={name}
        onChangeText={setName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
});
