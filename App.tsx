import React, {Suspense} from 'react';
import InnerApp from './InnerApp';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <Suspense
          fallback={
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color="#0000ff"
            />
          }>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />

          <InnerApp />
        </Suspense>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginBottom: 20,
  },
});

export default App;
