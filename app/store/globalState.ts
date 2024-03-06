import { create } from 'zustand';
import jsonData from '../data/words.json';

interface GlobalState {
  words: string[];
  target: string;
}

const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Define the initial state
const initialState: GlobalState = {
  words: shuffle(jsonData.words),
  target: jsonData.words[0],
};

// Define actions to update the state
const actions = (set: (fn: (state: GlobalState) => GlobalState) => void) => ({
  targetHit: () =>
    set((state) => ({
      ...state,
      target: state.words[1],
      words: state.words.slice(0),
    })),
  updateWords: (words: string[]) => set(() => ({ words })),
});

// Create a Zustand store
export const useGlobalState = create((set) => ({
  ...initialState,
  ...actions(set),
}));
