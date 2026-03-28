import React, { useState } from 'react';

const TopNavBar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header className="bg-[#f7f9fc] dark:bg-slate-900 border-b border-[#c2c6d4]/15 dark:border-slate-800 flex justify-between items-center w-full px-6 py-3 max-w-[100vw] fixed top-0 z-50">
            <div className="flex items-center gap-8">
                <span className="text-xl font-bold tracking-tight text-[#00478d] dark:text-blue-400 font-headline">CycleAnalytics</span>
                <nav className="hidden md:flex items-center gap-6">
                    <a className="text-[#00478d] dark:text-blue-400 font-bold border-b-2 border-[#00478d] pb-1 font-label text-sm" href="#">Patient Overview</a>
                    <a className="text-[#727783] dark:text-slate-400 font-medium pb-1 hover:text-[#00478d] transition-colors font-label text-sm" href="#">Longitudinal View</a>
                    <a className="text-[#727783] dark:text-slate-400 font-medium pb-1 hover:text-[#00478d] transition-colors font-label text-sm" href="#">Lab Results</a>
                    <a className="text-[#727783] dark:text-slate-400 font-medium pb-1 hover:text-[#00478d] transition-colors font-label text-sm" href="#">Clinical Notes</a>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <input
                        className="bg-surface-container-highest border-none rounded-md px-4 py-1.5 text-sm focus:ring-2 focus:ring-primary/20 w-64"
                        placeholder="Search records..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1.5 text-outline text-lg" data-icon="search">search</span>
                </div>
                <div className="flex items-center gap-3 border-l border-outline-variant/30 pl-4">
                    <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors" data-icon="notifications" onClick={() => alert("No new notifications")}>notifications</span>
                    <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors" data-icon="settings">settings</span>
                    <button className="medical-sheen text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity" onClick={() => alert("Report Exported")}>
                        Export Report
                    </button>
                </div>
            </div>
        </header>
    );
};

export default TopNavBar;
