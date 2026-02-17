'use client';

export function GlobalBackground() {
    return (
        <div className="fixed inset-0 -z-50 pointer-events-none h-full w-full bg-background">
            {/* 
        Global Dot Pattern 
        Light Mode: Neutral-400 (visible gray)
        Dark Mode: Gray-600 (visible on dark)
      */}
            <div className="absolute inset-0 h-full w-full 
        bg-[radial-gradient(#a3a3a3_1.5px,transparent_1.5px)] 
        dark:bg-[radial-gradient(#4b5563_1.5px,transparent_1.5px)] 
        [background-size:24px_24px]
        opacity-70 dark:opacity-40"
            />
        </div>
    );
}
