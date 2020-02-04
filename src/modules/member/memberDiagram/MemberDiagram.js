import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Tooltip } from 'antd';
import '../../../assets/styles/diagrams/main.scss';
import createEngine, { DefaultNodeModel, DiagramModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

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
        }
      });
    console.log(listPo, listPm, listBrse, listComtor, listDev);
    if (listPo.length > 0) {
      var nodePoTitle = new DefaultNodeModel({
        name: 'PO',
        color: 'rgb(0,192,255)',
        locked: true
      });
      nodePoTitle.setPosition(150, 150);
      listPo.forEach((po, index) => {
        const node = new DefaultNodeModel({
          name: po['member_detail'].full_name,
          color: 'rgb(0,192,255)',
          id: `${po.id}`,
          role: 'po'
        });
        node.setPosition(150, 150 + (1 + index) * 70);
        model.addNode(node);
      });
    }
    if (listPm.length > 0) {
      var nodePmTitle = new DefaultNodeModel({
        name: 'PM',
        color: 'rgb(0,192,255)',
        locked: true
      });
      nodePmTitle.setPosition(350, 150);
      listPm.forEach((pm, index) => {
        const node = new DefaultNodeModel({
          name: pm['member_detail'].full_name,
          color: 'rgb(0,192,255)',
          id: `${pm.id}`,
          role: 'pm'
        });
        node.setPosition(350, 150 + (1 + index) * 70);
        model.addNode(node);
      });
    }
    if (listBrse.length > 0) {
      var nodeBrseTitle = new DefaultNodeModel({
        name: 'BRSE',
        color: 'rgb(0,192,255)',
        locked: true
      });
      nodeBrseTitle.setPosition(550, 150);
      listBrse.forEach((brse, index) => {
        const node = new DefaultNodeModel({
          name: brse['member_detail'].full_name,
          color: 'rgb(0,192,255)',
          id: `${brse.id}`,
          role: 'brse'
        });
        node.setPosition(550, 150 + (1 + index) * 70);
        model.addNode(node);
      });
    }
    if (listComtor.length > 0) {
      var nodeComtorTitle = new DefaultNodeModel({
        name: 'COMTOR',
        color: 'rgb(0,192,255)',
        locked: true
      });
      nodeComtorTitle.setPosition(750, 150);
      listComtor.forEach((comtor, index) => {
        const node = new DefaultNodeModel({
          name: comtor['member_detail'].full_name,
          color: 'rgb(0,192,255)',
          id: `${comtor.id}`,
          role: 'comtor'
        });
        node.setPosition(750, 150 + (1 + index) * 70);
        model.addNode(node);
      });
    }
    if (listDev.length > 0) {
      var nodeDevTitle = new DefaultNodeModel({
        name: 'DEV',
        color: 'rgb(0,192,255)',
        locked: true
      });
      nodeDevTitle.setPosition(950, 150);
      listDev.forEach((dev, index) => {
        const node = new DefaultNodeModel({
          name: dev['member_detail'].full_name,
          color: 'rgb(0,192,255)',
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
          const listPoLink = allNode.filter((node) => node.options.role === 'pm');
          listPoLink.forEach((pm) => {
            const portIn = pm.addInPort(`${node.options.name}`);
            const link = portOut.link(portIn);
            model.addAll(link);
          });
          break;
        }
        case 'pm': {
          const portOut = node.addOutPort(' ');
          const listPmLink = allNode.filter((node) => node.options.role === 'brse');
          listPmLink.forEach((brse) => {
            const portIn = brse.addInPort(`${node.options.name}`);
            const link = portOut.link(portIn);
            model.addAll(link);
          });
          break;
        }
        case 'brse': {
          const portOut = node.addOutPort(' ');
          const listBrseLink = allNode.filter((node) => node.options.role === 'comtor');
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
  }, [joinedMembers]);
  return (
    <Modal
      centered
      title={[
        <React.Fragment key="1">
          Project Member Diagram
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
          Close
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
