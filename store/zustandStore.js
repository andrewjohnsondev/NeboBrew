import create from 'zustand';

const useZustandStore = create((set) => ({
  isCartOpen: false,
  toggleCartState: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  products: [],
  addProducts: (prod) => set((state) => ({ products: [...state.products, ...prod] })),

  isModalOpen: false,
  setModalOpen: (isOpen) => set((state) => ({ isModalOpen: isOpen })),

  quickShopProduct: {},
  setQuickShopProduct: (product) => set((state) => ({ quickShopProduct: product })),
}));

export default useZustandStore;
