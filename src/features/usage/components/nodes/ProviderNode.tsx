import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import './ProviderNode.scss';

interface ProviderNodeData {
  name: string;
  icon: string;
  color?: string;
  isActive?: boolean;
  requestCount?: number;
}

export const ProviderNode = memo(({ data }: { data: ProviderNodeData }) => {
  const isActive = data.isActive;
  
  return (
    <div 
      className={`provider-node ${isActive ? 'provider-node-active' : ''}`}
      style={{
        borderColor: isActive && data.color ? data.color : undefined,
        boxShadow: isActive && data.color ? `0 0 16px ${data.color}40` : undefined,
      }}
    >
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Right} id="right" />
      <Handle type="target" position={Position.Bottom} id="bottom" />
      <Handle type="target" position={Position.Left} id="left" />
      
      <div className="provider-node-content">
        <div 
          className="provider-icon-wrapper"
          style={{
            backgroundColor: data.color ? `${data.color}15` : undefined,
          }}
        >
          <img 
            src={data.icon}
            alt={data.name}
            className="provider-icon"
          />
        </div>
        <span 
          className="provider-label"
          style={{
            color: isActive && data.color ? data.color : undefined,
          }}
        >
          {data.name}
        </span>
        {isActive && (
          <span className="provider-pulse">
            <span 
              className="provider-pulse-ring"
              style={{ backgroundColor: data.color }}
            />
            <span 
              className="provider-pulse-dot"
              style={{ backgroundColor: data.color }}
            />
          </span>
        )}
      </div>
    </div>
  );
});

ProviderNode.displayName = 'ProviderNode';
