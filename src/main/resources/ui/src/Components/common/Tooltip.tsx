import React, { useEffect, useState } from 'react';

interface Props extends React.HTMLProps<HTMLDivElement> {
    title: string;
}

const Tooltip: React.FC<Props> = ({ title, children, ...rest }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    useEffect(() => {
        if (!tooltipRef.current || !contentRef.current) return;
        const tooltip = tooltipRef.current;
        const content = contentRef.current;
        let my = content.clientHeight + content.clientHeight;
        tooltip.style.marginTop = `-${my - 5}px`
    })

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='flex items-center'>
            <div ref={tooltipRef} className={`fixed text-white px-2 opacit text-xs trans bg-slate-800 p-1 rounded-lg ${showTooltip ? "opacity-100" : "opacity-0"}`}>
                {title}
            </div>
            <div ref={contentRef}>
                {children}
            </div>
        </div>
    );
};

export default Tooltip;