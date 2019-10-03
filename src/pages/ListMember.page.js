import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Tabs, Tag, Tooltip, Button } from 'antd';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as memberActions } from '../modules/listMember/store';

import Layout from '../modules/layout/components/Layout';
import HeaderTitle from '../components/Content/HeaderTitle';
import ListMember from '../modules/listMember/components/ListMember';

const ListMemberPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layoutActions.selectItem(['member']));
    dispatch(memberActions.getMemberList());
  }, [dispatch]);

  return (
    <Layout>
      <React.Fragment>
        <Row type="flex" justify="space-between">
          <Col>
            <HeaderTitle title="List of members" />
          </Col>
        </Row>
        <Row gutter={16}>
            <ListMember/>
        </Row>
      </React.Fragment>
    </Layout>
  );
};

export default ListMemberPage;
