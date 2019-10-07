import React, { useState, useCallback } from 'react';
import { Button, Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import MemberTable from './MemberTable';
// import CreateMemberModal from './createModal/CreateMemberModal';

const propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      staff_code: PropTypes.string,
      id: PropTypes.string,
      full_name: PropTypes.string,
      phone_number: PropTypes.string,
      email: PropTypes.string,
      time_in: PropTypes.number,
      time_out: PropTypes.number,
      status: PropTypes.string,
      effort: PropTypes.number
    })
  ),

  deleteMember: PropTypes.func.isRequired,
  addNewMember: PropTypes.func.isRequired
};

const defaultProps = {
  members: [
    {
      key: '1',
      id: 'member_001',
      full_name: 'Chu Van Son',
      staff_code: 'impl_S01',
      phone_number: 123456798,
      status: ['running'],
      email: 'son.chu@impl.com',
      time_in: 1568271275000,
      time_out: 1599893675000,
      effort: 1
    }
  ]
};

const ListMembers = ({ members, deleteMember, addNewMember }) => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const onRowSelected = useCallback((rowKeys) => {
    setSelectedKeys(rowKeys);
  }, []);
  const onClickDetele = useCallback(() => {
    if (selectedKeys.length > 0) {
      deleteMember(selectedKeys);
    }
  }, [deleteMember, selectedKeys]);

  const onClickAddNewMember = () => {
    setIsVisibleModal(true);
  };

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 20 }}>
        <MemberTable members={members} onRowSelected={onRowSelected} />
      </Row>
      <Row>
        <Col span={12}>
          <Button type="primary" onClick={() => onClickDetele()}>
            <FormattedMessage id="members.memberTable.buttonDelete.title" />
          </Button>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <Button type="primary" onClick={() => onClickAddNewMember()}>
              <FormattedMessage id="members.memberTable.buttonAdd.title" />
            </Button>
          </Row>
        </Col>
      </Row>
      {/* {isVisibleModal && (
        <CreateMemberModal
          createMember={createMember}
          onClickCloseModal={onClickCloseModal}
          isVisibleModal={isVisibleModal}
        />
      )} */}
    </React.Fragment>
  );
};

ListMembers.propTypes = propTypes;
ListMembers.defaultProps = defaultProps;

export default ListMembers;
