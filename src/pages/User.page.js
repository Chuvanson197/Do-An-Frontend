import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { css } from 'emotion';
import { Row } from 'antd';

import HeaderTitle from '../components/Content/HeaderTitle';
import UsersTable from '../modules/user/users/components/UsersTable';
import ErrorNotification from '../components/Notification/Error';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as memberActions } from '../modules/member/store';

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
  history: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const UsersPage = ({ history, intl }) => {
  const dispatch = useDispatch();

  // selector
  const { list, getMembersError, getMembersErrors } = useSelector((state) => state.members);

  // get users function
  useEffect(() => {
    dispatch(
      memberActions.getMembers({
        path: 'members'
      })
    );
  }, [dispatch]);

  const getMembers = useCallback(() => {
    dispatch(
      memberActions.getMembers({
        path: 'members'
      })
    );
  }, [dispatch]);

  const updateMember = useCallback(
    (body) => {
      dispatch(memberActions.updateMember({ body, path: 'members', param: body.staff_code }));
    },
    [dispatch]
  );

  // show notification if get users list failure
  useEffect(() => {
    if (getMembersError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: getMembersErrors.message ? getMembersErrors.message : 'users.getMembers.message.error'
      });
      ErrorNotification(title, message);
      dispatch(memberActions.getMembersCleanError());
    }
  }, [dispatch, getMembersError, getMembersErrors, intl]);

  useEffect(() => {
    dispatch(layoutActions.selectItem(['roles']));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Row className={styles.container}>
        <Row>
          <HeaderTitle title={intl.formatMessage({ id: 'users.header.title' })} />
        </Row>
        <Row>
          <UsersTable users={list} getMembers={getMembers} updateMember={updateMember} />
        </Row>
      </Row>
    </React.Fragment>
  );
};

UsersPage.propTypes = propTypes;

UsersPage.defaultProps = defaultProps;

export default injectIntl(UsersPage, {});
