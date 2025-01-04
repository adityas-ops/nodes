import React from 'react';
import BaseNode from './baseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM"
      inputs={[
        { id: `${id}-system` },
        { id: `${id}-prompt` },
      ]}
      outputs={[{ id: `${id}-response` }]}
    >
      <div className='flex items-center justify-center w-full text-white label-box'>
        <p className='text-white'>
          This is LLM node
        </p>
      </div>
    </BaseNode>
  );
};
