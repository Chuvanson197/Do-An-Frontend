import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Button } from 'antd';

import CustomerTable from './CustomerTable';
import CreateCustomerModal from './createModal/CreateCustomerModal';

const propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      address: PropTypes.string,
      project_name: PropTypes.string
    })
  ),

  deleteCustomer: PropTypes.func.isRequired,
  addNewCustomer: PropTypes.func.isRequired
};

const defaultProps = {
  customers: [
    {
      id: '1',
      name: 'Muji',
      address: '260 Tokyo',
      project_name: 'MUJI Admin'
    }
  ]
};

const Customers = ({ customers, deleteCustomer, addNewCustomer }) => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const onRowSelected = useCallback((rowKeys) => {
    setSelectedKeys(rowKeys);
  }, []);

  const onClickDetele = useCallback(() => {
    if (selectedKeys.length > 0) {
      deleteCustomer(selectedKeys);
    }
  }, [deleteCustomer, selectedKeys]);

  const onClickAddNewCustomer = () => {
    setIsVisibleModal(true);
  };

  const onClickCloseModal = useCallback(() => {
    setIsVisibleModal(false);
  }, []);

  const createCustomer = useCallback(
    (body) => {
      setIsVisibleModal(false);
      addNewCustomer(body);
    },
    [addNewCustomer]
  );

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 20 }}>
        <CustomerTable customers={customers} onRowSelected={onRowSelected} />
      </Row>
      <Row>
        <Col span={12}>
          <Button type="primary" onClick={() => onClickDetele()}>
            <FormattedMessage id="customers.customerTable.buttonDelete.title" />
          </Button>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <Button type="primary" onClick={() => onClickAddNewCustomer()}>
              <FormattedMessage id="customers.customerTable.buttonAdd.title" />
            </Button>
          </Row>
        </Col>
      </Row>
      {isVisibleModal && (
        <CreateCustomerModal
          createCustomer={createCustomer}
          onClickCloseModal={onClickCloseModal}
          isVisibleModal={isVisibleModal}
        />
      )}
    </React.Fragment>
  );
};

Customers.propTypes = propTypes;
Customers.defaultProps = defaultProps;

export default Customers;
