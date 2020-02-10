import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Tooltip } from 'antd';
import createEngine, { DefaultNodeModel, DiagramModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { FormattedMessage } from 'react-intl';


const propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

const MemberDiagram = ({ visible, close, project, joinedMembers }) => {
  const engine = createEngine();
  const listPo = [];
  const listPm = [];
  const listBrse = [];
  const listComtor = [];
  const listDev = [];
  const model = new DiagramModel();

  const listAssigneeUnDefault = project && project.assigneeProject.filter(e => e.member_be_link_id !== "Default");
  const listAssignee = project && project.assigneeProject;

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
      key:'po'
    });
    nodePoTitle.setPosition(150, 150);
    listPo.forEach((po, index) => {
      const node = new DefaultNodeModel({
        name: po['member_detail'].full_name,
        color: '#A4CFBB',
        id: `${po['member_detail'].staff_code}`,
        role: 'po',
        width: 500,
        height: 200,
        key:`${po['member_detail'].staff_code}`
      });
      node.setPosition(150, 150 + (1 + index) * 70);
      model.addNode(node);
    });
  }
  if (listPm.length > 0) {
    var nodePmTitle = new DefaultNodeModel({
      name: <FormattedMessage id="projects.addMember.role.pm" />,
      color: '#0B3954',
      locked: true,
      key:"pm"
    });
    nodePmTitle.setPosition(350, 150);
    listPm.forEach((pm, index) => {
      const node = new DefaultNodeModel({
        name: pm['member_detail'].full_name,
        color: '#0B3954',
        id: `${pm['member_detail'].staff_code}`,
        role: 'pm',
        key:`${pm['member_detail'].staff_code}`
      });
      node.setPosition(350, 150 + (1 + index) * 70);
      model.addNode(node);
    });
  }
  if (listBrse.length > 0) {
    var nodeBrseTitle = new DefaultNodeModel({
      name: <FormattedMessage id="projects.addMember.role.brse" />,
      color: '#087E8B',
      locked: true,
      key:"brse"
    });
    nodeBrseTitle.setPosition(550, 150);
    listBrse.forEach((brse, index) => {
      const node = new DefaultNodeModel({
        name: brse['member_detail'].full_name,
        color: '#087E8B',
        id: `${brse['member_detail'].staff_code}`,
        role: 'brse',
        key:`${brse['member_detail'].staff_code}`
      });
      node.setPosition(550, 150 + (1 + index) * 70);
      model.addNode(node);
    });
  }
  if (listComtor.length > 0) {
    var nodeComtorTitle = new DefaultNodeModel({
      name: <FormattedMessage id="projects.addMember.role.comtor" />,
      color: '#FF5A5F',
      locked: true,
      key:"comtor"
    });
    nodeComtorTitle.setPosition(750, 150);
    listComtor.forEach((comtor, index) => {
      const node = new DefaultNodeModel({
        name: comtor['member_detail'].full_name,
        color: '#FF5A5F',
        id: `${comtor['member_detail'].staff_code}`,
        role: 'comtor',
        key:`${comtor['member_detail'].staff_code}`
      });
      node.setPosition(750, 150 + (1 + index) * 70);
      model.addNode(node);
    });
  }
  if (listDev.length > 0) {
    var nodeDevTitle = new DefaultNodeModel({
      name: <FormattedMessage id="projects.addMember.role.dev" />,
      color: '#C81D25',
      locked: true,
      key:"dev"
    });
    nodeDevTitle.setPosition(950, 150);
    listDev.forEach((dev, index) => {
      const node = new DefaultNodeModel({
        name: dev['member_detail'].full_name,
        color: '#C81D25',
        id: `${dev['member_detail'].staff_code}`,
        role: 'dev',
        key:`${dev['member_detail'].staff_code}`
      });
      node.setPosition(950, 150 + (1 + index) * 70);
      model.addNode(node);
    });
  }
  let allNode = model.getModels();
  allNode.forEach((node) => {
    const linkAssignee = listAssignee && listAssignee.filter(e => e.member_link_id === node.options.id);
    if(linkAssignee && linkAssignee.length > 0 && linkAssignee[0].member_be_link_id === "Default"){
    switch (node.options.role) {
      case 'po': {
        const portOut = node.addOutPort(' ');
        let listPoLink = [];
          if (allNode.includes((node) => node.options.role === 'pm')) {
            listPoLink = allNode.filter((node) => node.options.role === 'pm')
          } else if (allNode.includes((node) => node.options.role === 'brse')) {
            listPoLink = allNode.filter((node) => node.options.role === 'brse')
          } else if (allNode.includes((node) => node.options.role === 'comtor')) {
            listPoLink = allNode.filter((node) => node.options.role === 'comtor')
          } else if (allNode.includes((node) => node.options.role === 'dev')) {
            listPoLink = allNode.filter((node) => node.options.role === 'dev')
          }
          listPoLink.forEach((pm) => {
            const portIn = pm.addInPort(`${node.options.name}`);
            const linkPO = portOut.link(portIn);
            model.addLink(linkPO);
          });
        break;
      }
      case 'pm': {
        const portOut = node.addOutPort(' ');
        let listPmLink = [];
          if (allNode.includes((node) => node.options.role === 'brse')) {
            listPmLink = allNode.filter((node) => node.options.role === 'brse')
          } else if (allNode.includes((node) => node.options.role === 'comtor')) {
            listPmLink = allNode.filter((node) => node.options.role === 'comtor')
          } else if (allNode.includes((node) => node.options.role === 'dev')) {
            listPmLink = allNode.filter((node) => node.options.role === 'dev')
          }
          listPmLink.forEach((brse) => {
            const portIn = brse.addInPort(`${node.options.name}`);
            const linkPM = portOut.link(portIn);
            model.addLink(linkPM);
          });
        }
        break;
      case 'brse': {
        const portOut = node.addOutPort(' ');
        let listBrseLink = [];
          if (allNode.includes((node) => node.options.role === 'comtor')) {
            listBrseLink = (allNode.filter((node) => node.options.role === 'comtor'))
          } else if (allNode.includes((node) => node.options.role === 'dev')) {
            listBrseLink = (allNode.filter((node) => node.options.role === 'dev'))
          }
          listBrseLink.forEach((comtor) => {
            const portIn = comtor.addInPort(`${node.options.name}`);
            const linkBRSE = portOut.link(portIn);
            model.addLink(linkBRSE);
          });
        }
        break;
      case 'comtor': {
        const portOut = node.addOutPort(' ');
        let listComtorLink = [];
          listComtorLink = allNode.filter((node) => node.options.role === 'dev');
          listComtorLink.forEach((dev) => {
            const portIn = dev.addInPort(`${node.options.name}`);
            const linkComtor = portOut.link(portIn);
            model.addLink(linkComtor);
          });
        }
        break;
      case 'dev':
        break;
      default:
        break;
    }
  }

  });

  listAssigneeUnDefault && listAssigneeUnDefault.length > 0 && listAssigneeUnDefault.forEach((link) => {
    const nodeLink = allNode && allNode.filter(node => node.options.id === link.member_link_id);
    const nodeBeLink = allNode && allNode.filter(node => node.options.id === link.member_be_link_id);
    const portOut = nodeLink.length > 0 && nodeLink[0].addOutPort(' ');
    const portIn = nodeLink.length > 0 && nodeBeLink.length > 0 && nodeBeLink[0].addInPort(`${nodeLink[0].options.name}`)
    const linkNode = portOut && portOut.link(portIn);
    model.addAll(linkNode);
  })
  model.addAll(nodePoTitle, nodePmTitle, nodeBrseTitle, nodeComtorTitle, nodeDevTitle);
  engine.setModel(model);
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
      ]}
      >
      <div style={{ height: '70vh' }}>
        <CanvasWidget className="srd-demo-canvas" engine={engine}/>
      </div>
    </Modal>
  );
};

MemberDiagram.propTypes = propTypes;

export default MemberDiagram;
