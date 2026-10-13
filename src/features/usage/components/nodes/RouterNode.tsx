import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import './RouterNode.scss';

interface RouterNodeData {
  label: string;
  count: number;
}

export const RouterNode = memo(({ data }: { data: RouterNodeData }) => {
  return (
    <div className="router-node">
      <Handle type="source" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Left} id="left" />
      
      <div className="router-node-content">
        <img 
          src="/favicon.svg" 
          alt={data.label}
          className="router-icon"
        />
        <span className="router-label">{data.label}</span>
        <span className="router-badge">{data.count}</span>
      </div>
    </div>
  );
});

RouterNode.displayName = 'RouterNode';
