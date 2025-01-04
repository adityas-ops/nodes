import React from "react";
import { useStore } from "./store";
import {url} from "./constant" 

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async () => {
    try {
      const transformedEdges = edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
      }));

      console.log("transformedEdges", transformedEdges);

      const payload = {
        nodes: nodes.map((node) => node.id), 
        edges: transformedEdges,
      };
      const response = await fetch(`${url}/pipelines/parse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data");
      }

      const data = await response.json();

      // console.log("API Response:------------------->", data);

      alert(`Nodes: ${data.num_nodes}, Edges: ${data.num_edges}, Is DAG: ${data.is_dag}`);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting the data.");
    }
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <button
        className="px-[20px] rounded-md font-semibold py-[8px] bg-white hover:scale-[1.05] duration-300 hover:bg-zinc-100"
        type="button" 
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};
