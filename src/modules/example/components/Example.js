import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { css } from 'emotion';

const propTypes = {
  getRepos: PropTypes.func.isRequired,

  loading: PropTypes.bool,
  repos: PropTypes.arrayOf(PropTypes.shape({}))
};

const defaultProps = {
  repos: [],
  loading: false
};

const styles = {
  container: css`
    background-color: #dcdcdc;
  `
};

const Example = ({ repos, getRepos, loading }) => {
  const [username, setUsername] = useState('');

  const handleSearch = () => {
    getRepos && getRepos(username);
  };

  return (
    <div className={styles.container}>
      <Input
        placeholder="Input git username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onPressEnter={() => handleSearch()}
      />
      {loading && <div> Loading....</div>}
      <ul>
        {(repos || []).map((repo) => (
          <li>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
};

Example.propTypes = propTypes;

Example.defaultProps = defaultProps;

export default Example;
