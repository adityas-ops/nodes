import React from "react";
import { Handle, Position } from "reactflow";

const BaseNode = ({ title, inputs = [], outputs = [], children, isText }) => {

  // console.log("outputs", outputs);
  // console.log("inputs", inputs);

  return (
    <div className="min-w-[300px] bg-[#1E1E1E] border-[1px] border-[#3C3C3C] py-3 rounded-md shadow-md">
      <div className="border-b-[1px] border-[#3C3C3C] pb-2 flex w-full justify-center">
        <span className="text-white font-semibold text-[18px]">{title}</span>
      </div>
      {children && <div className="flex flex-col px-4 py-3">{children}</div>}
      {
        !isText &&
        inputs.map((input, index) => {
          const totalHandles = inputs.length;
          const positionPercent = ((index + 1) / (totalHandles + 1)) * 100;
          return(
            <Handle
          key={index}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            top: `${positionPercent}%`,
            background: "#FF0072",
            borderRadius: "40px",
            border: "1px solid #3C3C3C",
            width: "10px",
            height: "10px",
            position: "absolute",
            left: "-5px",
            transform: "translateY(-50%)",
          }}
        />
          )
        }
 
      )}
      {
       
        !isText && outputs.map((output, index) => {
          const totalHandles = outputs.length;
          const positionPercent = ((index + 1) / (totalHandles + 1)) * 100;
          return (
            <Handle
          key={index}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            top: `${positionPercent}%`,
            background: "#FF0072",
            borderRadius: "40px",
            border: "1px solid #3C3C3C",
            width: "10px",
            height: "10px",
            position: "absolute",
            right: "-5px",
            transform: "translateY(-50%)",
          }}
        />
          )
        }
       
      )}
    </div>
  );
};

export default BaseNode;