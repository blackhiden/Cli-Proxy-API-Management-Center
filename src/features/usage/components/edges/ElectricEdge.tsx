import { memo } from 'react';
import { BaseEdge, EdgeProps, getBezierPath } from 'reactflow';
import './ElectricEdge.scss';

export const ElectricEdge = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) => {
  const isActive = data?.isActive || false;

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  if (!isActive) {
    return (
      <g className="topology-edge inactive">
        <BaseEdge
          id={id}
          path={edgePath}
          style={{
            stroke: 'var(--color-border)',
            strokeWidth: 1,
            opacity: 0.3,
          }}
        />
      </g>
    );
  }

  // Active edge with electric effect
  const filterId = `topo-electric-${id}`;

  return (
    <g className="topology-edge electric">
      <defs>
        <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={2}
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.8;1.4;0.8"
              dur="0.25s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* Halo layer */}
      <path
        d={edgePath}
        fill="none"
        stroke="#22d3ee"
        strokeWidth={10}
        strokeOpacity={0.35}
        strokeLinecap="round"
        filter={`url(#${filterId})`}
        className="topology-edge-halo"
      />

      {/* Plasma layer */}
      <path
        d={edgePath}
        fill="none"
        stroke="#4ade80"
        strokeWidth={5}
        strokeOpacity={0.85}
        strokeLinecap="round"
        filter={`url(#${filterId})`}
        className="topology-edge-plasma"
      />

      {/* Core line */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: '#f8fafc',
          strokeWidth: 2.2,
          opacity: 1,
        }}
      />

      {/* Animated particles */}
      <circle r="4" fill="#fde047" opacity={0.95} style={{ filter: 'drop-shadow(0 0 4px #22d3ee)' }}>
        <animateMotion dur="0.4s" repeatCount="indefinite" path={edgePath} begin="0s" />
      </circle>
      <circle r="2.5" fill="#67e8f9" opacity={0.95} style={{ filter: 'drop-shadow(0 0 4px #22d3ee)' }}>
        <animateMotion dur="0.48s" repeatCount="indefinite" path={edgePath} begin="0.09s" />
      </circle>
      <circle r="4" fill="#fff" opacity={0.95} style={{ filter: 'drop-shadow(0 0 4px #22d3ee)' }}>
        <animateMotion dur="0.56s" repeatCount="indefinite" path={edgePath} begin="0.18s" />
      </circle>
      <circle r="2.5" fill="#fde047" opacity={0.95} style={{ filter: 'drop-shadow(0 0 4px #22d3ee)' }}>
        <animateMotion dur="0.64s" repeatCount="indefinite" path={edgePath} begin="0.27s" />
      </circle>
      <circle r="4" fill="#67e8f9" opacity={0.95} style={{ filter: 'drop-shadow(0 0 4px #22d3ee)' }}>
        <animateMotion dur="0.72s" repeatCount="indefinite" path={edgePath} begin="0.36s" />
      </circle>
      <circle r="2.5" fill="#fff" opacity={0.95} style={{ filter: 'drop-shadow(0 0 4px #22d3ee)' }}>
        <animateMotion dur="0.8s" repeatCount="indefinite" path={edgePath} begin="0.45s" />
      </circle>

      {/* Sparkle particles */}
      <circle r="1.8" fill="#e0f2fe" opacity={0}>
        <animate attributeName="opacity" values="0;1;0;0;1;0" dur="0.35s" begin="0s" repeatCount="indefinite" />
        <animateMotion dur="0.28s" repeatCount="indefinite" path={edgePath} begin="0s" />
      </circle>
      <circle r="1.8" fill="#e0f2fe" opacity={0}>
        <animate attributeName="opacity" values="0;1;0;0;1;0" dur="0.45s" begin="0.07s" repeatCount="indefinite" />
        <animateMotion dur="0.33s" repeatCount="indefinite" path={edgePath} begin="0.11s" />
      </circle>
      <circle r="1.8" fill="#e0f2fe" opacity={0}>
        <animate attributeName="opacity" values="0;1;0;0;1;0" dur="0.55s" begin="0.14s" repeatCount="indefinite" />
        <animateMotion dur="0.38s" repeatCount="indefinite" path={edgePath} begin="0.22s" />
      </circle>
      <circle r="1.8" fill="#e0f2fe" opacity={0}>
        <animate attributeName="opacity" values="0;1;0;0;1;0" dur="0.35s" begin="0.21s" repeatCount="indefinite" />
        <animateMotion dur="0.43s" repeatCount="indefinite" path={edgePath} begin="0.33s" />
      </circle>
      <circle r="1.8" fill="#e0f2fe" opacity={0}>
        <animate attributeName="opacity" values="0;1;0;0;1;0" dur="0.45s" begin="0.28s" repeatCount="indefinite" />
        <animateMotion dur="0.48s" repeatCount="indefinite" path={edgePath} begin="0.44s" />
      </circle>
    </g>
  );
});

ElectricEdge.displayName = 'ElectricEdge';
