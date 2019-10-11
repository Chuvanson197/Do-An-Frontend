import React from 'react';
import PropTypes from 'prop-types';
import { history } from '../../../../store';
import moment from 'moment';
import { css } from 'emotion';

import { List, Skeleton, Typography, Row, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';

const propTypes = {
  listProject: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const styles = {
  title: css`
    font-size: 17px;
    font-weight: bold;
  `,
  listItem: css`
    cursor: pointer;
    &:hover {
      background-color: #f1f1f1;
    }
  `
};

const ListProject = ({ listProject }) => {
  const onSelectProject = (item) => {
    history.push(`/project/detail/${item.id}`);
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={listProject}
      renderItem={(item) => (
        <List.Item onClick={() => onSelectProject(item)} className={styles.listItem}>
          <Skeleton loading={false} active>
            <List.Item.Meta
              title={
                <Row style={{ marginLeft: 5 }} className={styles.title}>
                  {item.name}
                </Row>
              }
              description={
                <Row style={{ marginLeft: 5 }}>
                  <Typography.Paragraph style={{ margin: 0 }}>
                  <FormattedMessage id="projects.listProject.customer" />:&nbsp;{item.customer.name}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ margin: 0 }}>
                    <FormattedMessage id="projects.listProject.date" />
                    :&nbsp;
                    {moment(parseInt(item.start_time, 10)).format('DD/MM/YYYY')} -&nbsp;
                    {item.end_time
                      ? moment(parseInt(item.end_time, 10)).format('DD/MM/YYYY')
                      : null}
                  </Typography.Paragraph>
                </Row>
              }
            />
            <Row>
              {item.status === 'running' && <Tag color="#108ee9"><FormattedMessage id="projects.listProject.status.running" /></Tag>}
              {item.status === 'stopped' && <Tag color="#f5222D"><FormattedMessage id="projects.listProject.status.stopped" /></Tag>}
              {item.status === 'completed' && <Tag color="#87d068"><FormattedMessage id="projects.listProject.status.completed" /></Tag>}
            </Row>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

ListProject.propTypes = propTypes;

export default ListProject;
