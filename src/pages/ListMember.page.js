import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'antd';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as memberActions } from '../modules/member/listMember/store';

import Layout from '../modules/layout/components/Layout';
import HeaderTitle from '../components/Content/HeaderTitle';
import ListMember from '../modules/member/listMember/components/ListMember';
import { FormattedMessage } from 'react-intl';

const dummyData = [
  {
    key: '1',
    id: 'member_001',
    full_name: 'Chu Van Son',
    staff_code: 'impl_S01',
    phone_number: 123456798,
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
    phone_number: 123456798,
    status: 'stopped',
    email: 'son.chu@impl.com',
    time_in: 1568271275000,
    time_out: 1599893675000,
    effort: 1
  }
];

const ListMemberPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layoutActions.selectItem(['member']));
    dispatch(memberActions.getMemberList());
  }, [dispatch]);

  const deleteMember = useCallback(
    (selectedKeys) => {
      const body = {};
      dispatch(memberActions.deleteMembers(body));
    },
    [dispatch]
  );

  const addNewMember = useCallback(
    (body) => {
      dispatch(memberActions.addMember(body));
    },
    [dispatch]
  );

  return (
    <Layout>
      <React.Fragment>
        <Row type="flex" justify="space-between">
          <Col>
            <HeaderTitle title={<FormattedMessage id="members.header.title" />} />
          </Col>
        </Row>
        <Row gutter={16}>
          <ListMember members={dummyData} deleteMember={deleteMember} addNewMember={addNewMember} />
        </Row>
      </React.Fragment>
    </Layout>
  );
};

export default ListMemberPage;
