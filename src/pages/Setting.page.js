import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/project/store';
import { actions as settingActions } from '../modules/setting/store';

import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Row, Button, Col, Input } from 'antd';
import { css } from 'emotion';

import searchColumn from '../utils/searchColumn';
import HeaderTitle from '../components/Content/HeaderTitle';
import FormCreateCustomField from '../modules/setting/createCustomField/CreateCustomField';
import TableCustomFields from '../modules/setting/tableCustomFields/TableCustomFields';
import WithRole from '../hocs/WithRole';
import ErrorNotification from '../components/Notification/Error';

const styles = {
  addCustomFieldButton: css`
    background: #49a32b !important;
    color: #fff !important;
    margin-bottom: 10px;
  `
};

const propTypes = {
  history: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const ButtonCreateCustomField = ({ handleCreateModal }) => {
  return (
    <Button icon="project" className={styles.addCustomFieldButton} onClick={handleCreateModal}>
      <FormattedMessage id="button.add" />
    </Button>
  );
};

const SettingForm = ({ intl, form }) => {
  const { customfields, getCustomFieldsError, getCustomFieldsErrors } = useSelector(
    (state) => state.setting
  );
  const { listCustomField } = customfields;
  const [visible, setVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.selectItem(['setting']));
    setFilteredData(listCustomField);
  }, [dispatch, listCustomField]);

  useEffect(() => {
    dispatch(
      settingActions.getCustomFields({
        path: 'customFields'
      })
    );
  }, [dispatch]);

  // show notification if get customfields list failure
  useEffect(() => {
    if (getCustomFieldsError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: getCustomFieldsErrors.message
          ? getCustomFieldsErrors.message
          : 'projects.getProjects.message.error'
      });
      ErrorNotification(title, message);
      dispatch(settingActions.getCustomFieldsCleanError());
    }
  }, [dispatch, getCustomFieldsError, getCustomFieldsErrors, intl]);

  const getProjects = useCallback(() => {
    dispatch(
      projectActions.getProjects({
        path: 'projects'
      })
    );
  }, [dispatch]);

  const createCustomField = useCallback(
    (body) => {
      dispatch(settingActions.createCustomField({ body, path: 'customFields' }));
    },
    [dispatch]
  );

  const getCustomFields = useCallback(() => {
    dispatch(settingActions.getCustomFields({ path: 'customFields' }));
  }, [dispatch]);

  const removeCustomField = useCallback(
    (data) => {
      dispatch(settingActions.removeCustomField({ param: data.id, path: 'customFields' }));
    },
    [dispatch]
  );

  const createAssigneeProject = useCallback(
    (body) => {
      dispatch(
        settingActions.createAssigneeProject({
          body,
          path: `customFields/${body.idCustomField}/assigneeProject`
        })
      );
    },
    [dispatch]
  );

  const removeAssigneeProject = (body) => {
    dispatch(
      settingActions.removeAssigneeProject({
        body,
        path: `customFields/${body.idCustomField}/assigneeProject`
      })
    );
  };

  const updateCustomField = useCallback(
    (body) => {
      dispatch(settingActions.updateCustomField({ body, path: 'customFields', param: body.id }));
    },
    [dispatch]
  );

  const handleChange = (e) => {
    const currValue = e.target.value;
    setSearchInput(currValue);
    const data = customfields.listCustomField.filter((value) => {
      return searchColumn(currValue, value.name);
    });
    setFilteredData(data);
  };

  const handleCreateModal = () => {
    setVisible(!visible);
  };

  return (
    <Row>
      <Row>
        <HeaderTitle title={intl.formatMessage({ id: 'setting.header.title' })} />
      </Row>

      <Row>
        <Col>
          <WithRole
            type={['admin']}
            component={ButtonCreateCustomField}
            handleCreateModal={handleCreateModal}
            intl={intl}
          />
        </Col>
        <Col span={10} offset={14}>
          <Input placeholder="Search" value={searchInput} onChange={handleChange} />
        </Col>
      </Row>
      {visible && (
        <FormCreateCustomField
          visible={visible}
          close={() => setVisible(!visible)}
          form={form}
          intl={intl}
          createCustomField={createCustomField}
          getCustomFields={getCustomFields}
          getProjects={getProjects}
        />
      )}
      <TableCustomFields
        customfields={filteredData}
        removeCustomField={removeCustomField}
        getCustomFields={getCustomFields}
        updateCustomField={updateCustomField}
        createAssigneeProject={createAssigneeProject}
        removeAssigneeProject={removeAssigneeProject}
        getProjects={getProjects}
      />
    </Row>
  );
};
const SettingPage = Form.create({ name: 'dynamic_form_item' })(SettingForm);

SettingPage.propTypes = propTypes;

SettingPage.defaultProps = defaultProps;

export default injectIntl(SettingPage, {});
