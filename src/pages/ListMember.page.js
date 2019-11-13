import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'antd';
import { css } from 'emotion';
import { FormattedMessage, injectIntl } from 'react-intl';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as memberActions } from '../modules/member/store';
import HeaderTitle from '../components/Content/HeaderTitle';
import ErrorNotification from '../components/Notification/Error';
import Members from '../modules/member/listMember/components/Members';
import CreateMember from '../modules/member/createMember/components/CreateMember';

const propTypes = {
  history: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const styles = {
  addMemberButton: css`
    margin-left: 15px;
    background: #49a32b !important;
    color: #fff !important;
  `
};

const ListMemberPage = ({ history, intl }) => {
  const dispatch = useDispatch();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { list, getMembersError, getMembersErrors } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(layoutActions.selectItem(['member']));
  }, [dispatch]);

  useEffect(() => {
    dispatch(memberActions.getMembers({ path: 'members' }));
  }, [dispatch]);


  useEffect(() => {
    if (getMembersError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: getMembersErrors.message
          ? getMembersErrors.message
          : 'customers.getCustomer.message.error'
      });
      ErrorNotification(title, message);
      dispatch(memberActions.getMembersCleanError());
    }
  }, [dispatch, getMembersError, getMembersErrors, intl]);

  const removeMember = useCallback(
    (record) => {
      dispatch(memberActions.removeMember({ path: 'members/remove', param: record.staff_code }));
    },
    [dispatch]
  );

  const getMembers = useCallback(() => {
    dispatch(memberActions.getMembers({ path: 'members' }));
  }, [dispatch]);

  const createNewMember = useCallback(
    (body) => {
      dispatch(memberActions.createMember({ path: 'members', body }));
    },
    [dispatch]
  );

  const updateMember = useCallback(
    (body) => {
      dispatch(memberActions.updateMember({ body, path: 'members', param: body.staff_code }));
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <Row>
        <Col>
          <HeaderTitle title={<FormattedMessage id="members.header.title" />} />
        </Col>
      </Row>
      <Row style={{ marginBottom: 15 }}>
        <Button
          icon="user-add"
          className={styles.addMemberButton}
          onClick={() => setOpenCreateModal(!openCreateModal)}>
          <FormattedMessage id="members.memberTable.buttonAdd.title" />
        </Button>
      </Row>
      <Row gutter={16}>
        <Members
          members={list}
          getMembers={getMembers}
          updateMember={updateMember}
          removeMember={removeMember}
        />
      </Row>
      {openCreateModal && (
        <CreateMember
          createMember={createNewMember}
          getMembers={getMembers}
          visible={openCreateModal}
          close={() => setOpenCreateModal(!openCreateModal)}
        />
      )}
    </React.Fragment>
  );
};

ListMemberPage.propTypes = propTypes;

ListMemberPage.defaultProps = defaultProps;

export default injectIntl(ListMemberPage, {});
