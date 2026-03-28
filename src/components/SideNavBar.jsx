import React, { useState } from 'react';

const SideNavBar = ({ isExpanded, setIsExpanded }) => {
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
            className={`fixed left-0 top-0 h-full bg-white/70 backdrop-blur-xl border-r border-[#c2c6d4]/15 pt-20 flex flex-col z-40 transition-all duration-300 hidden md:flex ${isExpanded ? 'w-64' : 'w-[4.5rem]'}`}
        >
            <div className={`px-6 mb-8 flex items-center justify-between ${!isExpanded && 'px-4 justify-center'}`}>
                {isExpanded && (
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
                {!isExpanded && (
                    <div className="w-8 h-8 rounded shrink-0 bg-primary-container flex items-center justify-center cursor-pointer" onClick={() => setIsExpanded(true)}>
                        <span className="material-symbols-outlined text-white text-sm" data-icon="medical_services">medical_services</span>
                    </div>
                )}

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1 rounded hover:bg-surface-container transition-colors text-outline focus:outline-none shrink-0 hidden md:block"
                >
                    <span className="material-symbols-outlined text-[1.1rem]">
                        {isExpanded ? 'menu_open' : 'menu'}
                    </span>
                </button>
            </div>

            <nav className="flex-1 px-3 space-y-1 overflow-hidden">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        onClick={() => setActiveTab(item.name)}
                        className={`flex items-center cursor-pointer transition-all rounded-md whitespace-nowrap ${!isExpanded ? 'justify-center p-3' : 'gap-3 px-4 py-3'
                            } ${activeTab === item.name
                                ? 'bg-[#f2f4f7] text-[#00478d] font-semibold'
                                : 'text-[#727783] hover:bg-[#f2f4f7]/50 font-medium'
                            }`}
                        title={!isExpanded ? item.name : ""}
                    >
                        <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span>
                        {isExpanded && <span>{item.name}</span>}
                    </a>
                ))}
            </nav>

            <div className="p-4 border-t border-outline-variant/10">
                <button
                    className={`w-full flex items-center justify-center bg-surface-container-high py-2.5 rounded-md font-bold text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer ${isExpanded ? 'gap-2' : ''}`}
                    onClick={() => alert("Adding new record...")}
                    title="Add Record"
                >
                    <span className="material-symbols-outlined text-lg" data-icon="add">add</span>
                    {isExpanded && "Add Record"}
                </button>
            </div>
            <div className="mt-auto p-4 space-y-1">
                <a className={`flex items-center text-outline hover:text-primary transition-colors text-sm cursor-pointer ${isExpanded ? 'gap-3 px-4 py-2' : 'justify-center py-2'}`} title="Support">
                    <span className="material-symbols-outlined text-lg" data-icon="support_agent">support_agent</span>
                    {isExpanded && "Support"}
                </a>
                <a className={`flex items-center text-outline hover:text-secondary transition-colors text-sm cursor-pointer ${isExpanded ? 'gap-3 px-4 py-2' : 'justify-center py-2'}`} title="Sign Out">
                    <span className="material-symbols-outlined text-lg" data-icon="logout">logout</span>
                    {isExpanded && "Sign Out"}
                </a>
            </div>
        </aside>
    );
};

export default SideNavBar;
