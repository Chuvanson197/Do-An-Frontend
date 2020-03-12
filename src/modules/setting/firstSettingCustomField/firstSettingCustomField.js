import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Table, Tooltip, Popconfirm, Button, Form, Input, Select, Row } from 'antd';
import PropTypes from 'prop-types';
import WithRole from '../../../hocs/WithRole';
import '../../../assets/styles/firstSettingGlobalCustomField/main.scss';
import { actions as settingActions } from '../store';
import ErrorNotification from '../../../components/Notification/Error';

const propTypes = {
    intl: PropTypes.shape({}).isRequired,
    createCustomField: PropTypes.func.isRequired
};

const defaultProps = {};

const ButtonDeleteCustomField = ({ record, handleDelete }) => {
    return (
        <Popconfirm
            title={<FormattedMessage id="setting.deleteCustomField.confirm" />}
            onConfirm={() => handleDelete(record)}
            okText={<FormattedMessage id="button.confirm.yes" />}
            cancelText={<FormattedMessage id="button.confirm.no" />}>
            <Button shape="circle" icon="delete" type="danger" style={{ margin: '0px 5px' }} />
        </Popconfirm>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    validateCell,
    ...restProps
}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        // get value type/baseCustomField
        dispatch(
            settingActions.getValueTypes({
                path: 'data/valueType'
            })
        );
        dispatch(
            settingActions.getBaseCustomFields({
                path: 'data/baseCustomField'
            })
        );
    }, [dispatch]);
    const { valueTypes } = useSelector(
        (state) => state.setting
    );
    const [validate, setValidate] = useState([
        {
            status: "",
            help: ""
        }
    ]);

    const handleChangeSelect = (e) => {
        record[dataIndex] = e;
        save()
    }
    //handle change input
    const handleChange = (e) => {
        if (!e.target.value) {
            setValidate({
                ...validate, status: "error", help: <FormattedMessage id={`setting.label.${dataIndex}.validate`} />
            })
            validateCell(record, dataIndex, true)
        }
        else {
            setValidate({ ...validate, status: "success", help: "" });
            validateCell(record, dataIndex, false)
        }
        record[dataIndex] = e.target.value
    }

    const save = e => {
        handleSave({ ...record });
    };

    let childNode = children;

    if (editable) {
        childNode = (
            <Form.Item
                style={{
                    margin: 0
                }}
                validateStatus={validate.status}
                help={validate.help}
            >
                {dataIndex === "valueType"
                    ? <Select style={{ width: "100%" }}
                        onChange={handleChangeSelect}
                        placeholder={<FormattedMessage id="setting.placeholder.valueType" />}
                        defaultValue={record[dataIndex]}
                    >
                        {valueTypes && valueTypes.map(e =>
                            <Select.Option style={{ textTransform: 'capitalize' }} key={e.id} value={e.value}>{e.value}</Select.Option>)}
                    </Select>
                    : <Input onChange={handleChange} defaultValue={record[dataIndex]} onPressEnter={save} onBlur={save} />}
            </Form.Item>
        )
    }
    return <td {...restProps}>{childNode}</td>;
};


