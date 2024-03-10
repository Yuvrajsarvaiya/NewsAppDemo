import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
  CARD_IMAGE_HEIGHT,
  CARD_WIDTH,
  SCREEN_WIDTH,
  htmlContent,
} from '../constants';
import {type Article} from '../models';
import {ScrollView} from 'react-native-gesture-handler';

interface ArticleItemProps extends Article {
  resetScroll: boolean;
}

function ArticleItem({urlToImage, resetScroll}: ArticleItemProps) {
  const randomIndex = 0;
  const scrollRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({x: 0, y: 0, animated: false});
    }
  }, [resetScroll]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollRef}
      style={styles.container}>
      <View style={[styles.card]}>
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
      </View>
    </ScrollView>
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

export default ArticleItem;
