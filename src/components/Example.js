import React from 'react';
import { useSelector, connect } from 'react-redux';
import { decrement, increment } from '../redux/reducers/Example';

const Example = (props) => {
  const count = useSelector((state) => state.example.count);
  const { decrement, increment } = props;

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
    </div>
  );
};

const mapDispatchToProps = {
  decrement,
  increment
};

export default connect(
  null,
  mapDispatchToProps
)(Example);
