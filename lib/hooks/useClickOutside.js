import { useEffect, useState } from 'react';
import useEventListener from './useEventListener';

export default function useClickOutside(ref, cb) {
  const [doc, setDoc] = useState(null);
  useEventListener(
    'click',
    (e) => {
      if (ref.current == null || ref.current.contains(e.target)) return;
      cb(e);
    },
    doc
  );

  useEffect(() => {
    setDoc(document);
  }, []);
}
