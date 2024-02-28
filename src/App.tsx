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
  withSpring,
} from 'react-native-reanimated';
import {
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
  const beginY = useSharedValue(0);
  const index = useSharedValue(0);

  const dragGesture = Gesture.Pan()
    .onBegin(() => {})
    .onUpdate(e => {
      translateY.value = e.translationY + startY.value;
      beginY.value = e.translationY;
    })
    .onEnd(() => {
      const isSwipeDown = beginY.value < -80;
      const isSwipeUp = beginY.value > 70;

      if (isSwipeUp && index.value > 0) {
        index.value = withTiming(index.value - 1, {duration: 600});
        translateY.value = withTiming(
          -SCREEN_HEIGHT * (index.value - 1),
          {duration: 600},
          () => {
            startY.value = translateY.value;
          },
        );
      }
      if (isSwipeDown && index.value < articles.length - 1) {
        index.value = withTiming(index.value + 1, {duration: 600});
        translateY.value = withTiming(
          -SCREEN_HEIGHT * (index.value + 1),
          {duration: 600},
          () => {
            startY.value = translateY.value;
          },
        );
      }
      if (!isSwipeDown && !isSwipeUp) {
        translateY.value = withSpring(translateY.value - beginY.value, {
          duration: 100,
        });
      }
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  }, []);

  return (
    <SafeAreaView style={[backgroundStyle, styles.flexGrow]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <GestureDetector gesture={dragGesture}>
        <Animated.View style={animatedStyles}>
          {articles.map((article, idx) => {
            return (
              <ArticleItem
                key={idx}
                index={idx}
                currentIndex={index}
                {...article}
              />
            );
          })}
        </Animated.View>
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
