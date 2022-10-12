import create from 'zustand';

const useZustandStore = create((set) => ({
  isCartOpen: false,
  orders: [],

  toggleCartState: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));

export default useZustandStore;
