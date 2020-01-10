import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/project/store';
import { actions as settingActions } from '../modules/setting/store';

import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Form,
  Row,
  Typography,
  Collapse,
} from 'antd';
import HeaderTitle from '../components/Content/HeaderTitle';
import FormSettingProject from '../modules/setting/settingproject/SettingProject'

const { Panel } = Collapse;


const propTypes = {
  history: PropTypes.shape({}).isRequired
};

const defaultProps = {};
const SettingForm = ({ intl, form }) => {

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

  const createCustomField = useCallback(
    (body) => {
      dispatch(settingActions.createCustomField({ body, path: 'customFields' }));
    },
    [dispatch]
  );

  return (
    <Row>
      <Row>
        <HeaderTitle title={intl.formatMessage({ id: 'setting.header.title' })} />
      </Row>
      <Collapse accordion bordered={false}>
        <Panel
          header={
            <Row>
              <Typography.Text style={{ fontWeight: 'bold' }}>
                {<FormattedMessage id="setting.header.projectTitle" />}
              </Typography.Text>
            </Row>
          }
          key="1">
          <FormSettingProject form={form} intl={intl} createCustomField={createCustomField} />
        </Panel>
        <Panel
          header={
            <Typography.Text style={{ fontWeight: 'bold' }}>
              Setting 2
          </Typography.Text>
          }
          key="2">
          <p>2</p>
        </Panel>
        <Panel header={
          <Typography.Text style={{ fontWeight: 'bold' }}>
            Setting 3
          </Typography.Text>
        }
          key="3">
          <p>3</p>
        </Panel>
      </Collapse>
    </Row>
  );
};
const SettingPage = Form.create({ name: 'dynamic_form_item' })(SettingForm);

SettingPage.propTypes = propTypes;

SettingPage.defaultProps = defaultProps;

// export default SettingPage;
export default injectIntl(SettingPage, {});
