import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import {useMovieListing} from 'fetch-movies';

const MovieListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { searchText, setSearchText, searchMovies, loading, error, movies , maxMoviesDisplayed} =
    useMovieListing(fetch, React, );

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
          <Icon
            name="search"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : movies && movies?.length ? (
        <FlatList
          data={movies.slice(0, maxMoviesDisplayed)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MovieDetails", { movie: item })
              }
            >
              <View style={styles.movieItemBorder}>
                <View style={styles.movieItem}>
                  <Image
                    source={{ uri: item["#IMG_POSTER"] }}
                    style={styles.posterImage}
                  />
                </View>
                <Text style={styles.movieTitle}>{item["#TITLE"]}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item["#IMDB_ID"]}
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
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
    color: "red",
  },
  movieItemBorder: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },

  movieItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    justifyContent: "center",
    borderColor: "#fff",
  },
  posterImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieTitle: {
    fontWeight: "bold",
  },
});

export default MovieListScreen;
