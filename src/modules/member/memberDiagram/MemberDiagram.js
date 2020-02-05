import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Tooltip } from 'antd';
import '../../../assets/styles/diagrams/main.scss';
import createEngine, { DefaultNodeModel, DiagramModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { FormattedMessage } from 'react-intl';


const propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

const MemberDiagram = ({ visible, close, joinedMembers }) => {
  const [engine, setEngine] = useState(createEngine());

  useEffect(() => {
    const listPo = [];
    const listPm = [];
    const listBrse = [];
    const listComtor = [];
    const listDev = [];
    const model = new DiagramModel();
    joinedMembers &&
      joinedMembers.list.forEach((member) => {
        switch (member.role) {
          case 'po':
            listPo.push(member);
            break;
          case 'pm':
            listPm.push(member);
            break;
          case 'brse':
            listBrse.push(member);
            break;
          case 'comtor':
            listComtor.push(member);
            break;
          case 'dev':
            listDev.push(member);
            break;
          default:
            break;
        }
      });
    if (listPo.length > 0) {
      var nodePoTitle = new DefaultNodeModel({
        name: <FormattedMessage id="projects.addMember.role.po" />,
        color: '#A4CFBB',
        locked: true,
      });
      nodePoTitle.setPosition(150, 150);
      listPo.forEach((po, index) => {
        const node = new DefaultNodeModel({
          name: po['member_detail'].full_name,
          color: '#A4CFBB',
          id: `${po.id}`,
          role: 'po',
          width:500,
          height:200
        });
        node.setPosition(150, 150 + (1 + index) * 70);
        model.addNode(node);
      });
    }
    if (listPm.length > 0) {
      var nodePmTitle = new DefaultNodeModel({
        name: <FormattedMessage id="projects.addMember.role.pm" />,
        color: '#0B3954',
        locked: true
      });
      nodePmTitle.setPosition(350, 150);
      listPm.forEach((pm, index) => {
        const node = new DefaultNodeModel({
          name: pm['member_detail'].full_name,
          color: '#0B3954',
          id: `${pm.id}`,
          role: 'pm'
        });
        node.setPosition(350, 150 + (1 + index) * 70);
        model.addNode(node);
      });
    }
    if (listBrse.length > 0) {
      var nodeBrseTitle = new DefaultNodeModel({
        name: <FormattedMessage id="projects.addMember.role.brse" />,
        color: '#087E8B',
        locked: true
      });
      nodeBrseTitle.setPosition(550, 150);
      listBrse.forEach((brse, index) => {
        const node = new DefaultNodeModel({
          name: brse['member_detail'].full_name,
          color: '#087E8B',
          id: `${brse.id}`,
          role: 'brse'
        });
        node.setPosition(550, 150 + (1 + index) * 70);
        model.addNode(node);
      });
    }
    if (listComtor.length > 0) {
      var nodeComtorTitle = new DefaultNodeModel({
        name: <FormattedMessage id="projects.addMember.role.comtor" />,
        color: '#FF5A5F',
        locked: true
      });
      nodeComtorTitle.setPosition(750, 150);
      listComtor.forEach((comtor, index) => {
        const node = new DefaultNodeModel({
          name: comtor['member_detail'].full_name,
          color: '#FF5A5F',
          id: `${comtor.id}`,
          role: 'comtor'
        });
        node.setPosition(750, 150 + (1 + index) * 70);
        model.addNode(node);
      });
    }
    if (listDev.length > 0) {
      var nodeDevTitle = new DefaultNodeModel({
        name: <FormattedMessage id="projects.addMember.role.dev" />,
        color: '#C81D25',
        locked: true
      });
      nodeDevTitle.setPosition(950, 150);
      listDev.forEach((dev, index) => {
        const node = new DefaultNodeModel({
          name: dev['member_detail'].full_name,
          color: '#C81D25',
          id: `${dev.id}`,
          role: 'dev'
        });
        node.setPosition(950, 150 + (1 + index) * 70);
        model.addNode(node);
      });
    }
    let allNode = model.getModels();
    allNode.forEach((node) => {
      switch (node.options.role) {
        case 'po': {
          const portOut = node.addOutPort(' ');
          let listPoLink = [];
          if (allNode.filter((node) => node.options.role === 'pm').length > 0) {
            listPoLink = allNode.filter((node) => node.options.role === 'pm')
          } else if (allNode.filter((node) => node.options.role === 'brse').length > 0) {
            listPoLink = allNode.filter((node) => node.options.role === 'brse')
          } else if (allNode.filter((node) => node.options.role === 'comtor').length > 0) {
            listPoLink = allNode.filter((node) => node.options.role === 'comtor')
          } else if (allNode.filter((node) => node.options.role === 'dev').length > 0) {
            listPoLink = allNode.filter((node) => node.options.role === 'dev')
          }
          listPoLink.forEach((pm) => {
            const portIn = pm.addInPort(`${node.options.name}`);
            const link = portOut.link(portIn);
            model.addAll(link);
          });
          break;
        }
        case 'pm': {
          const portOut = node.addOutPort(' ');
          let listPmLink = [];
          if (allNode.filter((node) => node.options.role === 'brse').length > 0) {
            listPmLink = allNode.filter((node) => node.options.role === 'brse')

          } else if (allNode.filter((node) => node.options.role === 'comtor').length > 0) {
            listPmLink = allNode.filter((node) => node.options.role === 'comtor')
          }
          else if (allNode.filter((node) => node.options.role === 'dev').length > 0) {
            listPmLink = allNode.filter((node) => node.options.role === 'dev')
          }
          listPmLink.forEach((brse) => {
            const portIn = brse.addInPort(`${node.options.name}`);
            const link = portOut.link(portIn);
            model.addAll(link);
          });
          break;
        }
        case 'brse': {
          const portOut = node.addOutPort(' ');
          let listBrseLink = [];
          if (allNode.filter((node) => node.options.role === 'comtor').length > 0) {
            listBrseLink = (allNode.filter((node) => node.options.role === 'comtor'))
          } else if (allNode.filter((node) => node.options.role === 'dev').length > 0) {
            listBrseLink = (allNode.filter((node) => node.options.role === 'dev'))
          }
          listBrseLink.forEach((comtor) => {
            const portIn = comtor.addInPort(`${node.options.name}`);
            const link = portOut.link(portIn);
            model.addAll(link);
          });
          break;
        }
        case 'comtor': {
          const portOut = node.addOutPort(' ');
          const listComtorLink = allNode.filter((node) => node.options.role === 'dev');
          listComtorLink.forEach((dev) => {
            const portIn = dev.addInPort(`${node.options.name}`);
            const link = portOut.link(portIn);
            model.addAll(link);
          });
          break;
        }
        case 'dev':
          break;
        default:
          break;
      }
    });
    model.addAll(nodePoTitle, nodePmTitle, nodeBrseTitle, nodeComtorTitle, nodeDevTitle);
    engine.setModel(model);
    setEngine(engine);
  }, [joinedMembers, engine]);
  return (
    <Modal
      centered
      title={[
        <React.Fragment key="1">
          <FormattedMessage id="projects.memberdiagram.title" />
          <Tooltip placement="right" title="Zoom to fit">
            <Button
              style={{ marginLeft: 10 }}
              onClick={() => engine.zoomToFit()}
              type="primary"
              shape="circle"
              icon="search"
            />
          </Tooltip>
        </React.Fragment>
      ]}
      cancelText="Close"
      visible={visible}
      width="85vw"
      onCancel={() => close()}
      footer={[
        <Button type="primary" key="close" onClick={() => close()}>
          <FormattedMessage id="button.close" />
        </Button>
      ]}>
      <div style={{ height: '70vh' }}>
        <CanvasWidget className="srd-demo-canvas" engine={engine} />
      </div>
    </Modal>
  );
};

MemberDiagram.propTypes = propTypes;

export default MemberDiagram;
