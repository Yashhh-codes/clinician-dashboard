import React, { useState } from 'react';

const TopNavBar = ({ onMenuToggle }) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header className="bg-[#f7f9fc] dark:bg-slate-900 border-b border-[#c2c6d4]/15 dark:border-slate-800 flex justify-between items-center w-full px-4 md:px-6 py-3 max-w-[100vw] fixed top-0 z-50">
            <div className="flex items-center gap-4 md:gap-8">
                <button
                    className="md:hidden shrink-0 text-[#00478d] p-1.5 -ml-1 rounded-md hover:bg-surface-container-low transition-colors focus:outline-none"
                    onClick={onMenuToggle}
                >
                    <span className="material-symbols-outlined text-2xl">menu</span>
                </button>
                <span className="text-lg md:text-xl font-bold tracking-tight text-[#00478d] dark:text-blue-400 font-headline hidden sm:block">CycleAnalytics</span>
                <nav className="hidden xl:flex items-center gap-6">
                    <a className="text-[#00478d] dark:text-blue-400 font-bold border-b-2 border-[#00478d] pb-1 font-label text-sm" href="#">Patient Overview</a>
                    <a className="text-[#727783] dark:text-slate-400 font-medium pb-1 hover:text-[#00478d] transition-colors font-label text-sm" href="#">Longitudinal View</a>
                    <a className="text-[#727783] dark:text-slate-400 font-medium pb-1 hover:text-[#00478d] transition-colors font-label text-sm" href="#">Lab Results</a>
                    <a className="text-[#727783] dark:text-slate-400 font-medium pb-1 hover:text-[#00478d] transition-colors font-label text-sm" href="#">Clinical Notes</a>
                </nav>
            </div>
            <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
                <div className="relative group flex-1 max-w-[200px] md:max-w-xs">
                    <input
                        className="bg-surface-container-highest border-none rounded-md px-3 md:px-4 py-1.5 text-xs md:text-sm focus:ring-2 focus:ring-primary/20 w-full"
                        placeholder="Search..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-2 md:right-3 top-1.5 text-outline text-[1.1rem]" data-icon="search">search</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 border-l border-outline-variant/30 pl-2 md:pl-4">
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
