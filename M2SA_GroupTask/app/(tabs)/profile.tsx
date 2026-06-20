import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const [name, setName] = useState('');

  useEffect(() => {
    loadName();
  }, []);

  const loadName = async () => {
    try {
      const savedName = await AsyncStorage.getItem('profileName');

      if (savedName) {
        setName(savedName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('profileName', name);
      alert('Profile saved!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>PROFILE</Text>
        <Text style={styles.subtitle}>WELCOME TO TERRA MORI</Text>

        <View style={styles.card}>
          <Text style={styles.label}>YOUR NAME</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#9C8F78"
            value={name}
            onChangeText={setName}
          />

          <TouchableOpacity style={styles.button} onPress={saveName}>
            <Text style={styles.buttonText}>SAVE NAME</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.nameBox}>
          <Text style={styles.current}>CURRENT NAME</Text>
          <Text style={styles.name}>
            {name ? name : 'No name saved yet.'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F0E4',
  },

  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F7F0E4',
  },

  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#24382B',
    marginTop: 30,
  },

  subtitle: {
    color: '#6C604D',
    letterSpacing: 2,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#FFF9ED',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D8CDB8',
  },

  label: {
    color: '#24382B',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 10,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#D8CDB8',
    paddingVertical: 12,
    color: '#24382B',
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#24382B',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: '#F7F0E4',
    fontWeight: '900',
    letterSpacing: 1,
  },

  nameBox: {
    marginTop: 24,
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#24382B',
  },

  current: {
    color: '#F7F0E4',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '900',
    marginBottom: 8,
  },

  name: {
    color: '#F7F0E4',
    fontSize: 20,
    fontWeight: '800',
  },
});