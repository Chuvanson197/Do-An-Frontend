import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as createMemberActions } from '../modules/member/listMember/store';

import Layout from '../modules/layout/components/Layout';
import HeaderTitle from '../components/Content/HeaderTitle';
import ErrorNotification from '../components/Notification/Error';

import Members from '../modules/member/listMember/components/Members';

const propTypes = {
  history: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const dummyData = [
  {
    key: '1',
    id: 'member_001',
    full_name: 'Chu Van Son',
    staff_code: 'impl_S01',
    phone_number: '123456798',
    status: 'on-working',
    email: 'son.chu@impl.com',
    time_in: 1568271275000,
    time_out: 1599893675000,
    effort: 1
  },
  {
    key: '2',
    id: 'member_002',
    full_name: 'Chu Van Son',
    staff_code: 'impl_S01',
    phone_number: '123456798',
    status: 'stopped',
    email: 'son.chu@impl.com',
    time_in: 1568271275000,
    time_out: 1599893675000,
    effort: 1,
    abc: 1
  }
];

const ListMemberPage = ({ history, intl }) => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authentication);
  const { members, getMembersError } = useSelector((state) => state.memberList);

  useEffect(() => {
    dispatch(layoutActions.selectItem(['member']));
    dispatch(createMemberActions.getMemberList({ path: 'members' }));
  }, [dispatch]);

  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated, history]);

  useEffect(() => {
    if (getMembersError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({ id: 'projects.listProject.message.error' });
      ErrorNotification(title, message);
      dispatch(createMemberActions.cleanError(false));
    }
  }, [dispatch, getMembersError, intl]);

  const deleteMember = useCallback(
    (selectedKeys) => {
      const body = {};
      dispatch(createMemberActions.deleteMembers({ path: 'members', body }));
    },
    [dispatch]
  );

  const createNewMember = useCallback(
    (body) => {
      dispatch(createMemberActions.createMember({ path: 'members', body }));
    },
    [dispatch]
  );

  return (
    <Layout>
      <React.Fragment>
        <Row>
          <Col>
            <HeaderTitle title={<FormattedMessage id="members.header.title" />} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Members
           members={members}
           deleteMember={deleteMember}
           createNewMember={createNewMember}
          />
        </Row>
      </React.Fragment>
    </Layout>
  );
};

ListMemberPage.propTypes = propTypes;

ListMemberPage.defaultProps = defaultProps;

export default injectIntl(ListMemberPage, {});
