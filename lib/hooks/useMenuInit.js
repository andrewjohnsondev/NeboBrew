import { useEffect, useState } from 'react';

function useMenuInit() {
  const [initMenu, setInitMenu] = useState(false);

  useEffect(() => {
    setInitMenu(true);
  }, [setInitMenu]);

  return [initMenu];
}
export default useMenuInit;
