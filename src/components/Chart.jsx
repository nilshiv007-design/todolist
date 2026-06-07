import React from 'react'
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from 'recharts'

const Chart = ({ chatrData }) => {
    console.log(chatrData)
    chatrData[0] - chatrData[1]
    const data = [
        { name: "completed", value: chatrData[1] },
        { name: "Pendding Task", value: chatrData[0] - chatrData[1] },
    ]
    const colors = ["#00cc40", 'red']
    return (
        <div style={{ width: '100%', height: 170 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        dataKey="value"
                        stroke='none'
                        cornerRadius={30}
                        startAngle={90}
                        endAngle={-270}
                    >
                        <Tooltip />
                        {data.map((curIttem, i) => {
                            return <Cell key={i} fill={colors[i]} />
                        })}

                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize='26'
                            fontWeight="bold"
                            fill='block'
                        > {chatrData[1]}/ {chatrData[0]}</text>
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

        </div>
    )
}

export default Chart