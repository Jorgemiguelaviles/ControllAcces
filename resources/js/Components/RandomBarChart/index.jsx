import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import userImage from '../../assets/user.png';

const CustomXAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <image x={-12.5} y={0} width={25} height={25} xlinkHref={userImage} alt={`User ${payload.value}`} />
    </g>
  );
};

const RandomBarChart = ({ isDesktop }) => {
  const [chartData, setChartData] = useState([
    { name: 'Usuário 1', valor: 30 },
    { name: 'Usuário 2', valor: 50 },
    { name: 'Usuário 3', valor: 80 },
    { name: 'Usuário 4', valor: 90 },
    { name: 'Usuário 5', valor: 60 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = chartData.map(item => ({
        name: `Usuário ${item.name.split(' ')[1]}`,
        valor: Math.floor(Math.random() * 100) + 1,
      }));

      setChartData(newData);
    }, 1000);

    return () => clearInterval(interval);
  }, [chartData]);

  const chartWidth = isDesktop ? 600 : Math.min(window.innerWidth, 400);
  const chartHeight = isDesktop ? 300 : Math.min(window.innerHeight, 200);

  return (
    <>
      {isDesktop ? (
        <>
          <div>
            <h1>Gerenciamento de Usuarios</h1>
            <BarChart width={chartWidth} height={chartHeight} data={chartData} style={{ background: 'white' }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" tick={<CustomXAxisTick />} />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="bottom" height={50} />
              <Bar dataKey="valor" fill="#2196F3" style={{ margin: "10px" }} />
            </BarChart>
          </div>
        </>
      ) : (
        <>
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
  		<h1 style={{ fontSize: '1rem' }}>Gerenciamento de Usuarios</h1>
	</div>
        </>
      )}
    </>
  );
};

export default RandomBarChart;
