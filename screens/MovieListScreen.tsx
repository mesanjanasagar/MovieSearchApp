import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { Movie } from '../InnerApp';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

const MovieListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const MAX_MOVIES_DISPLAYED = 10; // Maximum number of movies to display

  const fetchMovies = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://search.imdbot.workers.dev/?q=${searchQuery}`
      );
      setMovies(response?.data?.description);
      setError('');
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
      setError('Error fetching movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies('');
  }, []);

  const searchMovies = () => {
    fetchMovies(searchText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search movies..."
        />
        <TouchableOpacity onPress={searchMovies}>
          <Icon name="search" size={24} color="black" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : movies && movies?.length ? (
        <FlatList
          data={movies.slice(0, MAX_MOVIES_DISPLAYED)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('MovieDetails', { movie: item })}>
              <View style={styles.movieItemBorder} >
                <View style={styles.movieItem}>
                <Image
                  source={{ uri: item['#IMG_POSTER'] }}
                  style={styles.posterImage}
                />
                </View>
                <Text style={styles.movieTitle}>{item['#TITLE']}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item['#IMDB_ID']}
        />
      ) : (
        <Text>No Movies Found</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    padding: 10,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    marginTop: 20,
    color: 'red',
  },
  movieItemBorder:{
    marginBottom: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },

  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
justifyContent:'center',
borderColor: '#fff',
  },
  posterImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieTitle: {
    fontWeight: 'bold',
  },
});

export default MovieListScreen;

