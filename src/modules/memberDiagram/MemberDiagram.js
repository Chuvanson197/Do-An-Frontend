import React from 'react';
import PropTypes from 'prop-types';
import { DiagramEngine, DiagramModel, DefaultNodeModel, DiagramWidget } from 'storm-react-diagrams';
import { Modal, Button } from 'antd';
import '../../assets/styles/diagrams/main.scss';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

const defaultProps = {};

const MemberDiagram = ({ visible, close }) => {
  const engine = new DiagramEngine();
  const model = new DiagramModel();
  engine.installDefaultFactories();
  const node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
  const port1 = node1.addInPort('out');
  node1.setPosition(100, 100);
  const node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
  const port2 = node2.addInPort('int');
  node2.setPosition(300, 100);
  const link = port1.link(port2);
  model.addAll(node1, node2, link);

  model.setLocked(true);
  engine.setDiagramModel(model);

  return (
    <Modal
      centered
      title="Project Member Diagram"
      cancelText="Close"
      visible={visible}
      width="85vw"
      onCancel={() => close()}
      footer={[
        <Button type="primary" key="close" onClick={() => close()}>
          Close
        </Button>
      ]}>
      <div style={{ height: '75vh' }}>
        <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />
      </div>
    </Modal>
  );
};

MemberDiagram.propTypes = propTypes;

MemberDiagram.defaultProps = defaultProps;

export default MemberDiagram;
