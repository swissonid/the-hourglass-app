"use client";
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import colors from "tailwindcss/colors";

type Props = {
  data: number[];
  mandatoryHours?: number;
};

export const BarChart: React.FC<Props> = ({ data, mandatoryHours = 8.5 }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 20, right: 20, bottom: 50, left: 20 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = svgRef.current.clientHeight - margin.top - margin.bottom;
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const svg = d3.select(svgRef.current);
    const x = d3.scaleBand().range([0, width]).domain(weekDays).padding(0.2);

    const scaleLinear = d3.scaleLinear().range([height, 0]).domain([0, 14]);
    const hours = scaleLinear.ticks(12);
    scaleLinear.tickFormat();
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(scaleLinear);

    const mandatoryHoursLineColor = colors.slate[600]; //colors.green[500];
    const barColor = colors.green[500]; //colors.slate[600];

    svg
      .select(".x-axis")
      .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
      .call(xAxis as any);

    svg
      .select(".y-axis")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis as any);

    hours.forEach((tick, index) => {
      if (index === hours.length - 1) return;
      svg
        .select(".x-axis")
        .append("line")
        .attr("class", "grid-line")
        .attr("x1", 1)
        .attr("y1", scaleLinear(tick) * -1)
        .attr("x2", width)
        .attr("y2", scaleLinear(tick) * -1)
        .style("stroke", colors.slate[600])
        .style("stroke-width", "0.5px");
    });

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x(weekDays[i])! + margin.left)
      .attr("y", (d) => scaleLinear(d) - 1 + margin.top)
      .attr("rx", 2)
      .attr("fill", (d) => (d > mandatoryHours ? barColor : colors.slate[600]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - scaleLinear(d));

    svg
      .append("line")
      .attr("class", "green-line")
      .attr("x1", 1 + margin.left)
      .attr("y1", scaleLinear(mandatoryHours) + margin.top)
      .attr("x2", width)
      .attr("y2", scaleLinear(mandatoryHours) + margin.top)
      .attr("opacity", 0.5)
      .style("stroke", mandatoryHoursLineColor)
      .style("stroke-width", "1px");
  }, [data, mandatoryHours]);

  return (
    <svg ref={svgRef} width={600} height={400}>
      <g className="y-axis" />
      <g className="x-axis" />
    </svg>
  );
};
