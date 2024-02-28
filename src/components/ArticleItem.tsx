import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import RenderHtml from 'react-native-render-html';
import ParentView from './ParentView';
import {
  CARD_HEIGHT,
  CARD_IMAGE_HEIGHT,
  SCREEN_WIDTH,
  htmlContent,
} from '../constants';
import {type Article} from '../models';

interface ArticleItemProps extends Article {
  index: number;
  currentIndex: SharedValue<number>;
}

function generateRandomIdx(range: number) {
  return Math.floor(Math.random() * range);
}

function ArticleItem({urlToImage, index, currentIndex}: ArticleItemProps) {
  const randomIndex = generateRandomIdx(2);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        currentIndex.value,
        [index - 1, index, index + 1],
        [0.4, 1, 0.4],
      ),
    };
  }, []);

  return (
    <Animated.View style={[styles.card, animatedStyles]}>
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
      <ParentView>
        <RenderHtml
          contentWidth={SCREEN_WIDTH * 0.7}
          source={htmlContent[randomIndex]}
        />
      </ParentView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    marginBottom: 20,
    backgroundColor: '#f8f9fc',
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
  },
});

export default ArticleItem;
