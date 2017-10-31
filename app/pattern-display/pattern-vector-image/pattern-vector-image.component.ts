import { Component, OnInit, Input } from '@angular/core';
import { Point, VectorPoint, LinePurpose, CurveType, VectorObject } from './vector-point';
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
  vectorPoints: VectorPoint[];

  @Input()
  position: Point;

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
  }

  private refresh() {
    this.flushVectors();

    this.skirtLength = this.height / 4;
    this.hipHeight = (this.hips / 5) - 1;
    this.totalHeight = this.skirtLength + this.hipHeight;

    this.createHelpers();
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



  private getHorizontalHelperPoints(): VectorPoint[] {
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
      curve: curveType,
      d: 'M ' + backPoint.x + ' ' + backPoint.y + ' l ' + '0 0',
      linePurpose: linePurpose
    }];
  }

  private getVerticalHelperPoints(): VectorPoint[] {
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
      curve: curveType,
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
