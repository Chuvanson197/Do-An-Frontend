import React from 'react';
import PropTypes from 'prop-types';
import { List, Skeleton, Typography, Row, Tag } from 'antd';
import moment from 'moment';
import { css } from 'emotion';

import { history } from '../../../store';

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
                    customer: {item.customer}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ margin: 0 }}>
                    date:&nbsp;
                    {moment(item.start_time).format('DD/MM/YYYY')} -&nbsp;
                    {moment(item.end_time).format('DD/MM/YYYY')}
                  </Typography.Paragraph>
                </Row>
              }
            />
            <Row>
              {item.status === 'running' && <Tag color="#108ee9">Running</Tag>}
              {item.status === 'stopped' && <Tag color="#f5222D">Stopped</Tag>}
              {item.status === 'completed' && <Tag color="#87d068">Completed</Tag>}
            </Row>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

ListProject.propTypes = propTypes;

export default ListProject;
