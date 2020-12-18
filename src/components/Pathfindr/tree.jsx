/**
 * Renders full d3.js tree.
 *
 */
import React, {useEffect, useRef} from 'react';
import {hierarchy, tree, linkHorizontal, select, event} from 'd3';

let Tree;
export default Tree = ({data}) => {
    const treeRef = useRef();
    const containerRef = useRef();
    const margin = ({top: 10, right: 120, bottom: 10, left: 40})

    useEffect(() => {
        const root = hierarchy(data);
        const svg = select(treeRef.current);
        const {width, height} = containerRef.current.getBoundingClientRect();

        root.x0 = width / 6 / 2;
        root.y0 = 0;
        root.descendants().forEach((d, i) => {
            d.id = i;
            d._children = d.children;
            if (d.depth && d.data.name.length !== 7) d.children = null;
        });

        const treeContainer = tree().size([width / 6, height])
        const hLink = linkHorizontal().x(link => link.y).y(link => link.x);

        const gLink = svg.append("g")
            .attr("fill", "white");

        const gNode = svg.append("g")
            .attr("cursor", "pointer")
            .attr("pointer-events", "all");

        function update(source) {
            const duration = event && event.altKey ? 2500 : 250;
            const nodes = root.descendants().reverse();
            const links = root.links();

            // Compute the new tree layout.
            treeContainer(root);

            let left = root;
            let right = root;
            root.eachBefore(node => {
                if (node.x < left.x) left = node;
                if (node.x > right.x) right = node;
            });

            const height = right.x - left.x + margin.top + margin.bottom;

            const transition = svg.transition()
                .duration(duration)
                .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
                .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

            // Update the nodes…
            const node = gNode.selectAll("g")
                .data(nodes, d => d.id);

            // Enter any new nodes at the parent's previous position.
            const nodeEnter = node.enter().append("g")
                .attr("transform", d => `translate(${source.y0},${source.x0})`)
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0)
                .on("click", (event, d) => {
                    d.children = d.children ? null : d._children;
                    update(d);
                });

            nodeEnter.append("circle")
                .attr("r", 2.5)
                .attr("fill", d => d._children ? "#555" : "#999")
                .attr("stroke-width", 10);

            nodeEnter.append("text")
                .attr("dy", "0.31em")
                .attr("x", d => d._children ? -6 : 6)
                .attr("text-anchor", d => d._children ? "end" : "start")
                .attr("fill", "white")
                .text(d => d.data.name)
                .clone(true).lower()

            // Transition nodes to their new position.
            node.merge(nodeEnter).transition(transition)
                .attr("transform", d => `translate(${d.y},${d.x})`)
                .attr("fill-opacity", 1)
                .attr("stroke-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            node.exit().transition(transition).remove()
                .attr("transform", d => `translate(${source.y},${source.x})`)
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0);

            // Update the links…
            const link = gLink.selectAll("path")
                .data(links, d => d.target.id);

            // Enter any new links at the parent's previous position.
            const linkEnter = link.enter().append("path")
                .attr("d", d => {
                    const o = {x: source.x0, y: source.y0};
                    return hLink({source: o, target: o});
                });

            // Transition links to their new position.
            link.merge(linkEnter).transition(transition)
                .attr("d", hLink);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition(transition).remove()
                .attr("d", d => {
                    const o = {x: source.x, y: source.y};
                    return hLink({source: o, target: o});
                });

            // Stash the old positions for transition.
            root.eachBefore(d => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        update(root)
    }, [])

    return (
        <div ref={containerRef}>
            <svg ref={treeRef}/>
        </div>
    )
}