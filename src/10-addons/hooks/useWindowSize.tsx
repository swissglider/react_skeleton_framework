import { useLayoutEffect, useState } from 'react';

type T_Size_P = { totalWidth: number; totalHeight: number; isLandscape: boolean };

export const useWindowSize = (): T_Size_P => {
    const [size, setSize] = useState<T_Size_P>({ totalWidth: 0, totalHeight: 0, isLandscape: false });
    useLayoutEffect(() => {
        const updateSize = (): void => {
            const totalWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) ?? 0;
            const totalHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) ?? 0;
            const isLandscape = totalWidth - totalHeight > 0;
            setSize({ totalWidth, totalHeight, isLandscape });
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};
