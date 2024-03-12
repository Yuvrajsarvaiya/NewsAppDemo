import React from 'react';
import {
  ListRenderItemInfo,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ViewToken,
  useColorScheme,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import newsData from './data/news_data.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ArticleItem} from './components';
import {SCREEN_WIDTH} from './constants';
import {Article} from './models';

const VIEW_THRESHOLD = 80;

const articles = newsData.articles.filter(article =>
  Boolean(article.urlToImage),
);

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [resetScrollIndex, setResetScrollIndex] = React.useState(-1);

  function renderItem({item, index}: ListRenderItemInfo<Article>) {
    return (
      <ArticleItem resetScroll={resetScrollIndex === index} article={item} />
    );
  }

  function keyExtractor(item: Article, idx: number) {
    return idx.toString();
  }

  function onViewableItemsChanged(info: {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>;
  }) {
    const visibleItem = info.viewableItems[0];
    if (visibleItem && visibleItem.index !== null) {
      setResetScrollIndex(visibleItem.index);
    }
  }

  function getItemLayout(
    _data: ArrayLike<Article> | null | undefined,
    index: number,
  ) {
    return {index, length: SCREEN_WIDTH, offset: SCREEN_WIDTH * index};
  }

  return (
    <SafeAreaView style={[backgroundStyle, styles.flexGrow]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Animated.FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        decelerationRate={0.9}
        disableIntervalMomentum
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: VIEW_THRESHOLD}}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
      />
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
