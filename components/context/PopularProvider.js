import { createContext, useContext, useState } from 'react';

const PopularContext = createContext();

export default function PopularProvider({ children }) {
  const [popular, setPopular] = useState();
  return <PopularContext.Provider value={{ popular, setPopular }}>{children}</PopularContext.Provider>;
}

export function usePopular() {
  const all = useContext(PopularContext);
  return all;
}
