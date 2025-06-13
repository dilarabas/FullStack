import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotificationWithTimeout } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => {
    const filter = state.filter.toLowerCase();
    return state.anecdotes.filter(a => a.content.toLowerCase().includes(filter));
  });

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotificationWithTimeout(`You voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes} votes</div>
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;
