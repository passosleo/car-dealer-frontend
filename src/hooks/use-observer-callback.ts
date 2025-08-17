import { useEffect, useRef } from "react";

export function useObserverCallback(
  callback: () => void,
  {
    enabled,
    ...opts
  }: IntersectionObserverInit & {
    enabled?: boolean;
  } = {
    enabled: true,
    threshold: 1.0,
  },
  dependencies: React.DependencyList = []
) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    }, opts);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, dependencies);

  return { observerRef };
}
