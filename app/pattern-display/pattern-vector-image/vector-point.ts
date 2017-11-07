export interface VectorPoint {
   point: Point;
   curve: CurveType;
   linePurpose: LinePurpose;
   // factory should take care of it
   // @TODO seam allowanceInMM
   d: string;
}

export interface Point {
    x: number;
    y: number;
}

// should I really use this data structure
// it has to know if it is still the same object
// maybe I can create hem *startPoint, *endPoint
// create a structure like this, let other function extract all hems etc. and name them
export interface PathPoint {
    point: Point;
    curve: CurveType;
    linePurpose: LinePurpose;
    seamAllowance?: number;
    d?: string;
}

export interface Curve {
   curveType: CurveType;
   curvePoints: Point[];
}

export interface VectorObject {
    points: VectorPoint[];
    isClosed: boolean;
    // @TODO this should belong to transformations
    // this is a dumb structure
    // wise component should perform translation operation.
    startingPoint: Point;
}

export interface VectorPath {
    points: PathPoint[];
    isClosed: boolean;

}

// no line is also a connection type
// this way we dont have to create ne objects
export enum CurveType {
    CUBIC_BREZIER,
    ARCH,
    LINE,
    NONE
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

export const StrokeStyles = {
    HELPER: '5,2',
    FOLD: '5,5',
    SEAM_ALLOWANCE: '8,1'
};

export interface SVGPath {
    strokeColor: string;
    strokeWidth: number;
    strokeDasharray: string;
    d: string;
}

// @TODO make it a service
export const SVGPathFactory = {
    createSVG(pathPoints: PathPoint[]) {
        const svg: SVGPath[] = [];
        pathPoints.forEach((path, i) => {
            if (path.curve !== CurveType.NONE) {
                svg.push({
                    strokeColor: '#333',
                    strokeWidth: 1,
                    strokeDasharray: StrokeStyles.HELPER,
                    d: createPathD(path.point, pathPoints[i + 1].point, path.curve)
                });
            }
        });
        return svg;
    }
};


export function createPathD(from: Point, to: Point, curveType: CurveType): string {
    return 'M ' + from.x + ' ' + from.y + ' l ' + (to.x - from.x) + ' ' + (to.y - from.y);
}



export const Transformer = {
    makeTranslatedBy(paths: PathPoint[],  vector: Point): PathPoint[] {
        return paths.map(path => {
            const newPointLocation = {
                x: path.point.x + vector.x,
                y: path.point.y + vector.y
            };
            return {...path,
                point: newPointLocation
            };
        });
    },
    makeRotatedBy(vectorObject: PathPoint[],  angleInDegrees: number, pivotPoint: Point) {

    },
    makeScaledBy(vectorObject: PathPoint[],  scale: number) {

    }
};
