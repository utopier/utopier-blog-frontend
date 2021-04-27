import { useEffect, useRef } from 'react';
// import * as d3 from 'd3';
import tip from 'd3-tip';
import Head from 'next/head';
import MAP_GEOJSON from '../../public/korea-map-json.json';

import styled from '@emotion/styled';

const TrendsWrapper = styled.div`
	display: flex;
	margin: 20px;
	justify-content: center;
	align-items: center;
	width: 90%;
	height: 90%;
	border: 1px solid #00818a;
	div {
		border: 1px solid #00818a;
		div {
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.left-section {
		width: 40%;
		height: 100%;
	}
	.right-section {
		width: 60%;
		height: 100%;
		.map-wrapper {
			height: 100%;	
		}
	}
	#tooltip {
		position: absolute;
		width: 100px;
		height: 100px:
		padding: 10px;
		backrgound-color: white;
	}
	#tooltip.hidden{
		display: none;
	}
	#tooltip p {
		margin: 0;
	}
	#pie-tooltip {
		position: absolute;
		border: 0;
	}
	#pie-tooltip.hidden-pie{
		display: none;
	}
`;

const htmlColor = {
	mouseOver: '#87E373',
	default: '#1EA51D',
	path: '#DEFACF',
};
const cssColor = {
	mouseOver: '#E373D0',
	default: '#A51DA5',
	path: '#FEF9FC',
};
const javascriptColor = {
	mouseOver: '#D1E8FD',
	default: '#0D6CE8',
	path: '#CDEBFD',
};
const reactColor = {
	mouseOver: '#FFF7CF',
	default: '#FFCD05',
	path: '#FFF9CD',
};

