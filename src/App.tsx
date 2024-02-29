import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import newsData from './data/news_data.json';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {ArticleItem} from './components';
import {OFFSET, SCREEN_HEIGHT} from './constants';

const articles = newsData.articles
  .filter(article => Boolean(article.urlToImage))
  .slice(0, 10);

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const translateY = useSharedValue(-OFFSET);
  const startY = useSharedValue(0);
  const index = useSharedValue(0);

  const flingGestureUP = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      if (index.value === articles.length - 1) {
        return;
      }
      translateY.value = withTiming(
        -SCREEN_HEIGHT * (index.value + 1),
        {duration: 600},
        () => {
          startY.value = translateY.value;
        },
      );
      index.value = index.value + 1;
    });

  const fligGestureDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      if (index.value === 0) {
        return;
      }
      translateY.value = withTiming(
        -SCREEN_HEIGHT * (index.value - 1),
        {duration: 600},
        () => {
          startY.value = translateY.value;
        },
      );
      index.value = index.value - 1;
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  }, []);

  function onScrollToEnd() {
    'worket';
    translateY.value = withTiming(
      -SCREEN_HEIGHT * (index.value + 1),
      {duration: 600},
      () => {
        startY.value = translateY.value;
      },
    );
    index.value = index.value + 1;
  }

  return (
    <SafeAreaView style={[backgroundStyle, styles.flexGrow]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <GestureDetector gesture={flingGestureUP}>
        <GestureDetector gesture={fligGestureDown}>
          <Animated.View style={animatedStyles}>
            {articles.map((article, idx) => {
              return (
                <ArticleItem
                  key={idx}
                  index={idx}
                  currentIndex={index}
                  translateY={translateY}
                  onScrollToEnd={onScrollToEnd}
                  {...article}
                />
              );
            })}
          </Animated.View>
        </GestureDetector>
      </GestureDetector>
    </SafeAreaView>
  );
}

function AppRoot() {
  return (
    <GestureHandlerRootView style={styles.flexGrow}>
      <App />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flexGrow: {
    flex: 1,
  },
});

export default AppRoot;
