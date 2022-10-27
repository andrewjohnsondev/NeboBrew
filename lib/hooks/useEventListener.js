import { useEffect, useRef } from 'react';

export default function useEventListener(eventType, callback, element) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e) => callbackRef.current(e);
    if (!element) {
      document.addEventListener(eventType, handler);
    } else {
      element.addEventListener(eventType, handler);
    }

    return () => {
      if (element) {
        element.removeEventListener(eventType, handler);
      } else {
        window.removeEventListener(eventType, handler);
      }
    };
  }, [eventType, element]);
}
