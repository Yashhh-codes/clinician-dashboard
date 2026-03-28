import React, { useState } from 'react';

const SideNavBar = ({ isExpanded, setIsExpanded, isMobileOpen, setIsMobileOpen }) => {
    const [activeTab, setActiveTab] = useState("Cycle Trends");

    const navItems = [
        { name: "Dashboard", icon: "dashboard" },
        { name: "Cycle Trends", icon: "show_chart" },
        { name: "Symptom Map", icon: "monitor_heart" },
        { name: "Medication", icon: "medical_services" },
        { name: "Patient Files", icon: "folder_shared" },
    ];

    return (
        <aside
            className={`fixed left-0 top-0 h-full bg-white/95 md:bg-white/70 backdrop-blur-xl border-r border-[#c2c6d4]/15 pt-16 md:pt-20 flex flex-col z-40 transition-transform duration-300 ${isMobileOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full md:translate-x-0'
                } ${isExpanded ? 'md:w-64' : 'md:w-[4.5rem]'}`}
        >
            <div className={`px-4 md:px-6 mb-8 flex items-center justify-between mt-4 md:mt-0 ${!isExpanded && 'md:px-4 md:justify-center'}`}>
                {(isExpanded || isMobileOpen) && (
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-8 h-8 rounded shrink-0 bg-primary-container flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-sm" data-icon="medical_services">medical_services</span>
                            </div>
                            <span className="text-lg font-bold text-[#00478d] font-headline whitespace-nowrap">Fertility Clinic</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-wider text-outline font-semibold whitespace-nowrap">Precision Unit B</p>
                    </div>
                )}
                {!isExpanded && !isMobileOpen && (
                    <div className="w-8 h-8 rounded shrink-0 bg-primary-container hidden md:flex items-center justify-center cursor-pointer" onClick={() => setIsExpanded(true)}>
                        <span className="material-symbols-outlined text-white text-sm" data-icon="medical_services">medical_services</span>
                    </div>
                )}

                {/* Desktop Toggle */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1 rounded hover:bg-surface-container transition-colors text-outline focus:outline-none shrink-0 hidden md:block"
                >
                    <span className="material-symbols-outlined text-[1.1rem]">
                        {isExpanded ? 'menu_open' : 'menu'}
                    </span>
                </button>
            </div>

            <nav className="flex-1 px-3 space-y-1 overflow-hidden mt-2">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        onClick={() => {
                            setActiveTab(item.name);
                            if (window.innerWidth < 768) setIsMobileOpen(false);
                        }}
                        className={`flex items-center cursor-pointer transition-all rounded-md whitespace-nowrap ${(!isExpanded && !isMobileOpen) ? 'md:justify-center p-3' : 'gap-3 px-4 py-3'
                            } ${activeTab === item.name
                                ? 'bg-[#f2f4f7] text-[#00478d] font-semibold'
                                : 'text-[#727783] hover:bg-[#f2f4f7]/50 font-medium'
                            }`}
                        title={(!isExpanded && !isMobileOpen) ? item.name : ""}
                    >
                        <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span>
                        {(isExpanded || isMobileOpen) && <span>{item.name}</span>}
                    </a>
                ))}
            </nav>

            <div className="p-4 border-t border-outline-variant/10">
                <button
                    className={`w-full flex items-center justify-center bg-surface-container-high py-2.5 rounded-md font-bold text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer ${(isExpanded || isMobileOpen) ? 'gap-2' : ''}`}
                    onClick={() => alert("Adding new record...")}
                    title="Add Record"
                >
                    <span className="material-symbols-outlined text-lg" data-icon="add">add</span>
                    {(isExpanded || isMobileOpen) && "Add Record"}
                </button>
            </div>
            <div className="mt-auto p-4 space-y-1 mb-4 md:mb-0">
                <a className={`flex items-center text-outline hover:text-primary transition-colors text-sm cursor-pointer ${(isExpanded || isMobileOpen) ? 'gap-3 px-4 py-2' : 'md:justify-center py-2'}`} title="Support">
                    <span className="material-symbols-outlined text-lg" data-icon="support_agent">support_agent</span>
                    {(isExpanded || isMobileOpen) && "Support"}
                </a>
                <a className={`flex items-center text-outline hover:text-secondary transition-colors text-sm cursor-pointer ${(isExpanded || isMobileOpen) ? 'gap-3 px-4 py-2' : 'md:justify-center py-2'}`} title="Sign Out">
                    <span className="material-symbols-outlined text-lg" data-icon="logout">logout</span>
                    {(isExpanded || isMobileOpen) && "Sign Out"}
                </a>
            </div>
        </aside>
    );
};

export default SideNavBar;
