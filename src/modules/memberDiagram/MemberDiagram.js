import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DiagramEngine, DiagramModel, DefaultNodeModel, DiagramWidget } from 'storm-react-diagrams';
import { Modal, Button, Tooltip } from 'antd';
import '../../assets/styles/diagrams/main.scss';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,

  listMember: PropTypes.arrayOf(PropTypes.shape({}))
};

const defaultProps = {
  listMember: [
    {
      name: 'Member 1',
      role: {
        name: 'PO',
        level: 1,
        notLinked: []
      }
    },
    {
      name: 'Member 2',
      role: {
        name: 'PM',
        level: 2,
        notLinked: []
      }
    },
    {
      name: 'Member 3',
      role: {
        name: 'BrSE',
        level: 3,
        notLinked: []
      }
    },
    {
      name: 'Member 4',
      role: {
        name: 'Comtor',
        level: 4,
        notLinked: []
      }
    },
    {
      name: 'Member 5',
      role: {
        name: 'QA Leader',
        level: 4,
        notLinked: []
      }
    },
    {
      name: 'Member 6',
      role: {
        name: 'Android Leader',
        level: 4,
        notLinked: []
      }
    },
    {
      name: 'Member 7',
      role: {
        name: 'IOS Leader',
        level: 4,
        notLinked: []
      }
    },
    {
      name: 'Member 8',
      role: {
        name: 'BE Leader',
        level: 4,
        notLinked: []
      }
    },
    {
      name: 'Member 9',
      role: {
        name: 'QAs',
        level: 5,
        notLinked: ['Android Leader', 'IOS Leader', 'BE Leader']
      }
    },
    {
      name: 'Member 10',
      role: {
        name: 'Android Devs',
        level: 5,
        notLinked: ['QA Leader', 'IOS Leader', 'BE Leader']
      }
    },
    {
      name: 'Member 11',
      role: {
        name: 'Android Devs',
        level: 5,
        notLinked: ['QA Leader', 'IOS Leader', 'BE Leader']
      }
    },
    {
      name: 'Member 12',
      role: {
        name: 'IOS Devs',
        level: 5,
        notLinked: ['QA Leader', 'Android Leader', 'BE Leader']
      }
    },
    {
      name: 'Member 13',
      role: {
        name: 'IOS Devs',
        level: 5,
        notLinked: ['QA Leader', 'Android Leader', 'BE Leader']
      }
    },
    {
      name: 'Member 14',
      role: {
        name: 'BE Devs',
        level: 5,
        notLinked: ['QA Leader', 'IOS Leader', 'Android Leader']
      }
    },
    {
      name: 'Member 15',
      role: {
        name: 'BE Devs',
        level: 5,
        notLinked: ['QA Leader', 'IOS Leader', 'Android Leader']
      }
    }
  ]
};

const MemberDiagram = ({ visible, close, listMember }) => {
  const [Engine, setEngine] = useState(null);
  useEffect(() => {
    const engine = new DiagramEngine();
    engine.installDefaultFactories();
    const model = new DiagramModel();
    const roles = [
      { name: ['PO'], level: 1 },
      { name: ['PM'], level: 2 },
      { name: ['BrSE'], level: 3 },
      {
        name: [
          'Comtor',
          'QA Leader',
          'Android Leader',
          'IOS Leader',
          'Android Leader',
          'BE Leader'
        ],
        level: 4
      },
      { name: ['QAs', 'Android Devs', 'IOS Devs', 'BE Devs'], level: 5 }
    ];

    const Arr = roles.map((role) => listMember.filter((e) => e.role.level === role.level));

    let nodeArr = [];
    Arr.forEach((e, index1) => {
      e.forEach((member, index2) => {
        const node = new DefaultNodeModel(member.role.name, 'rgb(0,192,255)');
        if (member.role.level === 5) {
          node.setPosition(280 * (index1 + 1), 100 * (index2 + 1));
        } else {
          node.setPosition(200 * (index1 + 1), 100 * (index2 + 1));
        }

        model.addAll(node);
        node.notLinked = member.role.notLinked;
        nodeArr.push(node);
      });
    });

    nodeArr = roles.map((role) => nodeArr.filter((e) => role.name.includes(e.name)));

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < nodeArr.length - 1; i++) {
      nodeArr[i].forEach((node1, index1) => {
        const portOut = node1.addInPort(' ');
        nodeArr[i + 1].forEach((node2, index2) => {
          if (!node2.notLinked.includes(node1.name)) {
            const portIn = node2.addInPort(' ');
            const link = portOut.link(portIn);
            model.addAll(link);
          }
        });
      });
    }

    model.setLocked(true);
    engine.setDiagramModel(model);
    setEngine(engine);
  }, [listMember]);
  return (
    <Modal
      centered
      title={[
        <React.Fragment key="1">
          Project Member Diagram
          <Tooltip placement="right" title="Zoom to fit">
            <Button
              style={{ marginLeft: 10 }}
              onClick={() => Engine.zoomToFit()}
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
      {Engine && (
        <div style={{ height: '70vh' }}>
          <DiagramWidget className="srd-demo-canvas" diagramEngine={Engine} />
        </div>
      )}
    </Modal>
  );
};

MemberDiagram.propTypes = propTypes;

MemberDiagram.defaultProps = defaultProps;

export default MemberDiagram;
