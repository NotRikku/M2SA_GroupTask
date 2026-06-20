import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';

const hotDrinks = [
  {
    id: '1',
    name: 'Latte',
    price: '₱150',
    description: 'Smooth espresso mixed with steamed milk for a creamy and comforting taste.',
  },
  {
    id: '2',
    name: 'Caramel Latte',
    price: '₱170',
    description: 'Espresso and steamed milk blended with sweet caramel flavor.',
  },
  {
    id: '3',
    name: 'Cappuccino',
    price: '₱160',
    description: 'A classic espresso drink with steamed milk and thick foam on top.',
  },
  {
    id: '4',
    name: 'Americano',
    price: '₱130',
    description: 'Bold espresso mixed with hot water for a clean and strong coffee taste.',
  },
  {
    id: '5',
    name: 'Espresso',
    price: '₱120',
    description: 'A small but powerful shot of rich and intense coffee.',
  },
];

export default function HomeScreen() {
  const handlePress = (item: any) => {
    router.push({
      pathname: '/detail',
      params: {
        name: item.name,
        price: item.price,
        description: item.description,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Terra</Text>
          <Text style={styles.title}>Mori</Text>

          <Text style={styles.subtitle}>Cafe Bar</Text>
        </View>

        <FlatList
          data={hotDrinks}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handlePress(item)}
              activeOpacity={0.85}
            >
              <Text style={styles.name}>{item.name}</Text>

              <Text style={styles.description} numberOfLines={1}>
                {item.description}
              </Text>

              <View style={styles.divider} />

              <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
          )}
        />
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
    paddingHorizontal: 20,
    backgroundColor: '#F7F0E4',
  },

  header: {
    paddingTop: 35,
    paddingBottom: 26,
    alignItems: 'center',
  },

  title: {
    fontSize: 38,
    fontWeight: '900',
    color: '#24382B',
    letterSpacing: 1,
    lineHeight: 40,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 12,
    color: '#6C604D',
    letterSpacing: 3,
    fontWeight: '700',
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#FFF9ED',
    paddingVertical: 22,
    paddingHorizontal: 22,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#D8CDB8',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  name: {
    fontSize: 22,
    fontWeight: '900',
    color: '#24382B',
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    color: '#6C604D',
    lineHeight: 19,
  },

  divider: {
    height: 1,
    backgroundColor: '#D8CDB8',
    marginTop: 18,
    marginBottom: 14,
  },

  price: {
    color: '#24382B',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'left',
  },

  footer: {
    marginTop: 14,
    marginBottom: 35,
    alignItems: 'center',
    backgroundColor: '#24382B',
    paddingVertical: 18,
    borderRadius: 18,
  },

  script: {
    color: '#F7F0E4',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 6,
  },

  thanks: {
    color: '#F7F0E4',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '700',
  },
});