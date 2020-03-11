import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Table, Tooltip, Popconfirm, Button, Tag } from 'antd';
import PropTypes from 'prop-types';


import { actions as settingActions } from '../store';
import SuccessNotification from '../../../components/Notification/Success';
import ErrorNotification from '../../../components/Notification/Error';
import WithRole from '../../../hocs/WithRole';
import UpdateCustomFieldDrawer from '../updateCustomField/UpdateCustomFieldDrawer';

const propTypes = {
  intl: PropTypes.shape({}).isRequired,

  updateCustomField: PropTypes.func.isRequired,
  removeCustomField: PropTypes.func.isRequired,
  getCustomFields: PropTypes.func.isRequired,
  removeAssigneeProject: PropTypes.func.isRequired,
  createAssigneeProject: PropTypes.func.isRequired
};


const defaultProps = {};
const ButtonEditCustomField = ({ handleEditSelected, record }) => {
  return (
    <Button
      onClick={() => {
        handleEditSelected(record);
      }}
      shape="circle"
      icon="edit"
      type="primary"
      style={{ margin: '0px 5px' }}
    />
  );
};

const ButtonDeleteCustomField = ({ removeCustomField, record }) => {
  return (
    <Popconfirm
      title={<FormattedMessage id="setting.deleteCustomField.confirm" />}
      onConfirm={() => removeCustomField && removeCustomField(record)}
      okText={<FormattedMessage id="button.confirm.yes" />}
      cancelText={<FormattedMessage id="button.confirm.no" />}>
      <Button shape="circle" icon="delete" type="danger" style={{ margin: '0px 5px' }} />
    </Popconfirm>
  );
};
const TableCustomFields = ({ intl,
  customfields,
  updateCustomField,
  removeCustomField,
  getCustomFields,
  removeAssigneeProject,
  createAssigneeProject,
  getProjects
}) => {
  const dispatch = useDispatch();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const { loading, removeCustomFieldError, removeCustomFieldErrors, removeCustomFieldResult } = useSelector(
    (state) => state.setting
  );

  const handleEditSelected = (data) => {
    data && setDataItem(data);
    setDrawerVisible(!drawerVisible);
  };
  const columns = [
    {
      title: <FormattedMessage id="setting.label.fieldName" />,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <FormattedMessage id="setting.label.fieldProjects" />,
      dataIndex: 'infocustomField',
      key: 'infocustomField',
      render: (infocustomField) => {
        return (
          <span>
            {infocustomField.map(i => (
              <Tag color="green" key={i.project.id}>
                {i.project.name}
              </Tag>
            ))}
          </span>
        )
      }
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      align: 'right',
      render: (record) => (
        <React.Fragment>
          <Tooltip
            placement="top"
            title={<FormattedMessage id="members.memberTable.buttonDelete.title" />}>
            <WithRole
              type={['admin']}
              component={ButtonDeleteCustomField}
              removeCustomField={removeCustomField}
              record={record}
            />
          </Tooltip>
          <Tooltip
            placement="top"
            title={<FormattedMessage id="members.memberTable.buttonEdit.title" />}>
            <WithRole
              type={['admin']}
              component={ButtonEditCustomField}
              handleEditSelected={handleEditSelected}
              record={record}
            />
          </Tooltip>
        </React.Fragment>
      )
    }
  ];

  useEffect(() => {
    if (removeCustomFieldResult) {
      // show success notification
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: 'removeCustomFieldResult.message' });
      SuccessNotification(title, message);
      // clean data
      dispatch(settingActions.removeCustomFieldCleanData());
      // re-call get Members list
      getCustomFields && getCustomFields();
    }
  }, [removeCustomFieldResult, intl, getCustomFields, dispatch]);

  useEffect(() => {
    if (removeCustomFieldError) {
      // show error notification
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: removeCustomFieldErrors.message
          ? removeCustomFieldErrors.message
          : 'members.removeCustomField.message.error'
      });
      ErrorNotification(title, message);
      // clean error
      dispatch(settingActions.removeCustomFieldCleanError(false));
    }
  }, [intl, removeCustomFieldError, removeCustomFieldErrors, dispatch]);



  return (
    <React.Fragment>
      <Table
        columns={columns}
        rowKey={(record, index) => index}
        dataSource={customfields}
        loading={loading}
      />
      {drawerVisible && (
        <UpdateCustomFieldDrawer
          visible={drawerVisible}
          updateCustomField={updateCustomField}
          onClose={() => handleEditSelected()}
          customfield={dataItem}
          removeAssigneeProject={removeAssigneeProject}
          createAssigneeProject={createAssigneeProject}
          getCustomFields={getCustomFields}
          getProjects={getProjects}
        />
      )}
    </React.Fragment>
  );
};

TableCustomFields.propTypes = propTypes;
TableCustomFields.defaultProps = defaultProps;

export default injectIntl(TableCustomFields, {});


