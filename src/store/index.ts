import { createStore, Store } from 'vuex';

// Define a type for the state
export interface RootState {
  events: any[]; // Replace with actual type for events if known
}

// Initialize the Vuex store
const store: Store<RootState> = createStore({
  state: {
    events: [], // Initial state for events, an empty array
  },
  mutations: {
    updateEvents(state, events) {
      state.events = events;
    },
  },
  actions: {
    updateEvents({ commit }, events) {
      commit('updateEvents', events);
    },
  },
  modules: {
    // Add modules if needed
  },
});

export default store;
