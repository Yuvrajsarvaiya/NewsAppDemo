import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ViewToken,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import newsData from './data/news_data.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ArticleItem} from './components';
import {SCREEN_WIDTH} from './constants';
import {Article} from './models';

const VIEW_THRESHOLD = 50;

const articles = newsData.articles
  .filter(article => Boolean(article.urlToImage))
  .slice(0, 10);

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [resetScroll, setResetScroll] = React.useState(-1);

  function renderItem({item, index}: ListRenderItemInfo<Article>) {
    return <ArticleItem resetScroll={resetScroll === index} {...item} />;
  }

  function keyExtractor(item: Article, idx: number) {
    return idx.toString();
  }

  function onViewableItemsChanged(info: {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>;
  }) {
    const visibleItem = info.viewableItems[0];
    console.log('----***----', info.viewableItems);
    if (visibleItem && visibleItem.index !== null) {
      setResetScroll(visibleItem.index);
    }
  }

  return (
    <SafeAreaView style={[backgroundStyle, styles.flexGrow]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        disableIntervalMomentum
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: VIEW_THRESHOLD}}
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
