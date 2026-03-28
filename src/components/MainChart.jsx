import React, { useState, useMemo } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    ReferenceArea, ReferenceLine, Label, Legend
} from 'recharts';

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

    // Custom Tooltip component - formatted for exact clarity
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-surface-container-lowest/95 p-4 rounded-xl shadow-ambient border border-outline-variant/30 backdrop-blur-md text-[13px] min-w-[180px]">
                    <p className="font-extrabold text-on-surface text-base mb-3 border-b border-outline-variant/20 pb-2">
                        Day {label}
                    </p>
                    <div className="space-y-2 font-medium text-on-surface-variant">
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
                        <div className="pt-2 mt-2 border-t border-outline-variant/15 space-y-2">
                            <div className="flex justify-between items-center gap-4">
                                <span className="font-semibold text-outline">LH:</span>
                                <span className="text-on-surface font-bold">{data.lhStatus}</span>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                                <span className="font-semibold text-outline">Bleeding:</span>
                                <span className="text-on-surface font-bold">{data.bleeding}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-surface-container-lowest rounded-xl p-6 lg:p-8 shadow-ambient border border-outline-variant/15 relative flex flex-col min-h-[500px] w-full max-w-full">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6">

                {/* Improved Legend Styling */}
                <div className="flex flex-wrap gap-x-8 gap-y-3 items-center">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-4 h-1 rounded-full bg-[#00478d] group-hover:scale-110 transition-transform"></div>
                        <span className="text-sm font-bold text-on-surface">BBT (°C)</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-4 h-[2px] rounded-full bg-[#b6171e] group-hover:scale-110 transition-transform"></div>
                        <span className="text-sm font-bold text-on-surface">Pain Level</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-4 h-[2px] rounded-full bg-[#005412] group-hover:scale-110 transition-transform"></div>
                        <span className="text-sm font-bold text-on-surface">Energy Level</span>
                    </div>
                </div>

                {/* Toggle View */}
                <div className="bg-surface-container-low p-1 rounded-lg flex shrink-0 self-start xl:self-auto border border-outline-variant/10">
                    <button
                        className={`px-5 py-2 rounded-md text-xs font-bold transition-all duration-300 ${viewMode === 'Graph View' ? 'bg-surface-container-lowest shadow-sm text-on-surface' : 'text-outline hover:text-on-surface'}`}
                        onClick={() => setViewMode("Graph View")}
                    >
                        Graph View
                    </button>
                    <button
                        className={`px-5 py-2 rounded-md text-xs font-bold transition-all duration-300 ${viewMode === 'Data Table' ? 'bg-surface-container-lowest shadow-sm text-on-surface' : 'text-outline hover:text-on-surface'}`}
                        onClick={() => setViewMode("Data Table")}
                    >
                        Data Table
                    </button>
                </div>
            </div>

            {viewMode === "Graph View" ? (
                <div className="flex-1 w-full h-[400px] sm:h-[450px] min-w-0 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={cycleData} margin={{ top: 25, right: 30, left: -20, bottom: 5 }} className="cursor-crosshair">
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(194, 198, 212, 0.3)" />

                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 11, fill: '#727783', fontWeight: 600 }}
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

                            {/* Secondary Y-Axis for Pain & Energy */}
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                domain={[0, 10]}
                                hide={true}
                            />

                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ stroke: '#00478d', strokeWidth: 1.5, strokeDasharray: '4 4', opacity: 0.5 }}
                                isAnimationActive={true}
                            />

                            {/* Shaded Regions */}
                            <ReferenceArea x1={1} x2={5} yAxisId="left" fill="#b6171e" fillOpacity={0.06} />
                            <ReferenceArea x1={15} x2={28} yAxisId="left" fill="#c2c6d4" fillOpacity={0.15} />
                            <ReferenceArea x1={13} x2={14} yAxisId="left" fill="#00478d" fillOpacity={0.08} />

                            {/* Clinical Annotations */}
                            <ReferenceLine y={36.3} yAxisId="left" stroke="#727783" strokeDasharray="4 4" strokeWidth={1.5} opacity={0.6}>
                                <Label value="Pre-ovulatory baseline" position="insideTopLeft" fill="#727783" fontSize={10} fontWeight={600} offset={5} />
                            </ReferenceLine>

                            {/* Refined Current Day Highlight (Glow equivalent visually) */}
                            <ReferenceLine x={14} yAxisId="left" stroke="url(#currentDayGlow)" strokeWidth={4} opacity={0.3} />
                            <ReferenceLine x={14} yAxisId="left" stroke="#00478d" strokeWidth={1.5} opacity={0.5} strokeDasharray="3 3">
                                <Label value="Current Day" position="top" fill="#00478d" fontSize={11} fontWeight={800} offset={10} />
                            </ReferenceLine>

                            {/* Define exact Gradient for subtle highlight to act as a glow */}
                            <defs>
                                <linearGradient id="currentDayGlow" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#00478d" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="#00478d" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            {/* Event Markers */}
                            <ReferenceLine x={13.5} yAxisId="left" stroke="transparent">
                                <Label value="LH Peak" position="insideBottom" fill="#00478d" fontSize={10} fontWeight={800} offset={20} />
                            </ReferenceLine>
                            <ReferenceLine x={11.5} yAxisId="right" stroke="transparent">
                                <Label value="Energy Peak" position="insideTop" fill="#005412" fontSize={10} fontWeight={800} offset={40} />
                            </ReferenceLine>
                            <ReferenceLine x={28} yAxisId="right" stroke="transparent">
                                <Label value="Pain Spike" position="insideTopRight" fill="#b6171e" fontSize={10} fontWeight={800} offset={20} />
                            </ReferenceLine>
                            <ReferenceLine x={17} yAxisId="left" stroke="transparent">
                                <Label value="Post-ovulatory temp rise" position="insideTop" fill="#00478d" fontSize={10} fontWeight={800} offset={5} />
                            </ReferenceLine>

                            {/* Interactive Lines with progressive animation */}
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="bbt"
                                stroke="#00478d"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#00478d', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 7, strokeWidth: 0, fill: '#00478d' }}
                                isAnimationActive={true}
                                animationDuration={1000}
                                animationEasing="ease-in-out"
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
                                animationDuration={1000}
                                animationEasing="ease-in-out"
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
                                animationDuration={1000}
                                animationEasing="ease-in-out"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex-1 w-full overflow-x-auto border border-outline-variant/30 rounded-lg max-h-[450px]">
                    <table className="w-full text-left border-collapse min-w-[650px] whitespace-nowrap">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-surface-container-low border-b border-outline-variant/40">
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
                                <tr key={row.day} className="border-b border-outline-variant/15 hover:bg-surface-container/50 transition-colors">
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
