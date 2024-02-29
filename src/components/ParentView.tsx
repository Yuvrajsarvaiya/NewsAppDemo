import React from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MAX_HEIGHT_CONTENT, SCREEN_HEIGHT} from '../constants';
import {ScrollView} from 'react-native-gesture-handler';

interface ParentViewProps {
  children: React.ReactNode;
  onScrollToEnd: () => void;
}

function ParentView({children, onScrollToEnd}: ParentViewProps) {
  const [contentHeight, setContentHeight] = React.useState(0);
  const showReadMore = contentHeight > SCREEN_HEIGHT;

  function handleLayout(e: LayoutChangeEvent) {
    const height = e.nativeEvent.layout.height;
    setContentHeight(height);
    console.log('H:', height);
  }

  // 4477.818359375

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const {contentOffset, layoutMeasurement} = e.nativeEvent;
    const isAtEnd =
      Math.ceil(contentOffset.y) + layoutMeasurement.height >= contentHeight;
    console.log(contentOffset.y, layoutMeasurement.height);
    if (isAtEnd && showReadMore) {
      console.log('isAtEnd');
      onScrollToEnd();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.maxContainer}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}>
          <View style={styles.spacing} onLayout={handleLayout}>
            <View>{children}</View>
          </View>
        </ScrollView>
      </View>
      {/* {showReadMore ? (
        <TouchableOpacity activeOpacity={0.8} style={styles.readMoreBtn}>
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    flex: 1,
  },
  maxContainer: {
    // maxHeight: MAX_HEIGHT_CONTENT,
    overflow: 'hidden',
  },
  readMoreBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c9c9f2',
    position: 'absolute',
    bottom: 0,
    height: 40,
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  readMoreText: {
    fontSize: 20,
    color: '#3a3ad3',
  },
  spacing: {
    paddingHorizontal: 10,
  },
});

export default ParentView;
