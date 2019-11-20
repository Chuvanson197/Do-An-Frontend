import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';
import { Layout, Icon, Row } from 'antd';
import LanguageSwitcher from '../../languageSwitcher/components/LanguagaSwitcher';
import { css } from 'emotion';

const styles = {
  header: css`
    align-items: center;
    display: flex;
    padding: 0px 24px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  `,
  trigger: css`
    color: #fff !important;
    font-size: 25px;
    &:hover {
      color: #1890ff !important;
    }
  `,
  leftContents: css`
    flex: 1;
  `,
  rightContents: css`
    flex: 1;
    justify-content: flex-end;
  `
};

const Header = () => {
  const dispatch = useDispatch();
  const layoutCheck = useSelector((state) => state.layout);
  const { isCollapsed } = useSelector((state) => state.layoutSlider);

  const toggle = () => {
    dispatch(actions.setCollapse(!isCollapsed));
  };

  return (
    <>
      {layoutCheck.isShow && (
        <Layout.Header className={styles.header}>
          <Row className={styles.leftContents}>
            <Icon
              className={styles.trigger}
              type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => toggle()}
            />
          </Row>
          <Row type="flex" className={styles.rightContents}>
            <LanguageSwitcher />
          </Row>
        </Layout.Header>
      )}
    </>
  );
};

export default Header;
