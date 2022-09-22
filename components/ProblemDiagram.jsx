import { useEffect, useState } from "react";
import ReactFlow, { Controls } from "react-flow-renderer";
import PropTypes from "prop-types";

const ProblemDiagram = ({ nodes, edges }) => {
  const [flowInstance, setFlowInstance] = useState(null);

  const onLoad = (reactFlowInstance) => {
    console.log("flow loaded:", reactFlowInstance);
    setFlowInstance(reactFlowInstance);
    reactFlowInstance.fitView();
  };

  useEffect(() => {
    const resizer = () => flowInstance.fitView();
    if (flowInstance) resizer();

    window.addEventListener("resize", resizer);
    return () => window.removeEventListener("resize", resizer);
  }, [flowInstance, nodes, edges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      snapToGrid={true}
      snapGrid={[15, 15]}
      preventScrolling={true}
      onInit={onLoad}
    >
      <Controls showInteractive={false} />
    </ReactFlow>
  );
};

ProblemDiagram.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      data: PropTypes.objectOf(PropTypes.string).isRequired,
      position: PropTypes.objectOf(PropTypes.number).isRequired,
      targetPosition: PropTypes.string,
      sourcePosition: PropTypes.string,
      style: PropTypes.object,
    })
  ).isRequired,
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      target: PropTypes.string.isRequired,
      animated: PropTypes.bool,
    })
  ).isRequired,
};

export default ProblemDiagram;
