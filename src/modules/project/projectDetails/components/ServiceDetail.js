import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Row, Typography, Button, Col, Divider, Input } from 'antd';

const propTypes = {
  serviceDetail: PropTypes.shape({}),

  updateServiceDetail: PropTypes.func.isRequired
};

const defaultProps = {
  serviceDetail: {}
};

const ServiceDetail = ({ serviceDetail, updateServiceDetail }) => {
  const [isAddOptions, setAddOptions] = useState(false);
  const [customOption, setCustomOption] = useState({
    custom_label: '',
    custom_description: ''
  });
  const [listOptions, setListOptions] = useState([]);

  if (!serviceDetail) return null;

  const setNewCustomOption = (data) => {
    if (!data.value) return;
    const newOption = { ...customOption };
    newOption[data.id] = data.value;
    setCustomOption({
      ...newOption
    });
  };

  // Will remove when have api
  const addNewCustomOptionInState = () => {
    if (!customOption.custom_label || !customOption.custom_description) return;
    const list = listOptions;
    list.push(customOption);
    setListOptions(list);
    setCustomOption({
      custom_label: '',
      custom_description: ''
    });
  };

  // Will use when have api
  // const addNewCustomOption = () => {
  //   updateServiceDetail(customOption);
  // };

  let customOptions = [];
  // if (serviceDetail && serviceDetail.custom_options) {
  //   customOptions = serviceDetail.custom_options.map((value) => {
  //     return (
  //       <Row style={{ marginBottom: 8 }}>
  //         <Col span={3}>{value.custom_label || ''}</Col>
  //         <Col span={20}>{value.custom_description || ''}</Col>
  //       </Row>
  //     );
  //   });
  // }
  customOptions = listOptions.map((value, index) => {
    return (
      <Row key={index} style={{ marginBottom: 10 }}>
        <Col span={3}>{value.custom_label || ''}</Col>
        <Col span={20}>{value.custom_description || ''}</Col>
      </Row>
    );
  });

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 15 }}>
        <Typography.Title level={4}>
          <FormattedMessage id="projectDetail.serviceDetail.title" />
        </Typography.Title>
        <Row style={{ marginBottom: 10 }}>
          <Col span={3}>
            <FormattedMessage id="projectDetail.serviceDetail.homePage.title" />
          </Col>
          <Col span={20}>{serviceDetail.home_page || ''}</Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={3}>
            <FormattedMessage id="projectDetail.serviceDetail.detail.title" />
          </Col>
          <Col span={20}>{serviceDetail.details || ''}</Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={3}>
            <FormattedMessage id="projectDetail.serviceDetail.folderLink.title" />
          </Col>
          <Col span={20}>{serviceDetail.folder_link || ''}</Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={3}>
            <FormattedMessage id="projectDetail.serviceDetail.adminPage.title" />
          </Col>
          <Col span={20}>{serviceDetail.admin_page || ''}</Col>
        </Row>
        {customOptions}
      </Row>
      {!isAddOptions && (
        <Row style={{ marginBottom: 50 }} type="flex" justify="end">
          <Button type="primary" onClick={() => setAddOptions(true)}>
            <FormattedMessage id="projectDetail.serviceDetail.buttonAddMore.title" />
          </Button>
        </Row>
      )}
      {isAddOptions && (
        <React.Fragment>
          <Row style={{ marginBottom: 20 }}>
            <Col span={3} style={{ paddingRight: 10 }}>
              <Input
                id="custom_label"
                placeholder="label"
                onChange={(e) => setNewCustomOption(e.target)}
              />
            </Col>
            <Col span={20}>
              <Input
                id="custom_description"
                placeholder="description"
                onChange={(e) => setNewCustomOption(e.target)}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: 50 }} type="flex" justify="end">
            <Button
              type="primary"
              onClick={() => {
                addNewCustomOptionInState();
                setAddOptions(false);
              }}>
              <FormattedMessage id="projectDetail.serviceDetail.buttonAdd.title" />
            </Button>
            <Button style={{ marginLeft: 20 }} type="primary" onClick={() => setAddOptions(false)}>
              <FormattedMessage id="projectDetail.serviceDetail.buttonCancel.title" />
            </Button>
          </Row>
        </React.Fragment>
      )}
      <Divider />
    </React.Fragment>
  );
};

ServiceDetail.propTypes = propTypes;
ServiceDetail.defaultProps = defaultProps;

export default ServiceDetail;
