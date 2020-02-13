import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Popconfirm, Button, Icon } from 'antd';
import { css } from 'emotion';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as customerActions } from '../modules/customer/store';
import HeaderTitle from '../components/Content/HeaderTitle';
import CustomerDetail from '../modules/customer/customerDetail/customerDetail';
import BackButton from '../components/Button/BackButton';
import ErrorNotification from '../components/Notification/Error';
import SuccessNotification from '../components/Notification/Success';
import WithRole from '../hocs/WithRole';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired
};

const styles = {
  footer: css`
    position: absolute !important;
    bottom: 0;
    left: 0;
    right: 0;
  `
};

const ButtonRemoveCustomer = ({ loading, match }) => {
  const dispatch = useDispatch();

  return (
    <Popconfirm
      title={<FormattedMessage id="projectDetail.removeProject.confirm.remove" />}
      onConfirm={
        () =>
          dispatch(
            customerActions.removeCustomer({
              path: 'customers/remove',
              param: match.params.id
            })
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
      okText={<FormattedMessage id="button.confirm.yes" />}
      cancelText={<FormattedMessage id="button.confirm.no" />}>
      <Button style={{ marginRight: 15 }} type="danger" disabled={loading}>
        <Icon type={loading ? 'loading' : 'delete'} />
        <FormattedMessage id="projectDetail.removeProject" />
      </Button>
    </Popconfirm>
  );
};

const CustomerDetailPage = ({ match, history, intl }) => {
  const dispatch = useDispatch();
  const { customer, projectsOfCustomer, loading, removeCustomerResult, removeCustomerError, removeCustomerErrors } = useSelector(
    (state) => state.customers
  );

  
  const cleanError = useCallback(() => {
    dispatch(customerActions.cleanError(false));
  }, [dispatch])

  useEffect(() => {
    dispatch(layoutActions.selectItem(['customers']));
  },[dispatch])

  const getCustomer = useCallback(()=>{
    dispatch(
      customerActions.getCustomer({
        param: match.params.id,
        path: 'customers'
      })
    );
  },[dispatch, match])

  useEffect(() => {
    // get project detail
    dispatch(
      customerActions.getCustomer({
        param: match.params.id,
        path: 'customers'
      })
    );
    // get joined projects
    dispatch(
      customerActions.getProjectsByCustomer({
        path: `customers/${match.params.id}/projects`
      })
    );
  }, [dispatch, match.params.id]);


    // Handle showing notification after remove customer
    useEffect(() => {
      // show success notification
      if (removeCustomerResult) {
        const title = intl.formatMessage({ id: 'notification.success' });
        const message = intl.formatMessage({ id: removeCustomerResult.message });
        SuccessNotification(title, message);
        // clean data
        dispatch(customerActions.removeCustomerCleanData(false));
        history.push('/customers');
      }
    }, [dispatch, intl, removeCustomerResult, history]);
  
    // Showing error if remove customer failure
    useEffect(() => {
      if (removeCustomerError) {
        const title = intl.formatMessage({ id: 'notification.error' });
        const message = intl.formatMessage({
          id: removeCustomerErrors.message
            ? removeCustomerErrors.message
            : 'customers.removeCustomer.message.error'
        });
        ErrorNotification(title, message);
        // clean error
        dispatch(customerActions.removeCustomerCleanError(false));
      }
    }, [dispatch, intl, removeCustomerError, removeCustomerErrors]);




  // redirect functions
  const onBack = () => {
    window.history.back()
  };

  return (
    <Row>
      <Row>
        <HeaderTitle title={<FormattedMessage id="customerDetail.title" />} />
      </Row>
      <Row>
        <CustomerDetail
        customer={customer}
        loading={loading}
        cleanError={cleanError}
        match={match}
        joinedProjects={projectsOfCustomer ? projectsOfCustomer.listProject : null}
        history={history}
        getCustomer={getCustomer}
        />
      </Row>
      <Row className={styles.footer}>
        <Col span={12}>
          <BackButton onBack={() => onBack()} />
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <WithRole
              type={['admin']}
              component={ButtonRemoveCustomer}
              match={match}
              loading={loading}
            />
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

CustomerDetailPage.propTypes = propTypes;

export default injectIntl(CustomerDetailPage, {});
