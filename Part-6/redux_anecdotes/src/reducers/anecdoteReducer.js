import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      const id = action.payload.id;
      const anecdote = state.find(a => a.id === id);
      if (anecdote) {
        anecdote.votes++;
      }
    },
  },
});

export const { setAnecdotes, addAnecdote, updateAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
