import React, { useState, useEffect } from "react";
import BaseNode from "./baseNode";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [inputValue, setInputValue] = useState("");
  const [displayText, setDisplayText] = useState(data?.text || "{{input}}");
  const [segments, setSegments] = useState([]);
  const updateNodeInternals = useUpdateNodeInternals();

  const parseText = (text) => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}}/g;
    const parts = [];
    let lastIndex = 0;
    let match;

  
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: text.slice(lastIndex, match.index),
        });
      }
      parts.push({ type: "variable", content: match[1], full: match[0] });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push({ type: "text", content: text.slice(lastIndex) });
    }

    return parts;
  };

  
  const handleChange = (e) => {
    const newText = e.target.value;
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}}/g;

    if (regex.test(newText)) {
      setDisplayText((prevText) => prevText + (prevText ? " " : "") + newText);
      setInputValue("");
    } else {
      setInputValue(newText);
    }
  };

  const handleRemoveVariable = (variable) => {
    setDisplayText((prevText) => {
      const regex = new RegExp(`{{\\s*${variable}\\s*}}`, "g");
      return prevText.replace(regex, "");
    });
  };

  useEffect(() => {
    const updatedSegments = parseText(displayText);
    setSegments(updatedSegments);
  }, [displayText]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [segments, id, updateNodeInternals]);

  return (
    <BaseNode title="Text" outputs={[{ id: `${id}-output` }]}>
      <div className="flex flex-col gap-2 p-2">
        <div className="relative min-h-[50px]">
          <div className="min-h-[50px] max-w-[300px] w-full gap-[5px] flex flex-wrap p-1 rounded">
            {segments.map((segment, index) => (
              segment.type === "variable" && (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-[#777777] h-[30px] rounded text-white font-semibold inline-flex items-center mx-0.5 relative"
                >
                  {`{${segment.content}}`}
                  <span
                    onClick={() => handleRemoveVariable(segment.content)}
                    className="absolute top-0 right-0 text-xs text-[#FF0072] cursor-pointer"
                    style={{ transform: "translate(4px, -7px)" }}
                  >
                   X
                  </span>
                </span>
              )
            ))}
          </div>
          <textarea
            value={inputValue}
            onChange={handleChange}
            className="w-full h-full p-2 mt-4 bg-[#444] outline-none text-white resize-none"
            style={{ minHeight: "30px" }}
            placeholder="Type text or variables e.g. {{variableName}}"
          />
        </div>
      </div>
      {segments
        .filter((segment) => segment.type === "variable")
        .map((variable, index, filteredSegments) => {
          const totalHandles = filteredSegments.length;
          const positionPercent = ((index + 1) / (totalHandles + 1)) * 100;

          return (
            <Handle
              key={index}
              type="target"
              position={Position.Left}
              id={`${id}-${variable.content}`}
              style={{
                top: `${positionPercent}%`,
                background: "#FF0072",
                borderRadius: "40px",
                border: "1px solid #3C3C3C",
                width: "10px",
                height: "10px",
                left: "-5px",
                transform: "translateY(-50%)",
              }}
            />
          );
        })}
    </BaseNode>
  );
};

export default TextNode;
