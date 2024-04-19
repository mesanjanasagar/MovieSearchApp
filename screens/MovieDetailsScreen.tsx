
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Movie } from '../InnerApp';

const MovieDetailsScreen: React.FC<{ route: any }> = ({ route }) => {
  const { movie }: { movie: Movie } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Simulating loading completion after component mounts
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : (
        <>
          <Image source={{ uri: movie['#IMG_POSTER'] }} style={styles.posterImage} />
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{movie['#TITLE']}</Text>
            <Text style={styles.description}>{movie['#AKA']}</Text>
            <Text style={styles.text}>Actors: {movie['#ACTORS']}</Text>
            <Text style={styles.text}>Reviews: {movie['#RANK']}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginBottom: 20,
  },
  posterImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MovieDetailsScreen;
