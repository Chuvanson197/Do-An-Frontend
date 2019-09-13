import React from 'react';
import { useSelector, connect } from 'react-redux';
import { decrement, increment } from '../redux/reducers/Example';
import { Button } from 'antd';

const Example = (props) => {
  const count = useSelector((state) => state.example.count);
  const { decrement, increment } = props;

  return (
    <div>
      <h1>{count}</h1>
      <Button type="primary" onClick={() => increment()}>
        Increment
      </Button>
      <Button type="primary" onClick={() => decrement()}>
        Decrement
      </Button>
    </div>
  );
};

export default connect(
  null,
  { decrement, increment }
)(Example);
