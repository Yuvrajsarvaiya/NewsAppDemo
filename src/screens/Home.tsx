import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Linking,
  FlatList,
  type ListRenderItemInfo,
} from 'react-native';
import {formatDistance} from 'date-fns';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import type {Article} from '../models';

import newsData from '../data/news_data.json';

// const CARD_HEIGHT = 200;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [articles] = React.useState<Article[]>(newsData.articles);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function onArticleItemPressed(url: string) {
    try {
      if (!Linking.canOpenURL(url)) {
        console.log('unable to open link');
        return;
      }
      Linking.openURL(url);
    } catch (err) {
      console.error(err);
    }
  }

  function renderNewsArticleItem({
    item: {title, url, urlToImage, description, publishedAt},
  }: ListRenderItemInfo<Article>) {
    return (
      <View style={styles.cardContainer}>
        <Pressable
          onPress={() => onArticleItemPressed(url)}
          style={styles.card}
          android_ripple={{
            color: 'rgba(70, 70, 70, 0.1)',
            borderless: false,
          }}>
          <View style={styles.flexRow}>
            <View style={styles.imageContainer}>
              {urlToImage ? (
                <Image
                  style={styles.image}
                  height={120}
                  source={{uri: urlToImage}}
                />
              ) : (
                <PlaceHolder />
              )}
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title} numberOfLines={3}>
                {title}
              </Text>
              <Text style={styles.content} numberOfLines={4}>
                {description}
              </Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.dateText}>
              {formatDistance(new Date(publishedAt), new Date(), {
                addSuffix: true,
              })}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }

  function keyExtractor(item: Article, index: number) {
    return index.toString();
  }

  return (
    <SafeAreaView style={[backgroundStyle, styles.flexGrow]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        data={articles}
        renderItem={renderNewsArticleItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.container}
        // estimatedItemSize={CARD_HEIGHT}
      />
    </SafeAreaView>
  );
}

function PlaceHolder() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>No Image</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flexGrow: {flex: 1},
  container: {
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  flexRow: {
    flexDirection: 'row',
  },
  card: {
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 12,
    borderRadius: 12,
    backgroundColor: '#feffff',
    color: '#242425',
    height: 200,
  },
  imageContainer: {
    flex: 0.4,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 16.5,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#3f3f40',
  },
  content: {
    fontSize: 13,
    fontWeight: '400',
    color: '#767679',
    lineHeight: 18,
  },
  image: {
    objectFit: 'cover',
    borderRadius: 4,
  },
  cardContainer: {
    marginBottom: 20,
    overflow: 'hidden',
  },
  placeholder: {
    height: 120,
    borderRadius: 4,
    backgroundColor: '#e4e3e3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#929398',
  },
  cardFooter: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingHorizontal: 10,
  },
  dateText: {
    textAlign: 'right',
    marginTop: 10,
  },
});

export default App;
