export interface VectorPoint {
   point: Point;
   curve: CurveType;
   linePurpose: LinePurpose;
   // factory should take care of it
   d: string;
}

export interface Point {
    x: number;
    y: number;
}

// @TODO seam allowance
export interface Curve {
   curveType: CurveType;
   curvePoints: Point[];
}

export interface VectorObject {
    points: VectorPoint[];
    isClosed: boolean;
    startingPoint: Point;
}


export enum CurveType {
    CUBIC_BREZIER,
    ARCH,
    LINE
}

export enum LinePurpose {
    HEM,
    CUT,
    HELPER
}

export function VectorPointFactory(x, y, curveType, linePurpose) {
    return {
        x: x,
        y: y,
        d: CurveFactory.createCurve(curveType),
        stroke: {
            color: 'black',
            width: '2',
            dasharray: '5  5'
        }
    };
}

export const CurveFactory = {
    createCurve(test) {
        return '';
    },
    createHipCurve: function name(startPoint: Point, endPoint: Point): Curve {
        return null;
    },
    createStraightLine: function name(startPoint: Point, endPoint: Point): Curve {
        const curvePoints = [{
            x: endPoint.x - startPoint.x,
            y: endPoint.y - startPoint.y
        }];
        return {
            curveType: CurveType.LINE,
            curvePoints: curvePoints
        };
    }
};
