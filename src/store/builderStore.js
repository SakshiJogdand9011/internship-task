import { create } from 'zustand';

export const useBuilderStore = create((set) => ({
  elements: [],
  selectedElement: null,
  addElement: (element) =>
    set((state) => ({ elements: [...state.elements, element] })),
  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
      selectedElement: state.selectedElement?.id === id 
        ? { ...state.selectedElement, ...updates }
        : state.selectedElement,
    })),
  setSelectedElement: (element) => set({ selectedElement: element }),
  reorderElements: (elements) => set({ elements }),
  deleteElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElement: state.selectedElement?.id === id ? null : state.selectedElement,
    })),
}));