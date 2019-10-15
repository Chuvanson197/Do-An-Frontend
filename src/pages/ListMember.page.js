import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as memberActions } from '../modules/member/listMember/store';

import Layout from '../modules/layout/components/Layout';
import HeaderTitle from '../components/Content/HeaderTitle';

import Members from '../modules/member/listMember/components/Members';

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

const ListMemberPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layoutActions.selectItem(['member']));
    dispatch(memberActions.getMemberList({ path: 'members' }));
  }, [dispatch]);

  const deleteMember = useCallback(
    (selectedKeys) => {
      const body = {};
      dispatch(memberActions.deleteMembers({ path: 'members', body }));
    },
    [dispatch]
  );

  const addNewMember = useCallback(
    (body) => {
      dispatch(memberActions.addMember({ path: 'members', body }));
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
          <Members members={dummyData} deleteMember={deleteMember} addNewMember={addNewMember} />
        </Row>
      </React.Fragment>
    </Layout>
  );
};

export default ListMemberPage;
