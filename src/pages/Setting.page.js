import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/project/store';
import { actions as settingActions } from '../modules/setting/store';

import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Row, Button, Col, Input, Tabs } from 'antd';
import { css } from 'emotion';

import searchColumn from '../utils/searchColumn';
import HeaderTitle from '../components/Content/HeaderTitle';
import FormCreateCustomField from '../modules/setting/createCustomField/CreateCustomField';
import TableCustomFields from '../modules/setting/tableCustomFields/TableCustomFields';
import WithRole from '../hocs/WithRole';
import ErrorNotification from '../components/Notification/Error';

const { TabPane } = Tabs;

const styles = {
  addCustomFieldButton: css`
    background: #49a32b !important;
    color: #fff !important;
    margin-bottom: 10px;
  `,
  addGlobalCustomFieldButton: css`
    background: #1890ff !important;
    color: #fff !important;
    margin-bottom: 10px;
    margin-left: 10px
  `
};

const propTypes = {
  history: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const ButtonCreateCustomField = ({ handleCreateModal }) => {
  return (
    <Button icon="plus-square" className={styles.addCustomFieldButton} onClick={handleCreateModal}>
      <FormattedMessage id="setting.button.addCustomField" />
    </Button>
  );
};
const ButtonCreateGlobalCustomField = ({ handleCreateModal }) => {
  return (
    <Button icon="plus-circle" className={styles.addGlobalCustomFieldButton} onClick={handleCreateModal}>
      <FormattedMessage id="setting.button.addGlobalCustomField" />
    </Button>
  );
};

const SettingForm = ({ intl, form }) => {
  const { customfields, getCustomFieldsError, getCustomFieldsErrors } = useSelector(
    (state) => state.setting
  );
  const { user } = useSelector((state) => state.auth)
  const { listCustomField } = customfields;
  const [visibleCustomField, setVisibleCustomField] = useState(false);
  const [visibleGlobalCustomField, setVisibleGlobalCustomField] = useState(false);
  const [customField, setCustomField] = useState([]);
  const [globalCustomField, setGlobalCustomField] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.selectItem(['setting']));
    setCustomField(listCustomField && listCustomField.filter(obj => !obj.is_global));
    setGlobalCustomField(listCustomField && listCustomField.filter(obj => obj.is_global));
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
    user.type === "admin" ?
      dispatch(
        projectActions.getProjects({
          path: 'projects'
        })
      ) : dispatch(
        projectActions.getProjects({
          path: `projects/byUser/${user.staff_code}`
        })
      );
  }, [dispatch, user]);

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
    const data = listCustomField.filter(obj => obj.is_global).filter((value) => {
      return searchColumn(currValue, value.name);
    });
    setCustomField(data);
    const dataGlobal = listCustomField.filter(obj => obj.is_global).filter((value) => {
      return searchColumn(currValue, value.name);
    });
    setGlobalCustomField(dataGlobal);
  };
  //change list when onchange search
  const handleCreateModal = () => {
    setVisibleCustomField(!visibleCustomField);
  };

  const handleCreateModalGlobal = () => {
    setVisibleGlobalCustomField(!visibleGlobalCustomField)
  }

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
          <WithRole
            type={['admin']}
            component={ButtonCreateGlobalCustomField}
            handleCreateModal={handleCreateModalGlobal}
            intl={intl}
          />
        </Col>
        <Col span={10} offset={14}>
          <Input placeholder="Search" value={searchInput} onChange={handleChange} />
        </Col>
      </Row>
      {visibleCustomField && (
        <FormCreateCustomField
          global={false}
          visible={visibleCustomField}
          close={() => setVisibleCustomField(!visibleCustomField)}
          form={form}
          intl={intl}
          createCustomField={createCustomField}
          getCustomFields={getCustomFields}
          getProjects={getProjects}
        />
      )}
      {visibleGlobalCustomField && (
        <FormCreateCustomField
          global={true}
          visible={visibleGlobalCustomField}
          close={() => setVisibleGlobalCustomField(!visibleGlobalCustomField)}
          form={form}
          intl={intl}
          createCustomField={createCustomField}
          getCustomFields={getCustomFields}
          getProjects={getProjects}
        />
      )}

      <Tabs defaultActiveKey="1">
        <TabPane tab={intl.formatMessage({ id: 'setting.tabsLabel.customField' })} key="1">
          <TableCustomFields
            customfields={customField}
            removeCustomField={removeCustomField}
            getCustomFields={getCustomFields}
            updateCustomField={updateCustomField}
            createAssigneeProject={createAssigneeProject}
            removeAssigneeProject={removeAssigneeProject}
            getProjects={getProjects}
          />
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'setting.tabsLabel.globalCustomField' })} key="2">
          <TableCustomFields
            customfields={globalCustomField}
            removeCustomField={removeCustomField}
            getCustomFields={getCustomFields}
            updateCustomField={updateCustomField}
            createAssigneeProject={createAssigneeProject}
            removeAssigneeProject={removeAssigneeProject}
            getProjects={getProjects}
          />
        </TabPane>
      </Tabs>
    </Row>
  );
};
const SettingPage = Form.create({ name: 'dynamic_form_item' })(SettingForm);

SettingPage.propTypes = propTypes;

SettingPage.defaultProps = defaultProps;

export default injectIntl(SettingPage, {});
