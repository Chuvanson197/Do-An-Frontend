import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { css } from 'emotion';
import { Row, Col, Input } from 'antd';

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

  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  // get users function
  useEffect(() => {
    dispatch(
      memberActions.getMembers({
        path: 'members'
      })
    );
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(list);
  }, [list]);

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

  const handleChange = (e) => {
    const currValue = e.target.value;
    setSearchInput(currValue);
    const data = list.filter((value) => {
      return (
        value.staff_code.toLowerCase().includes(currValue.toLowerCase()) ||
        value.full_name.toLowerCase().includes(currValue.toLowerCase()) ||
        value.email.toLowerCase().includes(currValue.toLowerCase())
      );
    });
    setFilteredData(data);
  };

  return (
    <React.Fragment>
      <Row className={styles.container}>
        <Row>
          <Col>
            <HeaderTitle title={intl.formatMessage({ id: 'users.header.title' })} />
          </Col>
          <Col span={10} offset={14}>
            <Input placeholder="Search" value={searchInput} onChange={handleChange} />
          </Col>
        </Row>
        <Row>
          <UsersTable users={filteredData} getMembers={getMembers} updateMember={updateMember} />
        </Row>
      </Row>
    </React.Fragment>
  );
};

UsersPage.propTypes = propTypes;

UsersPage.defaultProps = defaultProps;

export default injectIntl(UsersPage, {});
