import { useState, useEffect, useRef } from 'react';

interface UseIntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0.5,
}: UseIntersectionObserverProps) => {
  const [visibleEntries, setVisibleEntries] = useState<
    IntersectionObserverEntry[]
  >([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observe = (element: Element) => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((entry) => entry.isIntersecting);
          setVisibleEntries(visible);
        },
        {
          root,
          rootMargin,
          threshold,
        }
      );
    }

    if (element) observerRef.current.observe(element);
  };

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return { observe, visibleEntries };
};
