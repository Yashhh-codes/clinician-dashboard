import React, { useState, useMemo } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    ReferenceArea, ReferenceLine, Label
} from 'recharts';

// Custom 2D Crosshair matching user criteria (Hover lines)
const CustomCrosshair = (props) => {
    const { points, width, height, stroke } = props;
    if (!points || !points.length) return null;
    const { x, y } = points[0];
    return (
        <svg pointerEvents="none" className="recharts-custom-cursor">
            {/* Vertical Line */}
            <line x1={x} y1={0} x2={x} y2={height} stroke={stroke} strokeWidth={1} strokeDasharray="5 5" opacity={0.6} />
            {/* Horizontal Line locked to primary Y value (BBT) */}
            <line x1={0} y1={y} x2={width} y2={y} stroke={stroke} strokeWidth={1} strokeDasharray="5 5" opacity={0.6} />
        </svg>
    );
};

const MainChart = () => {
    const [viewMode, setViewMode] = useState("Graph View");

    // Memoize the data for performance optimization
    const cycleData = useMemo(() => {
        return Array.from({ length: 28 }, (_, i) => {
            const day = i + 1;
            let bbt = 36.2;
            if (day <= 5) bbt = 36.2 + Math.random() * 0.1;
            else if (day < 13) bbt = 36.1 + Math.random() * 0.15;
            else if (day === 13) bbt = 36.0; // pre-ovulatory dip
            else if (day === 14) bbt = 36.35; // surge
            else if (day > 14) bbt = 36.6 + Math.random() * 0.2; // luteal

            let pain = 0;
            if (day <= 3) pain = 9 - day * 2;
            if (day === 28) pain = 6;

            let energy = 5;
            if (day <= 5) energy = 2 + Math.random() * 1;
            if (day >= 11 && day <= 12) energy = 8 + Math.random() * 1.5;
            if (day > 14 && day < 28) energy = 6 - Math.random() * 1.5;
            if (day === 28) energy = 3;

            let lhStatus = "Didn't test";
            if (day >= 10 && day <= 15) lhStatus = "Low";
            if (day === 12) lhStatus = "High";
            if (day === 13 || day === 14) lhStatus = "Peak";

            let bleeding = "None";
            if (day === 1 || day === 2) bleeding = "Heavy";
            else if (day === 3) bleeding = "Medium";
            else if (day >= 4 && day <= 5) bleeding = "Light";

            return {
                day,
                bbt: Number(bbt.toFixed(2)),
                pain: Math.round(pain),
                energy: Math.round(energy),
                lhStatus,
                bleeding
            };
        });
    }, []);

    // Tooltip optimized for Mobile tap and bounds
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-surface-container-lowest p-3 min-w-[140px] md:min-w-[180px] md:p-4 rounded-xl shadow-ambient border border-outline-variant/30 backdrop-blur-md opacity-100 z-50">
                    <p className="font-extrabold text-on-surface text-sm md:text-base mb-2 md:mb-3 border-b border-outline-variant/20 pb-2">
                        Day {label}
                    </p>
                    <div className="space-y-1.5 md:space-y-2 font-medium text-on-surface-variant text-xs md:text-[13px]">
                        <div className="flex justify-between items-center gap-4">
                            <span className="text-primary font-bold">BBT:</span>
                            <span className="text-on-surface font-bold">{data.bbt} °C</span>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            <span className="text-secondary font-bold">Pain:</span>
                            <span className="text-on-surface font-bold">{data.pain} / 10</span>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            <span className="text-tertiary font-bold">Energy:</span>
                            <span className="text-on-surface font-bold">{data.energy} / 10</span>
                        </div>
                        <div className="pt-2 mt-2 border-t border-outline-variant/15 space-y-1.5 md:space-y-2">
                            <div className="flex justify-between items-center gap-4">
                                <span className="font-semibold text-outline">LH:</span>
                                <span className="text-on-surface font-bold whitespace-nowrap">{data.lhStatus}</span>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                                <span className="font-semibold text-outline">Bleeding:</span>
                                <span className="text-on-surface font-bold whitespace-nowrap">{data.bleeding}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-6 lg:p-8 shadow-ambient border border-outline-variant/15 relative flex flex-col w-full overflow-hidden">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 md:mb-8 gap-6 w-full">

                {/* Touch-Friendly Legend */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
                    <div className="flex items-center gap-2 group cursor-pointer p-1">
                        <div className="w-4 h-1.5 rounded-full bg-[#00478d] transition-transform group-hover:scale-110 group-active:scale-95"></div>
                        <span className="text-[13px] md:text-sm font-bold text-on-surface whitespace-nowrap">BBT (°C)</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer p-1">
                        <div className="w-4 h-1 rounded-full bg-[#b6171e] transition-transform group-hover:scale-110 group-active:scale-95"></div>
                        <span className="text-[13px] md:text-sm font-bold text-on-surface whitespace-nowrap">Pain</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer p-1">
                        <div className="w-4 h-1 rounded-full bg-[#005412] transition-transform group-hover:scale-110 group-active:scale-95"></div>
                        <span className="text-[13px] md:text-sm font-bold text-on-surface whitespace-nowrap">Energy</span>
                    </div>
                </div>

                {/* Toggle View */}
                <div className="bg-surface-container-low p-1 rounded-lg flex shrink-0 self-start xl:self-auto border border-outline-variant/10 w-full sm:w-auto overflow-hidden">
                    <button
                        className={`flex-1 sm:flex-none px-4 md:px-5 py-2.5 md:py-2 rounded-md text-xs md:text-sm font-bold transition-all duration-300 ${viewMode === 'Graph View' ? 'bg-surface-container-lowest shadow-sm text-on-surface' : 'text-outline hover:text-on-surface active:bg-surface-container-lowest/50'}`}
                        onClick={() => setViewMode("Graph View")}
                    >
                        Graph View
                    </button>
                    <button
                        className={`flex-1 sm:flex-none px-4 md:px-5 py-2.5 md:py-2 rounded-md text-xs md:text-sm font-bold transition-all duration-300 ${viewMode === 'Data Table' ? 'bg-surface-container-lowest shadow-sm text-on-surface' : 'text-outline hover:text-on-surface active:bg-surface-container-lowest/50'}`}
                        onClick={() => setViewMode("Data Table")}
                    >
                        Data Table
                    </button>
                </div>
            </div>

            {viewMode === "Graph View" ? (
                /* Mobile Scrollable Wrapper */
                <div className="w-full overflow-x-auto overflow-y-hidden rounded-lg pb-4 -mx-2 px-2 md:mx-0 md:px-0">
                    <div className="h-[350px] md:h-[450px] min-w-[700px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={cycleData} margin={{ top: 35, right: 30, left: -25, bottom: 5 }} className="cursor-crosshair">
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(194, 198, 212, 0.4)" />

                                <XAxis
                                    dataKey="day"
                                    tick={{ fontSize: 12, fill: '#727783', fontWeight: 600 }}
                                    tickLine={false}
                                    axisLine={{ stroke: '#c2c6d4' }}
                                    tickMargin={12}
                                    ticks={[1, 7, 14, 21, 28]}
                                />

                                {/* Primary Y-Axis for BBT */}
                                <YAxis
                                    yAxisId="left"
                                    domain={[35.8, 37.2]}
                                    tick={{ fontSize: 11, fill: '#727783' }}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => val.toFixed(1)}
                                />

                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    domain={[0, 10]}
                                    hide={true}
                                />

                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={<CustomCrosshair stroke="#00478d" />}
                                    isAnimationActive={false} /* Better UX on mobile tap */
                                    wrapperStyle={{ zIndex: 100 }}
                                    allowEscapeViewBox={{ x: false, y: false }}
                                />

                                {/* Shaded Regions */}
                                <ReferenceArea x1={1} x2={5} yAxisId="left" fill="#b6171e" fillOpacity={0.06} />
                                <ReferenceArea x1={15} x2={28} yAxisId="left" fill="#c2c6d4" fillOpacity={0.15} />
                                <ReferenceArea x1={13} x2={14} yAxisId="left" fill="#00478d" fillOpacity={0.08} />

                                {/* Pre-ovulatory baseline */}
                                <ReferenceLine y={36.3} yAxisId="left" stroke="#727783" strokeDasharray="4 4" strokeWidth={1.5} opacity={0.6}>
                                    <Label value="Pre-ovulatory baseline" position="insideTopLeft" fill="#727783" fontSize={11} fontWeight={600} offset={5} />
                                </ReferenceLine>

                                {/* Current Day vertical highlight line */}
                                <ReferenceLine x={14} yAxisId="left" stroke="url(#currentDayGlow)" strokeWidth={4} opacity={0.4} />
                                <ReferenceLine x={14} yAxisId="left" stroke="#00478d" strokeWidth={1.5} opacity={0.6} strokeDasharray="3 3">
                                    <Label value="Current Day" position="top" fill="#00478d" fontSize={12} fontWeight={800} offset={12} />
                                </ReferenceLine>

                                <defs>
                                    <linearGradient id="currentDayGlow" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#00478d" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#00478d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>

                                {/* Desktop+Mobile Event Markers */}
                                <ReferenceLine x={13.5} yAxisId="left" stroke="transparent">
                                    <Label value="LH Peak" position="insideBottom" fill="#00478d" fontSize={11} fontWeight={800} offset={25} />
                                </ReferenceLine>
                                <ReferenceLine x={11.5} yAxisId="right" stroke="transparent">
                                    <Label value="Energy Peak" position="insideTop" fill="#005412" fontSize={11} fontWeight={800} offset={45} />
                                </ReferenceLine>
                                <ReferenceLine x={28} yAxisId="right" stroke="transparent">
                                    <Label value="Pain Spike" position="insideTopRight" fill="#b6171e" fontSize={11} fontWeight={800} offset={25} />
                                </ReferenceLine>
                                <ReferenceLine x={17} yAxisId="left" stroke="transparent">
                                    <Label value="Post-ovulatory temp rise" position="insideTop" fill="#00478d" fontSize={11} fontWeight={800} offset={10} />
                                </ReferenceLine>

                                {/* Animated Chart Lines */}
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="bbt"
                                    stroke="#00478d"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#00478d', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 7, strokeWidth: 0, fill: '#00478d' }}
                                    isAnimationActive={true}
                                    animationDuration={1200}
                                    animationEasing="ease-out"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="pain"
                                    stroke="#b6171e"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 6, fill: '#b6171e', stroke: '#fff', strokeWidth: 2 }}
                                    isAnimationActive={true}
                                    animationDuration={1200}
                                    animationEasing="ease-out"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="energy"
                                    stroke="#005412"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 6, fill: '#005412', stroke: '#fff', strokeWidth: 2 }}
                                    isAnimationActive={true}
                                    animationDuration={1200}
                                    animationEasing="ease-out"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ) : (
                <div className="flex-1 w-full overflow-x-auto border border-outline-variant/30 rounded-lg max-h-[450px]">
                    <table className="w-full text-left border-collapse min-w-[650px] whitespace-nowrap">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-surface-container-low border-b border-outline-variant/40 shadow-sm">
                                <th className="p-4 text-[11px] font-bold text-outline uppercase tracking-wider">Day</th>
                                <th className="p-4 text-[11px] font-bold text-primary uppercase tracking-wider">BBT (°C)</th>
                                <th className="p-4 text-[11px] font-bold text-secondary uppercase tracking-wider">Pain Level</th>
                                <th className="p-4 text-[11px] font-bold text-tertiary uppercase tracking-wider">Energy Level</th>
                                <th className="p-4 text-[11px] font-bold text-outline uppercase tracking-wider">LH Test</th>
                                <th className="p-4 text-[11px] font-bold text-outline uppercase tracking-wider">Bleeding</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cycleData.map((row) => (
                                <tr key={row.day} className="border-b border-outline-variant/15 hover:bg-surface-container/50 transition-colors cursor-pointer">
                                    <td className="p-4 text-sm font-semibold text-on-surface">Day {row.day}</td>
                                    <td className="p-4 text-sm font-bold text-primary">{row.bbt}</td>
                                    <td className="p-4 text-sm font-medium text-secondary">{row.pain}/10</td>
                                    <td className="p-4 text-sm font-medium text-tertiary">{row.energy}/10</td>
                                    <td className="p-4 text-xs font-bold text-on-surface-variant uppercase">{row.lhStatus}</td>
                                    <td className="p-4 text-xs font-bold text-on-surface-variant uppercase">{row.bleeding}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MainChart;
