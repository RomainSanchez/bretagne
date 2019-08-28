import { Component, OnInit, Input } from '@angular/core';
import { Location, LocationApi, MediaApi, Media } from '../shared/sdk';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  locationForm: FormGroup;
  isLoading = false;

  @Input() location: Location;

  constructor(
    private formBuilder: FormBuilder,
    private locationApi: LocationApi,
    private mediaApi: MediaApi,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (this.location === undefined) {
      this.location = new Location();
    }

    this.locationForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      description: this.formBuilder.control(''),
      lattitude: this.formBuilder.control(0),
      longitude: this.formBuilder.control(0),
      medias: this.formBuilder.array([])
    });
  }

  submit() {
    if (this.locationForm.invalid) {
      this.snackBar.open('Champs requis manquants', null, {
        duration: 2000,
      });

      return;
    }

    this.isLoading = true;

    this.locationApi.create(this.locationForm.value).subscribe((location: Location) => {
      const medias = this.locationForm.value.medias;

      if (medias.length < 1) {
        this.isLoading = false;

        return;
      }

      medias.forEach((media: Media, index: number) => {
        this.locationApi.createMedias(location.id, media).subscribe(() => {
          if (index === medias.length - 1) {
            this.isLoading = false;
            this.locationForm.reset();

            this.snackBar.open('Lieu enregistré', null, {
              duration: 2000,
            });
          }
        });
      });
    });
  }

  addMedia(): void {
    const mediaArray = this.locationForm.controls.medias as FormArray;

    mediaArray.insert(mediaArray.length, this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
    }));
  }

  removeMedia(index): void {
    const mediaArray = this.locationForm.controls.medias as FormArray;

    mediaArray.removeAt(index);
  }

}
