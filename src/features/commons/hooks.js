import { useEventCallback } from '@mui/material';
import { useEffect } from 'react';

export function useInfiniteScroll(ref, onScroll, observerOptions = {}) {
    const onScrollCallback = useEventCallback(onScroll);
    useEffect(() => {
        const node = ref.current;
        if (!node) {
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio > 0) {
                onScrollCallback();
            }
        }, observerOptions);
        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [observerOptions, onScrollCallback, ref]);
}
