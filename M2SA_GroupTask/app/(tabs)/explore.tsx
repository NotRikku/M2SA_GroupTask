import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen() {
  const [note, setNote] = useState('');

  useEffect(() => {
    loadNote();
  }, []);

  const loadNote = async () => {
    try {
      const savedNote = await AsyncStorage.getItem('cartNote');
      if (savedNote) {
        setNote(savedNote);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveNote = async () => {
    try {
      await AsyncStorage.setItem('cartNote', note);
      Keyboard.dismiss();
      alert('Note saved!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>CART NOTE</Text>
        <Text style={styles.subtitle}>SPECIAL INSTRUCTIONS</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Example: Less sugar, extra hot..."
            placeholderTextColor="#9C8F78"
            value={note}
            onChangeText={setNote}
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={saveNote}>
            <Text style={styles.buttonText}>SAVE NOTE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.savedBox}>
          <Text style={styles.savedLabel}>SAVED NOTE</Text>
          <Text style={styles.saved}>
            {note ? note : 'No note saved yet.'}
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
    letterSpacing: 3,
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

  input: {
    minHeight: 120,
    textAlignVertical: 'top',
    color: '#24382B',
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D8CDB8',
    paddingBottom: 12,
    marginBottom: 18,
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

  savedBox: {
    marginTop: 24,
    backgroundColor: '#24382B',
    borderRadius: 18,
    padding: 18,
  },

  savedLabel: {
    color: '#F7F0E4',
    fontWeight: '900',
    letterSpacing: 2,
    fontSize: 11,
    marginBottom: 8,
  },

  saved: {
    color: '#F7F0E4',
    fontSize: 15,
    lineHeight: 22,
  },
});