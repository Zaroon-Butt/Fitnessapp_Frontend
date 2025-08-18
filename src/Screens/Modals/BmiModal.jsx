import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

// Constants
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const ANIMATION_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};
const CLOSE_THRESHOLD = 100;
const BACKDROP_OPACITY = 0.5;

const useModalAnimation = (visible, onClose) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (!isClosing) {
      setIsClosing(true);
      onClose?.();
    }
  }, [isClosing, onClose]);

  useEffect(() => {
    if (visible) {
      setIsClosing(false);
      translateY.value = withSpring(0, ANIMATION_CONFIG);
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT, ANIMATION_CONFIG);
    }
  }, [visible, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return { translateY, animatedStyle, handleClose };
};

const usePanGesture = (translateY, onClose) => {
  const handleCloseJS = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd(event => {
      const shouldClose = event.translationY > CLOSE_THRESHOLD;

      if (shouldClose) {
        translateY.value = withSpring(SCREEN_HEIGHT, ANIMATION_CONFIG, () => {
          runOnJS(handleCloseJS)();
        });
      } else {
        translateY.value = withSpring(0, ANIMATION_CONFIG);
      }
    });

  return panGesture;
};

// Handle Component
const ModalHandle = () => <View style={styles.handle} />;

const ModalContent = ({
  title,
  subtitle,
  children,
}) => (
  <View style={styles.content}>
    <ModalHandle />
    {title && <Text style={styles.title}>{title}</Text>}
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    {children}
  </View>
);

const SimpleModal = ({
  visible = false,
  onClose,
  title = 'Simple Modal',
  subtitle = 'Slide down to close',
  children,
  showCloseButton = true,
  closeButtonText = 'Close',
  backdropOpacity = BACKDROP_OPACITY,
  enableBackdropClose = true,
  enableSwipeToClose = true,
  customStyles = {},
  bmi,
  bmiCategory,
}) => {
  const { translateY, animatedStyle, handleClose } = useModalAnimation(
    visible,
    onClose,
  );
  const panGesture = usePanGesture(translateY, handleClose);

  const handleBackdropPress = useCallback(() => {
    if (enableBackdropClose) {
      handleClose();
    }
  }, [enableBackdropClose, handleClose]);

  if (!visible) return null;

  // If bmi and bmiCategory are provided, show BMI result
  const showBmiResult = typeof bmi === 'number' && bmiCategory;

  const modalContent = (
    <Animated.View style={[styles.modal, customStyles.modal, animatedStyle]}>
      <ModalContent
        title={showBmiResult ? 'Your BMI Result' : title}
        subtitle={showBmiResult ? undefined : subtitle}
        showCloseButton={showCloseButton}
        closeButtonText={closeButtonText}
        onClose={handleClose}
      >
        {showBmiResult ? (
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: '#000',
                marginBottom: 8,
              }}
            >
              {bmi.toFixed(1)} kg/m²
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: bmiCategory.color,
                marginBottom: 8,
              }}
            >
              {bmiCategory.category}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#000',
                textAlign: 'center',
                marginTop: 6,
                lineHeight: 20,
              }}
            >
              A BMI of 18.5 - 24.9 indicates that you are at a healthy weight
              for your height. By maintaining a healthy weight, you lower your
              risk of developing serious health problems.
            </Text>
          </View>
        ) : (
          children
        )}
      </ModalContent>
    </Animated.View>
  );

  return (
    <View style={[styles.overlay, customStyles.overlay]}>
      <Pressable
        style={[
          styles.backdrop,
          { backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})` },
          customStyles.backdrop,
        ]}
        onPress={handleBackdropPress}
      />
      {enableSwipeToClose ? (
        <GestureDetector gesture={panGesture}>{modalContent}</GestureDetector>
      ) : (
        modalContent
      )}
    </View>
  );
};

// Enhanced Modal with more customization options
export const CustomModal = ({
  visible = false,
  onClose,
  height: modalHeight,
  backgroundColor = 'white',
  borderRadius = 20,
  padding = 24,
  children,
  ...props
}) => {
  const customStyles = {
    modal: {
      backgroundColor,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      padding,
      ...(modalHeight && { height: modalHeight }),
    },
  };

  return (
    <SimpleModal
      visible={visible}
      onClose={onClose}
      customStyles={customStyles}
      {...props}
    >
      {children}
    </SimpleModal>
  );
};

// Hook for modal state management
export const useModal = (initialVisible = false) => {
  const [visible, setVisible] = useState(initialVisible);

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);
  const toggleModal = useCallback(() => setVisible(prev => !prev), []);

  return {
    visible,
    showModal,
    hideModal,
    toggleModal,
  };
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  content: {
    padding: 24,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: -12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  
});

export default SimpleModal;