const FirstSettingCustomField = ({ intl, createCustomField, getProjects }) => {
    const dispatch = useDispatch();
    const { baseCustomFields } = useSelector(
        (state) => state.setting
    );
    const [globalCustomFields, setGlobalCustomFields] = useState([]);
    const { list } = useSelector(
        (state) => state.projects
    );
    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState(1)
    const [validateError, setValidateError] = useState([])

    useEffect(() => {
        // get value type/baseCustomField
        dispatch(
            settingActions.getBaseCustomFields({
                path: 'data/baseCustomField'
            })
        );
    }, [dispatch]);

    // Get all projects after open modal
    useEffect(() => {
        getProjects && getProjects();
    }, [getProjects, dispatch]);
    const handleAdd = () => {
        setDataSource([...dataSource, {
            key: count,
            fieldName: "fieldName",
            valueType: "Text",
            defaultValue: "https://google.com"
        }])
        setCount(count + 1)
        setValidateError([...validateError, { key: count, fieldName: false, valueType: false, defaultValue: false, error: false }])
    }

    const handleSave = row => {
        const newData = dataSource;
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource([...newData]);
    };
    const handleChangeCustomField = (e) => {
        let listCustomField = baseCustomFields.filter(obj => e.includes(obj.id))
        setGlobalCustomFields(listCustomField)
    }
    const handleSubmit = () => {

        if (validateError.filter(obj => obj.error === true).length > 0) {
            // showing error form input notification
            const title = intl.formatMessage({ id: 'notification.error' });
            const message = intl.formatMessage({ id: 'notification.message.form.error' });
            ErrorNotification(title, message);

        }
        else {
            let global = [...globalCustomFields];
            let projects = list.map(obj => obj.id)
            dataSource.map(obj => {
                global.push({
                    id: globalCustomFields.length + obj.key * 1,
                    name: obj.fieldName,
                    require: true,
                    default_value: obj.defaultValue,
                    value_type: obj.valueType
                })
                return undefined
            })
            global.map(obj => {
                createCustomField && createCustomField({
                    name: obj.name,
                    assignee: projects,
                    valueType: obj.value_type,
                    defaultValue: obj.default_value,
                    require: obj.require,
                    is_global: true
                });

            })
            window.location.reload()
        }
    }
    const handleDelete = (record) => {
        setDataSource(dataSource.filter(item => item.key !== record.key))
        setValidateError(validateError.filter(obj => obj.key !== record.key))
    }
    //validate on cell
    const validateCell = (record, fieldName, boolean) => {
        for (let i = 0; i < validateError.length; i++) {
            if (validateError[i].key === record.key) {
                let cloneValidateCell = [...validateError];
                if (boolean) {
                    cloneValidateCell[i][`${fieldName}`] = true
                } else cloneValidateCell[i][`${fieldName}`] = false
                if (Object.values(cloneValidateCell[i]).slice(1, 4).includes(true)) cloneValidateCell[i].error = true
                else cloneValidateCell[i].error = false;
                setValidateError([...cloneValidateCell])
            }
        }
    }

    const columns = [
        {
            title: <FormattedMessage id="setting.label.fieldName" />,
            dataIndex: 'fieldName',
            key: 'fieldName',
            editable: true,
            width: '300px',
            onCell: record => ({
                record,
                title: <FormattedMessage id="setting.label.fieldName" />,
                dataIndex: 'fieldName',
                editable: true,
                handleSave: handleSave,
                validateCell: validateCell
            })
        },
        {
            title: <FormattedMessage id="setting.label.valueType" />,
            dataIndex: 'valueType',
            key: 'valueType',
            editable: true,
            width: '240px',
            onCell: record => ({
                record,
                title: <FormattedMessage id="setting.label.valueType" />,
                dataIndex: 'valueType',
                editable: true,
                handleSave: handleSave,
                validateCell: validateCell
            })
        },
        {
            title: <FormattedMessage id="setting.label.defaultValue" />,
            dataIndex: 'defaultValue',
            key: 'defaultValue',
            editable: true,
            onCell: record => ({
                record,
                title: <FormattedMessage id="setting.label.defaultValue" />,
                dataIndex: 'defaultValue',
                editable: true,
                handleSave: handleSave,
                validateCell: validateCell
            })
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            align: 'right',
            width: '180px',
            render: (record) => (
                <React.Fragment>
                    <Tooltip
                        placement="top"
                        title={<FormattedMessage id="members.memberTable.buttonDelete.title" />}>
                        <WithRole
                            type={['admin']}
                            component={ButtonDeleteCustomField}
                            record={record}
                            handleDelete={handleDelete}
                        />
                    </Tooltip>
                </React.Fragment>
            )
        }
    ];
    return (
        <React.Fragment>
            <Row justify="space-between" align="middle">
                <Button
                    onClick={handleAdd}
                    icon="plus"
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    {<FormattedMessage id="button.add" />}
                </Button>
                <Select
                    mode="multiple"
                    style={{ width: "500px", float: "right" }}
                    onChange={handleChangeCustomField}
                    placeholder={<FormattedMessage id="setting.placeholder.baseCustomFields" />}
                >
                    {baseCustomFields && baseCustomFields.map(e =>
                        <Select.Option style={{ textTransform: 'capitalize' }} key={e.id} value={e.id}>{e.name}</Select.Option>)}
                </Select>
            </Row>
            <Table
                columns={columns}
                rowClassName={() => "editable-row"}
                components={{ body: { cell: EditableCell } }}
                dataSource={dataSource}
                pagination={false}
            />
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" style={{ marginTop: "30px" }} onClick={handleSubmit}>
                    {<FormattedMessage id="setting.button.addCustomFields" />}
                </Button>
            </Row>
        </React.Fragment>
    )


}
FirstSettingCustomField.propTypes = propTypes;
FirstSettingCustomField.defaultProps = defaultProps;
export default injectIntl(FirstSettingCustomField, {});