import { router, useLocalSearchParams } from 'expo-router';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function DetailScreen() {
  const { name, price, description } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.logo}>Terra Mori</Text>
        <Text style={styles.subtitle}>Cafe Bar</Text>

        <View style={styles.card}>
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.description}>{description}</Text>

          <View style={styles.divider} />

          <Text style={styles.price}>{price}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>BACK TO MENU</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    backgroundColor: '#F7F0E4',
  },

  logo: {
    textAlign: 'center',
    color: '#24382B',
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 1,
  },

  subtitle: {
    textAlign: 'center',
    color: '#6C604D',
    fontSize: 11,
    letterSpacing: 3,
    marginTop: 8,
    marginBottom: 30,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#FFF9ED',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: '#D8CDB8',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  name: {
    fontSize: 32,
    fontWeight: '900',
    color: '#24382B',
    marginBottom: 12,
  },

  description: {
    color: '#6C604D',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 18,
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#D8CDB8',
    marginBottom: 16,
  },

  price: {
    fontSize: 23,
    color: '#24382B',
    fontWeight: '900',
    textAlign: 'left',
    marginBottom: 28,
  },

  button: {
    backgroundColor: '#24382B',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: '#F7F0E4',
    fontWeight: '900',
    letterSpacing: 1,
  },

  footer: {
    marginTop: 28,
    textAlign: 'center',
    color: '#6C604D',
    fontStyle: 'italic',
  },
});