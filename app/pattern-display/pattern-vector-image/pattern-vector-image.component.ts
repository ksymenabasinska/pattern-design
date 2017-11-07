import { Component, OnInit, Input } from '@angular/core';
import { Point, VectorPoint, SVGPathFactory, LinePurpose, CurveType, VectorObject, Transformer, PathPoint, SVGPath } from './vector-point';
import { MeasurmentsService } from '../../measurments/measurments.service';
import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'pd-pattern-vector-image',
  templateUrl: './pattern-vector-image.component.html',
  styleUrls: ['./pattern-vector-image.component.css']
})
export class PatternVectorImageComponent implements OnInit {

  public imageWidth: 400;
  public imageHeight: 600;

  private scale = 7;
  private height = 172 * this.scale;
  private waist = 64 * this.scale;
  private hips = 95 * this.scale;

  private skirtLength = this.height / 4;
  private hipHeight = (this.hips / 5) - 1;
  private totalHeight = this.skirtLength + this.hipHeight;

  private mStream: Subscription;

  @Input()
  vectorPoints: PathPoint[] = [];

  @Input()
  position: Point;

  public svgPaths: SVGPath[] = [];

  public vectorObjects: VectorObject[] = [];

  constructor(
    private measurmentsService: MeasurmentsService
  ) {
    this.mStream = this.measurmentsService.measurments$.subscribe(m => {
      this.height = this.scale * m.height;
      this.waist = this.scale * m.waist;
      this.hips = this.scale * m.hips;

      this.refresh();
    });
  }

  ngOnInit() {
    this.createHelpers();
    console.log(this.vectorObjects);
    this.svgPaths = SVGPathFactory.createSVG(this.vectorPoints);
    console.log(this.svgPaths);
  }

  private refresh() {
    this.vectorPoints = [];
    this.svgPaths = [];
    this.flushVectors();

    this.skirtLength = this.height / 4;
    this.hipHeight = (this.hips / 5) - 1;
    this.totalHeight = this.skirtLength + this.hipHeight;

    this.createHelpers();
    this.svgPaths = SVGPathFactory.createSVG(this.vectorPoints);

  }

  private flushVectors() {
    while (this.vectorObjects.length > 0) {
        this.vectorObjects.pop();
    }
  }
  private createHelpers() {
    this.vectorObjects.push(this.createVerticalHelper(0, 0));
    // hips
    this.vectorObjects.push(this.createVerticalHelper(this.getBackSeamX() / 2, 0));
    this.vectorObjects.push(this.createVerticalHelper(this.getBackSeamX(), 0));

    this.vectorObjects.push(this.createHorizontalHelper(0, 0));
    this.vectorObjects.push(this.createHorizontalHelper(0, this.hipHeight));
    this.vectorObjects.push(this.createHorizontalHelper(0, this.totalHeight));

    const verticalHelpers = this.createVerticalHelpers();
    const horizontalHelpers = this.createHorizontalHelpers();

    this.vectorPoints = this.vectorPoints.concat(verticalHelpers, horizontalHelpers);
    console.log(this.vectorPoints);
  }

  private createVerticalHelpers(): PathPoint[] {
    const vHelper: PathPoint[] = this.getVerticalHelperPoints();
    const middleVHelper: PathPoint[] = Transformer
      .makeTranslatedBy(vHelper, this.middleVerticalPoint);
    const backVHelper: PathPoint[] = Transformer
      .makeTranslatedBy(vHelper, this.backVerticalPoint);

      console.log(vHelper.concat(middleVHelper, backVHelper));
    return vHelper.concat(middleVHelper, backVHelper);
  }

  private createHorizontalHelpers(): PathPoint[] {
    const hHelper: PathPoint[] = this.getHorizontalHelperPoints();
    const hipsHelper: PathPoint[] = Transformer
      .makeTranslatedBy(hHelper, this.hipsHorizontalPoint);
    const bottomHelper: PathPoint[] = Transformer
      .makeTranslatedBy(hHelper, this.bottomPoint);

    return hHelper.concat(hipsHelper, bottomHelper);
  }


  get middleVerticalPoint(): Point {
    return {
      x: this.getBackSeamX() / 2,
      y: 0,
    };
  }

  get backVerticalPoint(): Point {
    return {
      x: this.getBackSeamX(),
      y: 0,
    };
  }

  get hipsHorizontalPoint() {
    return {
      x: 0,
      y: this.hipHeight
    };
  }

  get bottomPoint() {
    return {
      x: 0,
      y: this.totalHeight
    };
  }

  private createVerticalHelper(startingX: number, startingY: number): VectorObject {
    return {
      points: this.getVerticalHelperPoints(),
      isClosed: false,
      startingPoint: { x: startingX, y: startingY }
    };
  }

  private createHorizontalHelper(startingX: number, startingY: number): VectorObject {
    return {
      points: this.getHorizontalHelperPoints(),
      isClosed: false,
      startingPoint: { x: startingX, y: startingY }
    };
  }



  // @TODO add piece id and symetry purpose
  private getHorizontalHelperPoints() {
    const frontPoint = { y: 0, x: 0 };
    // hip height
    const sidePoint = { y: 0, x: this.getBackSeamX() / 2 };
    const backPoint = { y: 0, x: this.getBackSeamX() };

    const curveType = CurveType.LINE;
    const linePurpose = LinePurpose.HELPER;

    return [{
      point: frontPoint,
      curve: curveType,
      d: 'M ' + frontPoint.x + ' ' + frontPoint.y + ' l ' + (sidePoint.x - frontPoint.x) + ' 0 ',
      linePurpose: linePurpose
    },
    {
      point: sidePoint,
      curve: curveType,
      d: 'M ' + sidePoint.x + ' ' + sidePoint.y + ' l ' + (backPoint.x - sidePoint.x) + ' 0 ',
      linePurpose: linePurpose
    },
    {
      point: backPoint,
      curve: CurveType.NONE,
      d: 'M ' + backPoint.x + ' ' + backPoint.y + ' l ' + '0 0',
      linePurpose: linePurpose
    }];
  }

  private getVerticalHelperPoints() {
    const waistPoint = { x: 0, y: 0 };
    // hip height
    const hipHeightPoint = { x: 0, y: this.hipHeight };
    const bottomPoint = { x: 0, y: this.totalHeight };

    const curveType = CurveType.LINE;
    const linePurpose = LinePurpose.HELPER;

    return [{
      point: waistPoint,
      curve: curveType,
      d: 'M ' + waistPoint.x + ' ' + waistPoint.y + ' l ' + ' 0 ' + (hipHeightPoint.y - waistPoint.y),
      linePurpose: linePurpose
    },
    {
      point: hipHeightPoint,
      curve: curveType,
      d: 'M ' + hipHeightPoint.x + ' ' + hipHeightPoint.y + ' l ' + ' 0 ' + (bottomPoint.y - hipHeightPoint.y),
      linePurpose: linePurpose
    },
    {
      point: bottomPoint,
      curve: CurveType.NONE,
      d: 'M ' + bottomPoint.x + ' ' + bottomPoint.y + ' l ' + '0 0',
      linePurpose: linePurpose
    }];
  }
  private getBackSeamX() {
    return this.hips / 2 + 1;
  }

  private drawWaistFront() {

  }

  private drawWaistBack() {

  }

  private drawHips() {

  }

  private drawSidesAndBottomHem() {

  }

  private drawVectorObject(vectorObject: VectorObject) {

  }
}
