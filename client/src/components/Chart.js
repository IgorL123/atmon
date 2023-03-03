import {
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    AreaChart,
    Area
} from 'recharts';
import {formatDate} from "./ListOperations";


export const Chart = (data) => {
    data = data.data
    for(let i = 0; i < data.length; i++){
        data[i].date = formatDate(new Date(data[i].date))
        data[i].sum = Math.round(data[i].sum)
    }

    return (
        <div>
            <AreaChart
                width={850}
                height={600}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sum" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </div>
    )
};


