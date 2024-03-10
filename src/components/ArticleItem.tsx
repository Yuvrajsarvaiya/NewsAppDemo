import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import RenderHtml from 'react-native-render-html';
import {
  CARD_IMAGE_HEIGHT,
  CARD_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  htmlContent,
} from '../constants';
import {type Article} from '../models';
import {ScrollView} from 'react-native-gesture-handler';

interface ArticleItemProps extends Article {
  resetScroll: boolean;
}

function generateRandomIdx(range: number) {
  return Math.floor(Math.random() * range);
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT - 50,
  },
  card: {
    marginHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
    width: CARD_WIDTH,
    backgroundColor: '#f8f9fc',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'black',
  },
});

export default ArticleItem;
