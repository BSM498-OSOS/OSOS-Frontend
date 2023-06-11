import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area,
    ComposedChart,
    Bar,
    Scatter,
    ResponsiveContainer
} from "recharts";

function SimpleGraph({ Data, tip, syncId }) {

    const createLineChart = () => {
        return <LineChart
            scale="auto"
            syncId={syncId}
            data={Data}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
            <YAxis unit="W"/>
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="Consumption"
                stroke="#FF0000"
                strokeDasharray="3 3"
                activeDot={{ r: 8 }}
            />
        </LineChart>
    }

    const createAreaChart = () => {
        return <AreaChart
            scale="auto"
            syncId={syncId}
            data={Data}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
            <YAxis unit="W"/>
            <Tooltip />
            <Legend />
            <Area
                type="monotone"
                dataKey="Consumption"
                stroke="#FF0000"
                fill="#FFA500"
            />
        </AreaChart>
    }

    const createComposedChart = () => {
        return <ComposedChart
            scale='auto'
            syncId={syncId}
            data={Data}
        >
            <CartesianGrid stroke="#FFFFF" />
            <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
            <YAxis unit="W" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Consumption" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="Consumption" stroke="#ff7300" />
        </ComposedChart>
    }

    const graph = () => {
        switch (tip) {
            case 'Line':
                return createLineChart();
            case 'Area':
                return createAreaChart();
            case 'Composed':
                return createComposedChart();
            default:
                return createLineChart();
        }
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            {graph()}
        </ResponsiveContainer>
    )
}

export default SimpleGraph;