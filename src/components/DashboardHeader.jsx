import React from 'react';

const DashboardHeader = () => {
    return (
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 px-4 md:px-0">
            <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface font-headline tracking-tight">Patient Cycle Dashboard</h1>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                    <p className="text-sm text-outline font-body">Cycle Overview - Day 1 to 28 • Patient ID: #FERT-8821</p>
                    <span className="text-outline/40 hidden sm:inline">|</span>
                    <p className="text-sm text-outline font-body font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm" data-icon="calendar_month">calendar_month</span>
                        Cycle Length: 28 days
                    </p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-right">
                    <p className="text-[0.6875rem] font-bold text-primary uppercase tracking-widest font-label">Current Status</p>
                    <p className="text-2xl font-bold font-headline">
                        Day 14 <span className="text-outline font-medium px-2">|</span> <span className="text-tertiary">Ovulation Phase</span>
                    </p>
                </div>
                <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold border border-secondary/20 transition-all hover:bg-secondary hover:text-white cursor-help">
                        <span className="material-symbols-outlined text-sm mr-1" data-icon="priority_high">priority_high</span>
                        LH Peak Detected
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 transition-all hover:bg-primary hover:text-white cursor-help">
                        <span className="material-symbols-outlined text-sm mr-1" data-icon="trending_up">trending_up</span>
                        BBT Rising
                    </span>
                </div>
            </div>
        </section>
    );
};

export default DashboardHeader;
