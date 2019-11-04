import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { css } from 'emotion';
import { Row } from 'antd';

import HeaderTitle from '../components/Content/HeaderTitle';
import Layout from '../modules/layout/components/Layout';
import UsersTable from '../modules/user/users/components/UsersTable';
import ErrorNotification from '../components/Notification/Error';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as userActions } from '../modules/user/store';

const styles = {
  container: css`
    height: 100% !important;
  `,
  addCustomerButton: css`
    background: #49a32b !important;
    color: #fff !important;
    margin-bottom: 10px;
  `
};

const propTypes = {
  history: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const UsersPage = React.memo(({ history, intl }) => {
  const dispatch = useDispatch();

  // selector
  const { authenticated } = useSelector((state) => state.authentication);
  const { list, getUsersError, getUsersErrors } = useSelector((state) => state.users);

  // get users function
  useEffect(() => {
    dispatch(
      userActions.getUsers({
        path: 'users'
      })
    );
  }, [dispatch]);

  // show notification if get users list failure
  useEffect(() => {
    if (getUsersError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: getUsersErrors.message
          ? getUsersErrors.message
          : 'users.getUsers.message.error'
      });
      ErrorNotification(title, message);
      dispatch(userActions.getUsersCleanError());
    }
  }, [dispatch, getUsersError, getUsersErrors, intl]);

  useEffect(() => {
    dispatch(layoutActions.selectItem(['user']));
  });
  // check authencation
  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated, history]);

  return (
    <Layout>
      <Row className={styles.container}>
        <Row>
          <HeaderTitle title={intl.formatMessage({ id: 'users.header.title' })} />
        </Row>
        <Row>
          <UsersTable users={list} />
        </Row>
      </Row>
    </Layout>
  );
});

UsersPage.propTypes = propTypes;

UsersPage.defaultProps = defaultProps;

export default injectIntl(UsersPage, {});
