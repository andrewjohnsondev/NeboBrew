import create from 'zustand';

const useZustandStore = create((set) => ({
  isCartOpen: false,
  toggleCartState: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  closeCartState: () => set((state) => ({ isCartOpen: false })),

  products: [],
  addProducts: (prod) => set((state) => ({ products: [...state.products, ...prod] })),

  isModalOpen: false,
  setModalOpen: (isOpen) => set((state) => ({ isModalOpen: isOpen })),

  quickShopProduct: {},
  setQuickShopProduct: (product) => set((state) => ({ quickShopProduct: product })),

  isPromptOpen: false,
  setPromptOpen: (isOpen) => set((state) => ({ isPromptOpen: isOpen })),
  question: '',
  setQuestion: (value) => set((state) => ({ question: value })),
  answer: false,
  setAnswer: (value) => set((state) => ({ answer: value })),
}));

export default useZustandStore;
