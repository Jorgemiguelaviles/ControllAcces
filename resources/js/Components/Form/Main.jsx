import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useUser } from '../../userContext';

const TelaPrincipal = () => {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [altura, setaltura] = useState();
    const [largura, setlargura] = useState();

 


    const { domain, mobile, setMobile } = useUser();

    useEffect(() => {
        const generateRandomData1 = () => {
            const newData = [];
            for (let i = 0; i < 10; i++) {
                newData.push({ name: i, value: Math.random() * 100 });
            }
            setData1(newData);
        };

        const generateRandomData2 = () => {
            const newData = [];
            for (let i = 0; i < 10; i++) {
                newData.push({ name: i, value: Math.random() * 100 });
            }
            setData2(newData);
        };

        generateRandomData1();
        generateRandomData2();

        const intervalId1 = setInterval(generateRandomData1, 5000);
        const intervalId2 = setInterval(generateRandomData2, 3000);

        return () => {
            clearInterval(intervalId1);
            clearInterval(intervalId2);
        };
    }, []);

    useEffect(() => {
        let altura = '';
        let largura = '';
        if (mobile === 'desktop') {
            setaltura(300);
            setlargura(400);
        } else {
            setaltura(250);
            setlargura(350);
        }
    }, []);

    return (
        <div>
            <div className="row m-4">
                <h1> Dashboards</h1>
            </div>
            <div className="row d-flex align-items-center justify-content-end">
                <LineChart width={largura} height={altura} data={data1}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>
            </div>
            <div className="row d-flex align-items-center justify-content-start">
                <LineChart width={largura} height={altura} data={data2}>
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>
            </div>
        </div>
    );
}

export default TelaPrincipal;
