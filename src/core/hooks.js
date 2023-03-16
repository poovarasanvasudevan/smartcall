import {useRef, useEffect, useState, useLayoutEffect, useCallback} from "react";
import useResizeObserver from "@react-hook/resize-observer";

export function useHorizontalScroll() {
    const elRef = useRef();
    useEffect(() => {
        const el = elRef.current;
        if (el) {
            const onWheel = e => {
                if (e.deltaY == 0) return;
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                    behavior: "smooth"
                });
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);
    return elRef;
}

export const useContainerDimensions = myRef => {
    const getDimensions = () => ({
        width: myRef.current.offsetWidth,
        height: myRef.current.offsetHeight
    })

    const [dimensions, setDimensions] = useState({width: 0, height: 0})

    useEffect(() => {
        const handleResize = () => {
            setDimensions(getDimensions())
        }

        if (myRef.current) {
            setDimensions(getDimensions())
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [myRef])

    return dimensions;
};


export const useSize = (target) => {
    const [size, setSize] = useState()

    if(target && target.current) {

        useLayoutEffect(() => {
            setSize(target.current.getBoundingClientRect())
        }, [target])

        // Where the magic happens
        useResizeObserver(target, (entry) => setSize(entry.contentRect))
    }
    return size
}


export const useStateWithRef = (initialState) => {
    const [state, _setState] = useState(initialState);
    const ref = useRef(state);
    const setState = useCallback(
        (newState) => {
            if (typeof newState === 'function') {
                _setState(prevState => {
                    const computedState = newState(prevState);
                    ref.current = computedState;
                    return computedState;
                });
            } else {
                ref.current = newState;
                _setState(newState);
            }
        },
        []
    );
    return [state, setState, ref];
}