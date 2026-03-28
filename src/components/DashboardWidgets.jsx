import React, { useState } from 'react';

const DashboardWidgets = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const widgets = [
        {
            title: "Average BBT",
            value: "36.65°C",
            valueColor: "text-primary",
            footerIcon: "check_circle",
            footerText: "In range",
            footerColor: "text-tertiary",
            bgClass: "bg-surface-container-low",
            borderClass: "border-outline-variant/10"
        },
        {
            title: "Max Pain Level",
            value: "8/10",
            valueColor: "text-secondary",
            footerIcon: null,
            footerText: "Recorded Day 1 & 2",
            footerColor: "text-outline italic",
            bgClass: "bg-surface-container-low",
            borderClass: "border-outline-variant/10"
        },
        {
            title: "Energy Trend",
            value: "Positive",
            valueColor: "text-tertiary",
            footerIcon: null,
            footerText: "Peaked Day 12",
            footerColor: "text-outline",
            bgClass: "bg-surface-container-low",
            borderClass: "border-outline-variant/10"
        },
        {
            title: "Cycle Classification",
            value: "Normal Ovulatory Cycle",
            valueColor: "text-on-surface",
            footerIcon: "verified",
            footerText: "Confidence: 90%",
            footerColor: "text-primary",
            bgClass: "bg-primary/5",
            borderClass: "border-primary/20"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-0">
            {widgets.map((widget, i) => (
                <div
                    key={i}
                    className={`${widget.bgClass} p-5 rounded-xl border ${widget.borderClass} transition-transform duration-300 cursor-default ${hoveredIndex === i ? '-translate-y-1 shadow-ambient' : ''}`}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <p className="text-[0.6875rem] font-bold font-label text-outline uppercase">{widget.title}</p>
                    <p className={`text-2xl lg:text-3xl font-bold font-headline mt-1 ${widget.title === 'Cycle Type' ? 'text-lg leading-tight' : ''} ${widget.valueColor}`}>
                        {widget.value}
                    </p>
                    <div className={`mt-2 flex items-center text-[10px] font-bold ${widget.footerColor}`}>
                        {widget.footerIcon && (
                            <span className="material-symbols-outlined text-xs mr-1" data-icon={widget.footerIcon}>{widget.footerIcon}</span>
                        )}
                        {widget.footerText}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardWidgets;
