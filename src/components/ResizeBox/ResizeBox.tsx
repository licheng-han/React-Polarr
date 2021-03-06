import React, {useContext, useEffect, useRef} from 'react';
import {Context} from "../../Context";
import {mapValue} from "../../render/GLUtil";
import {H1, H2, InnerWrapper, LB, LT, MB, ML, MR, MT, RB, RT, V1, V2, Wrapper} from "./ResizeBoxStyle";
import {switchHandler} from "../../lib/util";
import {ActionType} from "../../types/type";


const xMapValue = mapValue(-1, 1, 0, 1);
const yMapValue = mapValue(-1, 1, 1, 0);
type HandlerType = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => void;
export const ResizeBox: React.FC = () => {
    const {state, dispatch} = useContext(Context);
    const container = useRef<HTMLDivElement>(null);


    const nw = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (state.currentLayer) {
            let offsetXPercent = offsetX / (state.width * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            let offsetYPercent = offsetY / (state.height * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...state.currentLayer.transform,
                    top: initTop + offsetYPercent,
                    left: initLeft + offsetXPercent
                }});
        }
    };
    const n = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (state.currentLayer) {
            let offsetYPercent = offsetY / (state.height * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...state.currentLayer.transform,
                    top: initTop + offsetYPercent
                }});
        }

    };
    const ne = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (state.currentLayer) {
            let offsetXPercent = offsetX / (state.width * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            let offsetYPercent = offsetY / (state.height * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...state.currentLayer.transform,
                    top: initTop + offsetYPercent,
                    right: initRight - offsetXPercent
                }});
        }
    };
    const w = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (state.currentLayer) {
            let offsetXPercent = offsetX / (state.width * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...state.currentLayer.transform,
                    left: initLeft + offsetXPercent
                }});
        }
    };
    const drag = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (state.currentLayer) {
            let offsetXPercent = offsetX / (state.width * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            let offsetYPercent = offsetY / (state.height * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            let top = initTop + offsetYPercent;
            let right = initRight - offsetXPercent;
            let left = initLeft + offsetXPercent;
            let bottom = initBottom - offsetYPercent;
            if (top < 0) {
                top = 0;
                bottom = initBottom + initTop;
            } else if (bottom < 0) {
                bottom = 0;
                top = initTop + initBottom;
            }

            if (left < 0) {
                left = 0;
                right = initRight + initLeft
            } else if (right < 0) {
                right = 0;
                left = initLeft + initRight;
            }
            if (top < 0 || bottom < 0 || left < 0 || right < 0) return;
            dispatch({type: ActionType.updateTransform, payload: {
                    ...state.currentLayer.transform,
                    top: top,
                    right: right,
                    left,
                    bottom
                }});
        }
    };

    const e = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (state.currentLayer) {
            let offsetXPercent = offsetX / (state.width * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...state.currentLayer.transform,
                    right: initRight - offsetXPercent
                }});
        }
    };

    const sw = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (state.currentLayer) {
            let offsetXPercent = offsetX / (state.width * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            let offsetYPercent = offsetY / (state.height * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...state.currentLayer.transform,
                    bottom: initBottom - offsetYPercent,
                    left: initLeft + offsetXPercent
                }});
        }
    };

    const s = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        // container.style.height = initHeight + offsetY + 'px';
        if (state.currentLayer) {
            let offsetYPercent = offsetY / (state.height * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...state.currentLayer.transform,
                    bottom: initBottom - offsetYPercent,
                }});
        }
    };

    const se = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        // container.style.width = initWidth + offsetX + 'px';
        // container.style.height = initHeight + offsetY + 'px';
        if (state.currentLayer) {
            let offsetXPercent = offsetX / (state.width * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            let offsetYPercent = offsetY / (state.height * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1) / 2);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...state.currentLayer.transform,
                    bottom: initBottom - offsetYPercent,
                    right: initRight - offsetXPercent
                }});
        }
    };
    const handlers: HandlerType[] = [nw, n, ne, w, drag, e, sw, s, se];
    let currentHandler: HandlerType | null = null;
    let leftBoundary, rightBoundary, topBoundary, bottomBoundary;
    const touchStart = function (this: HTMLElement, e: TouchEvent) {
        e.preventDefault();
        if (!container.current || !state.currentLayer) return;
        leftBoundary = container.current.offsetLeft;
        rightBoundary = leftBoundary + container.current.offsetWidth;
        topBoundary = container.current.offsetTop;
        bottomBoundary = topBoundary + container.current.offsetHeight;
        let initLeft = state.currentLayer.transform.left;
        let initRight = state.currentLayer.transform.right;
        let initTop = state.currentLayer.transform.top;
        console.log(initTop);
        let initBottom = state.currentLayer.transform.bottom;
        let height = bottomBoundary - topBoundary;
        let width = rightBoundary - leftBoundary;
        let relativeX = e.touches[0].clientX - this.offsetLeft;
        let relativeY = e.touches[0].clientY - this.offsetTop;
        currentHandler = switchHandler<HandlerType>(leftBoundary, rightBoundary, topBoundary, bottomBoundary, relativeX, relativeY, handlers);
        if (currentHandler) {
            console.log(currentHandler.name);
        }
        const touchMove = (ev: TouchEvent) => {
            ev.preventDefault();
            let offsetX = ev.touches[0].clientX - e.touches[0].clientX;
            let offsetY = ev.touches[0].clientY - e.touches[0].clientY;
            if (currentHandler && container.current) {
                currentHandler(initLeft, initRight, initTop, initBottom, offsetX, offsetY);
            }
        };
        const touchEnd = (e: TouchEvent) => {

            document.removeEventListener('touchmove', touchMove);
            document.removeEventListener('touchend', touchEnd);
        };
        document.addEventListener('touchmove', touchMove, {passive: false});
        document.addEventListener('touchend', touchEnd);

    };
    useEffect(() => {
        let canvas = document.getElementById('canvas');
        if (canvas && canvas.parentElement) {
            canvas.parentElement.addEventListener('touchstart', touchStart);
        }
        return () => {
            if (canvas && canvas.parentElement) {
                canvas.parentElement.removeEventListener('touchstart', touchStart);
            }
        }
    });
    let left = 0, right = 0, top = 0, bottom = 0;
    let maskLeft = 0, maskRight = 0, maskTop = 0, maskBottom = 0;
    if (state.currentLayer) {
        maskLeft = xMapValue(state.currentLayer.originPosition.x1);
        maskRight = xMapValue(state.currentLayer.originPosition.x2);
        maskTop = yMapValue(state.currentLayer.originPosition.y2);
        maskBottom = yMapValue(state.currentLayer.originPosition.y1);
        left = xMapValue(state.currentLayer.originPosition.x1 + state.currentLayer.transform.left * (state.currentLayer.originPosition.x2 - state.currentLayer.originPosition.x1));
        right = xMapValue(state.currentLayer.originPosition.x2 - state.currentLayer.transform.right * (state.currentLayer.originPosition.x2 - state.currentLayer.originPosition.x1));
        top = yMapValue(state.currentLayer.originPosition.y2 - state.currentLayer.transform.top * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1));
        bottom = yMapValue(state.currentLayer.originPosition.y1 + state.currentLayer.transform.bottom * (state.currentLayer.originPosition.y2 - state.currentLayer.originPosition.y1));
    }
    return (
        <div>
            <Wrapper ref={container} style={{
                left: `${left * 100}%`,
                width: `${(right - left) * 100}%`,
                top: `${top * 100}%`,
                height: `${(bottom - top) * 100}%`
            }}>
                <LT/>
                <RT/>
                <LB/>
                <RB/>
                <MT/>
                <MB/>
                <ML/>
                <MR/>
                <InnerWrapper>
                    <H1/>
                    <H2/>
                    <V1/>
                    <V2/>
                </InnerWrapper>
            </Wrapper>

            <div className="mask" style={{
                position: "absolute",
                left: `${maskLeft * 100}%`,
                width: `${100}%`,
                top: 0,
                height: `100%`,
                clipPath: `polygon(
                0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
                ${left * 100}% ${top * 100}%, ${left * 100}% ${bottom * 100}%, ${right * 100}% ${bottom * 100}%, ${right * 100}% ${top * 100}%, ${left * 100}% ${top * 100}%
                )`,
                backgroundColor: '#000000aa'
            }}/>

        </div>
    )
};