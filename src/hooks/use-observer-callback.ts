import { useEffect, useMemo, useRef } from "react";

type Options = Omit<IntersectionObserverInit, "threshold"> & {
  /** liga/desliga o observer */
  enabled?: boolean;
  /**
   * Lista de valores (primitivos/serializáveis) que, ao mudar,
   * devem reconfigurar o observer (ex.: filtros externos).
   * Evita spread dinâmico no deps array.
   */
  reobserveOn?: ReadonlyArray<unknown>;
  /** Threshold do observer */
  threshold?: number;
};

export function useObserverCallback(
  callback: () => void,
  {
    enabled = true,
    threshold = 1.0,
    root,
    rootMargin,
    reobserveOn = [],
  }: Options = {}
) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const memoOpts = useMemo<IntersectionObserverInit>(
    () => ({ root, rootMargin, threshold }),
    [root, rootMargin, threshold]
  );

  const reobserveKey = useMemo(
    () => JSON.stringify(reobserveOn),
    [reobserveOn]
  );

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    const node = observerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        callbackRef.current();
      }
    }, memoOpts);

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, memoOpts, reobserveKey]);

  return { observerRef };
}
