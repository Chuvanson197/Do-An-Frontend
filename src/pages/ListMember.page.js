import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Input } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as memberActions } from '../modules/member/store';
import searchColumn from '../utils/searchColumn';
import HeaderTitle from '../components/Content/HeaderTitle';
import ErrorNotification from '../components/Notification/Error';
import Members from '../modules/member/listMember/components/Members';
import CreateMember from '../modules/member/createMember/components/CreateMember';

const propTypes = {
  history: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const ListMemberPage = ({ history, intl }) => {
  const dispatch = useDispatch();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const { list, getMembersError, getMembersErrors } = useSelector((state) => state.members);
  const [filteredData, setFilteredData] = useState([]);  

  useEffect(() => {
    dispatch(layoutActions.selectItem(['member']));
    setFilteredData(list);
  }, [dispatch, list]);

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

  const handleChange = (e) => {
    const currValue = e.target.value;
    setSearchInput(currValue);
    const data = list.filter((value) => {
      return (
        searchColumn(currValue, value.staff_code) ||
        searchColumn(currValue, value.full_name) ||
        searchColumn(currValue, value.email)
      );
    });
    setFilteredData(data);
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <HeaderTitle title={<FormattedMessage id="members.header.title" />} />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={10} offset={14}>
          <Input placeholder="Search" value={searchInput} onChange={handleChange} />
        </Col>
      </Row>
      <Row gutter={16} style={{ paddingTop: 20 }}>
        <Members
          members={filteredData}
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