// Bar, Line, Pie, Area, Radial, Map
const Trends = () => {
	const barRef = useRef();
	const lineRef = useRef();
	const pieRef = useRef();
	const mapRef = useRef();

	useEffect(() => {
		createBarChart();
		createGraphChart();
		createMap();
		//createPieChart();
	});
	const createBarChart = () => {
		const width = 250;
		const height = 250;
		const svg = d3.select(barRef.current).attr('width', width).attr('height', height);
		const margin = { top: 10, right: 0, bottom: 20, left: 25 };
		const graphWidth = width - margin.left - margin.right;
		const graphHeight = height - margin.top - margin.bottom;
		const graph = svg
			.append('g')
			.attr('width', graphWidth)
			.attr('height', graphHeight)
			.attr('transform', `translate(${margin.left}, ${margin.top})`);
		const xAxisGroup = graph.append('g').attr('transform', `translate(0, ${graphHeight})`); // x축 아래로 translate
		const yAxisGroup = graph.append('g');
		d3.csv('/csv/multiTimeline.csv').then((data) => {
			const xValues = data.columns.slice(1);
			const yValues = [
				Math.round(d3.mean(data, (d) => d.Javascript)),
				Math.round(d3.mean(data, (d) => d.HTML)),
				Math.round(d3.mean(data, (d) => d.CSS)),
				Math.round(d3.mean(data, (d) => d.React)),
			];
			const RectValues = [
				{ name: 'Javascript', mean: 76 },
				{ name: 'HTML', mean: 78 },
				{ name: 'CSS', mean: 67 },
				{ name: 'React', mean: 46 },
			];
			const y = d3
				.scaleLinear() // 한계치 설정
				.domain([0, 100])
				.range([graphHeight, 0]);
			const x = d3
				.scaleBand()
				.domain(xValues.map((name) => name))
				.range([0, graphWidth])
				.paddingInner(0.2)
				.paddingOuter(0.2);

			graph
				.selectAll('rect')
				.data(RectValues)
				.enter()
				.append('rect')
				.attr('width', x.bandwidth)
				.attr('height', (d) => graphHeight - y(d.mean))
				.attr('fill', (d) => {
					if (d.name === 'HTML') {
						return htmlColor.default;
					} else if (d.name === 'CSS') {
						return cssColor.default;
					} else if (d.name === 'Javascript') {
						return javascriptColor.default;
					} else if (d.name === 'React') {
						return reactColor.default;
					}
				})
				.attr('x', (d) => x(d.name))
				.attr('y', (d) => y(d.mean))
				.on('mouseover', function (d) {
					d3.select(this).attr('fill', (d) => {
						if (d.name === 'HTML') {
							return htmlColor.mouseOver;
						} else if (d.name === 'CSS') {
							return cssColor.mouseOver;
						} else if (d.name === 'Javascript') {
							return javascriptColor.mouseOver;
						} else if (d.name === 'React') {
							return reactColor.mouseOver;
						}
					});

					//const xPosition = 170 + 25 + parseFloat(d3.select(this).attr('x'));
					//const yPosition = 95 + 20 + 10 + parseFloat(d3.select(this).attr('y'));

					const [xPosition, yPosition] = d3.mouse(this);
					console.log(xPosition, yPosition);
					d3.select('#tooltip')
						.style('left', xPosition + 250 + 'px')
						.style('top', yPosition + 90 + 'px')
						.select('#value')
						.text(d.name);
					d3.select('#tooltip').classed('hidden', false);
				})
				.on('mouseout', function (d) {
					d3.select(this).attr('fill', (d) => {
						if (d.name === 'HTML') {
							return htmlColor.default;
						} else if (d.name === 'CSS') {
							return cssColor.default;
						} else if (d.name === 'Javascript') {
							return javascriptColor.default;
						} else if (d.name === 'React') {
							return reactColor.default;
						}
					});
					d3.select('#tooltip').classed('hidden', true);
				});
			const xAxis = d3.axisBottom(x);
			const yAxis = d3.axisLeft(y).ticks(3);

			xAxisGroup.call(xAxis);
			yAxisGroup.call(yAxis);

			xAxisGroup
				.selectAll('text')
				.data(RectValues)
				.attr('transform', 'translate(10,0)')
				.attr('text-anchor', 'end')
				.attr('fill', (d) => {
					if (d.name === 'HTML') {
						return htmlColor.default;
					} else if (d.name === 'CSS') {
						return cssColor.default;
					} else if (d.name === 'Javascript') {
						return javascriptColor.default;
					} else if (d.name === 'React') {
						return reactColor.default;
					}
				});
		});
	};

	const createGraphChart = () => {
		const width = 250;
		const height = 250;
		const margin = { top: 10, right: 0, bottom: 20, left: 25 };
		const graphWidth = width - margin.left - margin.right;
		const graphHeight = height - margin.top - margin.bottom;

		const svg = d3
			.select(lineRef.current)
			.attr('width', graphWidth + margin.left + margin.right)
			.attr('height', graphHeight + margin.top + margin.bottom);

		const graph = svg
			.append('g')
			.attr('width', graphWidth)
			.attr('height', graphHeight)
			.attr('transform', `translate(${margin.left}, ${margin.top})`);

		// scales
		const x = d3
			.scaleTime()
			.domain([new Date('2019-09-29'), new Date('2020-09-20')])
			.range([0, graphWidth]);
		const y = d3.scaleLinear().domain([0, 100]).range([graphHeight, 0]);

		// axes groups
		const xAxisGroup = graph
			.append('g')
			.attr('class', 'x-axis')
			.attr('transform', 'translate(0,' + graphHeight + ')');

		const yAxisGroup = graph.append('g').attr('class', 'y-axis');

		// create axes
		const xAxis = d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat('%Y. %m. %d.'));
		const yAxis = d3.axisLeft(y).ticks(3);
		// call axes
		xAxisGroup.call(xAxis);
		yAxisGroup.call(yAxis);

		d3.csv('/csv/multiTimeline.csv').then((data) => {
			// create circles for points
			const circles = graph.selectAll('circle').data(data);
			// remove unwanted points
			circles.exit().remove();
			// // update current points
			// circles
			// 	.attr('r', '5')
			// 	.attr('cx', (d) => x(new Date(d.date)))
			// 	.attr('cy', (d) => y(d.Javascript))
			// 	.attr('fill', '#ccc');
			// // add new points
			circles
				.enter()
				.append('circle')
				.attr('r', '2')
				.attr('cx', (d) => x(new Date(d.date)))
				.attr('cy', (d) => y(d.Javascript))
				.attr('fill', javascriptColor.default);

			circles
				.enter()
				.append('circle')
				.attr('r', '2')
				.attr('cx', (d) => x(new Date(d.date)))
				.attr('cy', (d) => y(d.HTML))
				.attr('fill', htmlColor.default);

			circles
				.enter()
				.append('circle')
				.attr('r', '2')
				.attr('cx', (d) => x(new Date(d.date)))
				.attr('cy', (d) => y(d.CSS))
				.attr('fill', cssColor.default);

			circles
				.enter()
				.append('circle')
				.attr('r', '2')
				.attr('cx', (d) => x(new Date(d.date)))
				.attr('cy', (d) => y(d.React))
				.attr('fill', reactColor.default);

			// d3 Line path generator *****
			const line = d3
				.line()
				.x(function (d) {
					return x(new Date(d.date));
				})
				.y(function (d) {
					return y(d.Javascript);
				});

			const htmlLine = d3
				.line()
				.x(function (d) {
					return x(new Date(d.date));
				})
				.y(function (d) {
					return y(d.HTML);
				});
			const cssLine = d3
				.line()
				.x(function (d) {
					return x(new Date(d.date));
				})
				.y(function (d) {
					return y(d.CSS);
				});
			const reactLine = d3
				.line()
				.x(function (d) {
					return x(new Date(d.date));
				})
				.y(function (d) {
					return y(d.React);
				});
			// line path element
			const path = graph.append('path');
			// update line path data *****
			path
				.data([data]) // [] 안에 업데이트
				.attr('fill', 'none')
				.attr('stroke', javascriptColor.path)
				.attr('stroke-width', 1)
				.attr('d', line);

			const htmlPath = graph.append('path');
			// update line path data *****
			htmlPath
				.data([data]) // [] 안에 업데이트
				.attr('fill', 'none')
				.attr('stroke', htmlColor.path)
				.attr('stroke-width', 1)
				.attr('d', htmlLine);

			const cssPath = graph.append('path');
			// update line path data *****
			cssPath
				.data([data]) // [] 안에 업데이트
				.attr('fill', 'none')
				.attr('stroke', cssColor.path)
				.attr('stroke-width', 1)
				.attr('d', cssLine);

			const reactPath = graph.append('path');
			// update line path data *****
			reactPath
				.data([data]) // [] 안에 업데이트
				.attr('fill', 'none')
				.attr('stroke', reactColor.path)
				.attr('stroke-width', 1)
				.attr('d', reactLine);
			graph
				.selectAll('circle')
				.on('mouseover', function (d) {
					d3.select(this).transition().duration(100).attr('r', 4);
					const [xPosition, yPosition] = d3.mouse(this);
					console.log(xPosition, yPosition);
					d3.select('#tooltip')
						.style('left', xPosition + 250 + 'px')
						.style('top', yPosition + 360 + 'px')
						.select('#value')
						.text(d.name);
					d3.select('#tooltip').classed('hidden', false);
				})
				.on('mouseleave', function (d) {
					d3.select(this).transition().duration(100).attr('r', 2);
					d3.select('#tooltip').classed('hidden', true);
				});
		});
	};

	const createMap = () => {
		const width = 600;
		const height = 600;

		const projection = d3.geoMercator().translate([width / 2, width / 2]);
		const path = d3.geoPath().projection(projection);

		const svg = d3.select(mapRef.current).attr('width', width).attr('height', height);

		// .style('stroke', 'white').style('fill', '#00818a')
		const map = svg.append('g').attr('id', 'map');
		const places = svg.append('g').attr('id', 'places');

		d3.json('/korea-map-json.json').then(function (data) {
			const bestTrendsData = [
				{ name: '서울특별시', keyword: 'Javascript' },
				{ name: '대전광역시', keyword: 'HTML' },
				{ name: '경기도', keyword: 'HTML' },
				{ name: '대구광역시', keyword: 'HTML' },
				{ name: '인천광역시', keyword: 'HTML' },
				{ name: '부산광역시', keyword: 'HTML' },
				{ name: '울산광역시', keyword: 'HTML' },
				{ name: '광주광역시', keyword: 'HTML' },
				{ name: '충청남도', keyword: 'HTML' },
				{ name: '경상북도', keyword: 'HTML' },
				{ name: '충청북도', keyword: 'HTML' },
				{ name: '강원도', keyword: 'HTML' },
				{ name: '전라북도', keyword: 'HTML' },
				{ name: '전라남도', keyword: 'HTML' },
				{ name: '제주특별자치도', keyword: 'HTML' },
				{ name: '경상남도', keyword: 'HTML' },
			];

			const geoJson = topojson.feature(data, data.objects['skorea_provinces_2018_geo']);
			const features = geoJson.features;

			const bounds = d3.geoBounds(geoJson);
			const center = d3.geoCentroid(geoJson);

			const distance = d3.geoDistance(bounds[0], bounds[1]);

			const scale = (height / distance / Math.sqrt(2)) * 1.4;

			projection.scale(scale).center(center);

			map
				.selectAll('path')
				.data(features)
				.enter()
				.append('path')
				.attr('class', function (d) {
					console.log(d);
					return 'municipality c ' + d.properties.code;
				})
				.attr('d', path)
				.attr('stroke', 'white')
				.attr('fill', (d) => {
					let geoName = d.properties.name;
					const getData = bestTrendsData.find(({ name, keyword }) => name === geoName);
					if (getData.keyword === 'HTML') {
						return htmlColor.default;
					} else if (getData.keyword === 'CSS') {
						return cssColor.default;
					} else if (getData.keyword === 'Javascript') {
						return javascriptColor.default;
					} else if (getData.keyword === 'React') {
						return reactColor.default;
					}
				})
				.on('click', (d) => {})
				.on('mouseover', function (d) {
					d3.select(this).attr('fill', (d) => {
						let geoName = d.properties.name;
						const getData = bestTrendsData.find(({ name, keyword }) => name === geoName);
						if (getData.keyword === 'HTML') {
							return htmlColor.mouseOver;
						} else if (getData.keyword === 'CSS') {
							return cssColor.mouseOver;
						} else if (getData.keyword === 'Javascript') {
							return javascriptColor.mouseOver;
						} else if (getData.keyword === 'React') {
							return reactColor.mouseOver;
						}
					});
					const [xPosition, yPosition] = d3.mouse(this);
					createPieChart(xPosition, yPosition, d.properties.name);
					d3.select('#pie-tooltip').classed('hidden-pie', false);
				})
				.on('mouseleave', function (d) {
					d3.select(this).attr('fill', (d) => {
						let geoName = d.properties.name;
						const getData = bestTrendsData.find(({ name, keyword }) => name === geoName);
						if (getData.keyword === 'HTML') {
							return htmlColor.default;
						} else if (getData.keyword === 'CSS') {
							return cssColor.default;
						} else if (getData.keyword === 'Javascript') {
							return javascriptColor.default;
						} else if (getData.keyword === 'React') {
							return reactColor.default;
						}
					});
					d3.select('#pie-tooltip').classed('hidden-pie', true);
					d3.select('#pie-tooltip').selectAll('svg').remove();
				});
		});
	};

	// d3.select('#tooltip')
	// 					.style('left', xPosition + 250 + 'px')
	// 					.style('top', yPosition + 90 + 'px')
	// 					.select('#value')
	// 					.text(d.name);
	// 				d3.select('#tooltip').classed('hidden', false);
	const createPieChart = (xPosition, yPosition, geoName) => {
		// dimensions 치수
		const dims = { height: 100, width: 100, radius: 50 };
		// center
		const cent = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };
		console.log(document.documentElement.clientWidth);
		const svg = d3
			.select(pieRef.current)
			.append('svg')
			.attr('width', dims.width + 100)
			.attr('height', dims.height + 100)
			.style('left', document.documentElement.clientWidth - xPosition - 100)
			.style('top', yPosition);
		console.log(xPosition, yPosition);
		const graph = svg.append('g').attr('transform', `translate(${cent.x}, ${cent.y})`);

		const pie = d3
			.pie()
			.sort(null)
			.value((d) => d.percentage.slice(0, -1));

		const arcPath = d3
			.arc()
			.outerRadius(dims.radius)
			.innerRadius(dims.radius / 2);

		const colorData = ['blue', 'red', 'black', 'yellow'];

		const update = (data) => {
			// // update color scale domain
			// color.domain(data.map((d) => d.name));
			// Join enhanced (pie) data to path elements
			const path = graph.selectAll('path').data(pie(data));

			path
				.enter()
				.append('path')
				.attr('class', 'arc')
				.attr('d', arcPath)
				.attr('stroke', 'white')
				.attr('stroke-width', 3)
				.style('fill', function (d, i) {
					return colorData[i];
				});

			graph.selectAll('path').on('mouseover', handleMouseOver).on('mouseout', handleMouseOut);
		};

		d3.csv('/csv/geoMap.csv').then((data) => {
			const settingData = data.map(({ 지역, Javascript, HTML, CSS, React }) => {
				return {
					geoName: 지역,
					datas: [
						{ name: 'Javascript', percentage: Javascript },
						{ name: 'HTML', percentage: HTML },
						{ name: 'CSS', percentage: CSS },
						{ name: 'React', percentage: React },
					],
				};
			});
			const overedGeoData = settingData.find((data) => data.geoName === geoName);

			update(overedGeoData.datas);
		});

		// event handlers
		function handleMouseOver(d) {
			d3.select(this).transition('changeSliceFill').duration(300).attr('fill', 'white');
		}

		function handleMouseOut(d) {
			d3.select(this).transition('changeSliceFill').duration(300).attr('fill', 'green');
		}
	};

	return (
		<>
			<Head>
				<script src="https://d3js.org/d3.v5.min.js"></script>
				<script src="https://d3js.org/d3-queue.v3.min.js"></script>
				<script src="https://d3js.org/topojson.v1.min.js"></script>
				<script src="https://d3js.org/queue.v1.min.js"></script>
			</Head>
			<h2>Trends</h2>
			<TrendsWrapper>
				<div className="left-section">
					<div className="bar-chart-wrapper">
						<svg ref={barRef}></svg>
					</div>
					<div className="line-chart-wrapper">
						<svg ref={lineRef}></svg>
					</div>
					<div className="ranking-word-wrapper">
						<div></div>
					</div>
				</div>
				<div className="right-section">
					<div className="map-wrapper">
						<svg ref={mapRef} className="map"></svg>
					</div>
				</div>
				<div id="tooltip" className="hidden">
					<p>
						This Value : <b id="value"></b>
					</p>
				</div>
				<div ref={pieRef} id="pie-tooltip" className="hidden-pie"></div>
			</TrendsWrapper>
		</>
	);
};

export default Trends;
