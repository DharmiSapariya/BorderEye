import { useEffect, useRef, useState } from 'react';
import { Animated, Text } from 'react-native';

/**
 * Tweens a numeric value's displayed text on change instead of snapping —
 * used for live sensor readings so updates read as motion, not a flicker.
 * Non-numeric values (null/undefined/strings like "Detected") render as-is,
 * unanimated. The first value a given instance sees is also shown
 * immediately, unanimated, so the UI doesn't visibly count up from 0 on
 * mount.
 */
export const AnimatedNumber = ({ value, decimals = 0, duration = 450, style, fallback = '--' }) => {
  const isNumeric = typeof value === 'number' && !Number.isNaN(value);
  const animated = useRef(new Animated.Value(isNumeric ? value : 0)).current;
  const hasMounted = useRef(false);
  const [display, setDisplay] = useState(isNumeric ? value.toFixed(decimals) : fallback);

  useEffect(() => {
    if (!isNumeric) {
      setDisplay(fallback);
      return;
    }
    if (!hasMounted.current) {
      hasMounted.current = true;
      animated.setValue(value);
      setDisplay(value.toFixed(decimals));
      return;
    }
    const listenerId = animated.addListener(({ value: v }) => setDisplay(v.toFixed(decimals)));
    Animated.timing(animated, { toValue: value, duration, useNativeDriver: false }).start();
    return () => animated.removeListener(listenerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals]);

  return <Text style={style}>{display}</Text>;
};
