import { useState, useEffect } from "react";

const useCounter = (endValue: number, duration = 1500) => {
    const [count, setCount] = useState(0);
    const isDecimal = endValue % 1 !== 0;
    const decimalPlaces = isDecimal ? 2 : 0;

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrame: number;

        const updateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = progress * endValue;

            setCount(currentValue);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(updateCount);
            } else {
                setCount(endValue);
            }
        };

        animationFrame = requestAnimationFrame(updateCount);

        return () => cancelAnimationFrame(animationFrame);
    }, [endValue, duration]);

    // Format the number for display
    return count.toLocaleString(undefined, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
    });
};

export default useCounter;
