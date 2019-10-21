import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as createMemberActions } from '../modules/member/createMember/store';
import { actions as editMemberActions } from '../modules/member/editMember/store';
import { actions as memberActions } from '../modules/member/listMember/store';

import Layout from '../modules/layout/components/Layout';
import HeaderTitle from '../components/Content/HeaderTitle';
import ErrorNotification from '../components/Notification/Error';

import Members from '../modules/member/listMember/components/Members';

const propTypes = {
  history: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const ListMemberPage = ({ history, intl }) => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authentication);
  const { members, getMembersError, responDel } = useSelector((state) => state.memberList);
  const { responCreate } = useSelector((state) => state.createMember);
  const { responEdit } = useSelector((state) => state.editMember);

  useEffect(() => {
    dispatch(layoutActions.selectItem(['member']));
  }, [dispatch]);

  useEffect(() => {
    dispatch(memberActions.getMemberList({ path: 'members' }));
  }, [dispatch, responEdit, responDel, responCreate]);

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
      dispatch(memberActions.cleanError(false));
    }
  }, [dispatch, getMembersError, intl]);

  const deleteMember = useCallback(
    (selectedKeys) => {
      const body = {};
      dispatch(memberActions.deleteMembers({ path: 'members', body }));
    },
    [dispatch]
  );

  const createNewMember = useCallback(
    (body) => {
      dispatch(createMemberActions.createMember({ path: 'members', body }));
    },
    [dispatch]
  );
  const editMember = useCallback(
    (body) => {
      dispatch(editMemberActions.editMember({ path: 'members', body }));
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
            editMember={editMember}
          />
        </Row>
      </React.Fragment>
    </Layout>
  );
};

ListMemberPage.propTypes = propTypes;

ListMemberPage.defaultProps = defaultProps;

export default injectIntl(ListMemberPage, {});
