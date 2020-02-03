import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/project/store';
import { actions as settingActions } from '../modules/setting/store';

import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Form, Row, Button, Col, Input } from 'antd';
import { css } from 'emotion';

// import searchColumn from '../utils/searchColumn';
import HeaderTitle from '../components/Content/HeaderTitle';
import FormCreateCustomField from '../modules/setting/createCustomField/CreateCustomField';
import TableCustomFields from '../modules/setting/tableCustomFields/TableCustomFields';
import WithRole from '../hocs/WithRole';

const styles = {
  container: css`
    height: 100% !important;
  `,
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

const ButtonCreateCustomField = ({ handleCreateModal, intl }) => {
  return (
    <Button icon="project" className={styles.addCustomFieldButton} onClick={handleCreateModal}>
      {intl.formatMessage({ id: 'button.add' })}
    </Button>
  );
};

const SettingForm = ({ intl, form }) => {
  const { customfields } = useSelector((state) => state.setting);
  const customfieldsArr = customfields.listCustomField;
  // const [filteredData, setFilteredData] = useState(customfields.listCustomField);
  const [searchInput, setSearchInput] = useState('');
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  // get projects list
  useEffect(() => {
    dispatch(actions.selectItem(['setting']));
    dispatch(
      projectActions.getProjects({
        path: 'projects'
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      settingActions.getCustomFields({
        path: 'customFields'
      })
    );
  }, [dispatch]);

  const createCustomField = useCallback(
    (body) => {
      dispatch(settingActions.createCustomField({ body, path: 'customFields' }));
    },
    [dispatch]
  );

  const getCustomField = useCallback(() => {
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
      console.log(body);
      dispatch(settingActions.updateCustomField({ body, path: 'customFields', param: body.id }));
    },
    [dispatch]
  );

  const handleChange = (e) => {
    const currValue = e.target.value;
    setSearchInput(currValue);
    // const data = customfields.listCustomField.filter((value) => {
    //   return searchColumn(currValue, value.name);
    // });
    // setFilteredData(data);
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
          getCustomField={getCustomField}
        />
      )}

      <TableCustomFields
        customfields={customfieldsArr}
        removeCustomField={removeCustomField}
        getCustomField={getCustomField}
        updateCustomField={updateCustomField}
        createAssigneeProject={createAssigneeProject}
        removeAssigneeProject={removeAssigneeProject}
      />
    </Row>
  );
};
const SettingPage = Form.create({ name: 'dynamic_form_item' })(SettingForm);

SettingPage.propTypes = propTypes;

SettingPage.defaultProps = defaultProps;

export default injectIntl(SettingPage, {});
