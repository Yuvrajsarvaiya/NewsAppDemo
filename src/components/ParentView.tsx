import React from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MAX_HEIGHT_CONTENT} from '../constants';

interface ParentViewProps {
  children: React.ReactNode;
}

function ParentView({children}: ParentViewProps) {
  const [contentHeight, setContentHeight] = React.useState(0);
  const showReadMore = contentHeight > MAX_HEIGHT_CONTENT;

  function handleLayout(e: LayoutChangeEvent) {
    const height = e.nativeEvent.layout.height;
    setContentHeight(height);
  }

  return (
    <View style={styles.container}>
      <View style={styles.maxContainer}>
        <View style={styles.spacing} onLayout={handleLayout}>
          <View>{children}</View>
        </View>
      </View>
      {showReadMore ? (
        <TouchableOpacity activeOpacity={0.8} style={styles.readMoreBtn}>
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      ) : null}
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
    maxHeight: MAX_HEIGHT_CONTENT,
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
