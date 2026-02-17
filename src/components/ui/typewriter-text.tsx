'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
    texts: string[];
    className?: string;
    cursorColor?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBetween?: number;
}

export const TypewriterText = ({
    texts,
    className,
    cursorColor = '#ec4899',
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetween = 2000
}: TypewriterTextProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const handleTyping = () => {
            const i = loopNum % texts.length;
            const fullText = texts[i];

            setDisplayedText(current => {
                if (isDeleting) {
                    return fullText.substring(0, current.length - 1);
                } else {
                    return fullText.substring(0, current.length + 1);
                }
            });

            // Determine next speed
            let typeSpeed = typingSpeed;

            if (isDeleting) {
                typeSpeed = deletingSpeed;
            }

            // If finished typing word
            if (!isDeleting && displayedText === fullText) {
                // Pause at end
                typeSpeed = delayBetween;
                setIsDeleting(true);
            }
            // If finished deleting
            else if (isDeleting && displayedText === '') {
                setIsDeleting(false);
                setLoopNum(prev => prev + 1);
                typeSpeed = 500; // Pause before start next word
            }

            timer = setTimeout(handleTyping, typeSpeed);
        };

        timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, delayBetween]);

    return (
        <h1 className={cn("inline-flex items-center", className)}>
            <span>{displayedText}</span>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
                style={{ backgroundColor: cursorColor }}
            />
        </h1>
    );
};
