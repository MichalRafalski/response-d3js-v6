// Import stylesheets
import "./style.css";

// Write Javascript code!
// const appDiv = document.getElementsByTagName("svg");
// appDiv.innerHTML = `<h1>JS Starter</h1>`;
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const DUMMY_DATA = [...Array(getRandomInt(4, 30)).keys()].map((_, index) => {
  return {
    id: `d${index}`,
    value: getRandomInt(0, 100),
    region: `Region_${index}`
  };
});

const container = d3.select("svg").classed("container", true);

const element = container.node();
const maxWidth = element.getBoundingClientRect().width;
const maxHeight = element.getBoundingClientRect().height;

const maxValue = Math.max.apply(
  Math,
  DUMMY_DATA.map(function(o) {
    return o.value;
  })
);

const xScale = d3
  .scaleBand()
  .domain(DUMMY_DATA.map(datPoint => datPoint.region))
  .rangeRound([0, maxWidth])
  .padding(0.1);

const yScale = d3
  .scaleLinear()
  .domain([0, maxValue * 1.1])
  .range([maxHeight, 0]);

const bar = container
  .selectAll(".bar")
  .data(DUMMY_DATA)
  .enter()
  .append("rect")
  .classed("bar", true)
  .attr("width", xScale.bandwidth())
  .attr("height", data => maxHeight - yScale(data.value))
  .attr("x", data => xScale(data.region))
  .attr("y", data => yScale(data.value));
