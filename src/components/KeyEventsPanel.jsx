import React from 'react';

const KeyEventsPanel = () => {
    return (
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient border border-outline-variant/15 flex flex-col h-full mx-4 lg:mx-0 transition-all duration-300">
            <h2 className="text-xl font-bold font-headline mb-6 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined" data-icon="clinical_notes">clinical_notes</span>
                Clinical Interpretation
            </h2>

            <div className="space-y-6 flex-1">
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                    <p className="text-sm text-on-surface font-medium leading-relaxed">
                        "LH surge followed by sustained BBT rise confirms ovulation"
                    </p>
                </div>

                <div className="bg-tertiary/5 border-l-4 border-tertiary p-4 rounded-r-lg">
                    <p className="text-sm text-on-surface font-medium leading-relaxed">
                        "Mid-cycle energy peak aligns with follicular phase physiology"
                    </p>
                </div>

                <div className="bg-secondary/5 border-l-4 border-secondary p-4 rounded-r-lg">
                    <p className="text-sm text-on-surface font-medium leading-relaxed">
                        "Late luteal pain increase suggests possible PMS pattern"
                    </p>
                </div>
            </div>

            {/* Clinical Action Card */}
            <div className="mt-8 bg-surface-container-low p-4 rounded-lg border border-outline-variant/20 hover:border-primary/30 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-sm" data-icon="edit_note">edit_note</span>
                        <span className="text-xs font-bold text-on-surface font-label uppercase">Add Addendum</span>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-sm">arrow_forward</span>
                </div>
                <p className="text-xs text-outline italic">Document additional findings or schedule follow-up.</p>
            </div>
        </div>
    );
};

export default KeyEventsPanel;
