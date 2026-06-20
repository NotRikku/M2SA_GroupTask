import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [coffeeItems, setCoffeeItems] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMenu();
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem('favorites');

      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveFavorites = async (
    data: string[]
  ) => {
    try {
      await AsyncStorage.setItem(
        'favorites',
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async (
    id: string
  ) => {
    let updated: string[];

    if (favorites.includes(id)) {
      updated = favorites.filter(
        (item) => item !== id
      );
    } else {
      updated = [...favorites, id];
    }

    setFavorites(updated);
    await saveFavorites(updated);
  };

  const loadMenu = async () => {
    try {
      const response = await fetch(
        'https://api.sampleapis.com/coffee/hot'
      );

      const data = await response.json();

      const menu = [
        {
          id: '1',
          name: 'Latte',
          price: '₱150',
          description:
            'Smooth espresso with steamed milk.',
        },
        {
          id: '2',
          name: 'Caramel Latte',
          price: '₱170',
          description:
            'Espresso mixed with steamed milk and caramel.',
        },
        {
          id: '3',
          name: 'Cappuccino',
          price: '₱160',
          description:
            'Espresso with foamed milk.',
        },
        {
          id: '4',
          name: 'Americano',
          price: '₱130',
          description:
            'Espresso with hot water.',
        },
        {
          id: '5',
          name: 'Espresso',
          price: '₱120',
          description:
            'Strong and concentrated coffee.',
        },
      ];

      setCoffeeItems(menu);
    } catch (error) {
      setError(
        'Unable to load menu. Check your internet connection.'
      );
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#24382B"
        />
        <Text style={styles.loading}>
          Loading menu...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            NOIR POST
          </Text>
          <Text style={styles.title}>
            CAFIESTA
          </Text>

          <Text style={styles.subtitle}>
            GOOD COFFEE. GOOD MOOD.
          </Text>
        </View>

        <FlatList
          data={coffeeItems}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                handlePress(item)
              }
            >
              <View style={styles.topRow}>
                <Text style={styles.name}>
                  {item.name}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    toggleFavorite(item.id)
                  }
                >
                  <Text
                    style={{
                      fontSize: 24,
                    }}
                  >
                    {favorites.includes(
                      item.id
                    )
                      ? '❤️'
                      : '🤍'}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text
                style={styles.description}
                numberOfLines={1}
              >
                {item.description}
              </Text>

              <View style={styles.divider} />

              <Text style={styles.price}>
                {item.price}
              </Text>
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
    padding: 20,
    backgroundColor: '#F7F0E4',
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#24382B',
    lineHeight: 40,
  },

  subtitle: {
    marginTop: 10,
    color: '#6C604D',
    letterSpacing: 2,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#FFF9ED',
    borderWidth: 1,
    borderColor: '#D8CDB8',
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 24,
    fontWeight: '900',
    color: '#24382B',
  },

  description: {
    color: '#7B6F5A',
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: '#D8CDB8',
    marginTop: 18,
    marginBottom: 14,
  },

  price: {
    fontSize: 20,
    fontWeight: '900',
    color: '#24382B',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F0E4',
  },

  loading: {
    marginTop: 10,
    color: '#24382B',
  },

  error: {
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});