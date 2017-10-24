import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'pd-measurments-form',
  templateUrl: './measurments-form.component.html',
  styleUrls: ['./measurments-form.component.css']
})
export class MeasurmentsFormComponent implements OnInit {
  public measurments: FormGroup;
  public heightControl: AbstractControl;
  public waistControl: AbstractControl;
  public hipsControl: AbstractControl;

  constructor(
    private fb: FormBuilder
  ) {
    this.measurments = fb.group({
      height: [172, [Validators.required, Validators.max(200), Validators.min(50)]],
      waist: [64, [Validators.min(30), Validators.max(100)]],
      hips: [87, [Validators.min(50), Validators.max(150)]]
    });
    this.heightControl = this.measurments.controls['height'];
    this.waistControl = this.measurments.controls['waist'];
    this.hipsControl = this.measurments.controls['hips'];

  }

  ngOnInit() {
  }

}
