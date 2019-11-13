import React from 'react';
import { Menu, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

function CustomMenu(props) {
  const { key, to, typeIcon, message, ...rest } = props;

  return (
    <Menu.Item key={key} {...rest}>
      <Link to={to}>
        <Icon type={typeIcon} />
        <FormattedMessage id={message} />
      </Link>
    </Menu.Item>
  );
}

export default CustomMenu;
