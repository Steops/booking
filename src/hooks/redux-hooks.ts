import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface IOptions {
  root: null;
  rootMargin: string;
  threshold: number;
}
interface IElementOnScreen {
  containerRef: React.RefObject<HTMLInputElement>;
  isVisible: boolean;
}
export const useElementOnScreen = (options: IOptions) => {
  const containerRef = React.createRef<HTMLInputElement>();
  const [isVisible, setIsVisible] = useState(false);
  const callbackFunction = (entries: any) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    const current = containerRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [containerRef, options]);
  const ElementOnScreen: IElementOnScreen = { containerRef, isVisible };
  return ElementOnScreen;
};
