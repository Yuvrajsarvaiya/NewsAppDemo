import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import RenderHtml from 'react-native-render-html';
import {
  CARD_IMAGE_HEIGHT,
  CARD_WIDTH,
  SCREEN_WIDTH,
  htmlContent,
} from '../constants';
import {type Article} from '../models';

interface ArticleItemProps {
  article: Article;
  resetScroll: boolean;
}

function ArticleItem({article, resetScroll}: ArticleItemProps) {
  const scrollRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToIndex({index: 0});
    }
  }, [resetScroll]);

  function renderItem() {
    return <ArticleItemNews article={article} />;
  }

  function keyExtractor(_item: number, idx: number) {
    return idx.toString();
  }

  return (
    <View>
      <FlatList
        ref={scrollRef}
        keyExtractor={keyExtractor}
        data={[0]}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function ArticleItemNews({article: {urlToImage}}: {article: Article}) {
  const randomIndex = 0;
  return (
    <Animated.View style={[styles.card]}>
      <View>
        {urlToImage ? (
          <Image
            style={{height: CARD_IMAGE_HEIGHT}}
            source={{uri: urlToImage}}
          />
        ) : (
          <Text>No View</Text>
        )}
      </View>
      <RenderHtml
        contentWidth={SCREEN_WIDTH * 0.7}
        source={htmlContent[randomIndex]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  card: {
    marginHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
    width: CARD_WIDTH,
    backgroundColor: '#f8f9fc',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginVertical: 10,
  },
});

export default React.memo(ArticleItem);
