import { Component, OnInit } from '@angular/core';
import { Location, LocationApi, MediaApi, Media } from '../shared/sdk';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  locationForm: FormGroup;
  isLoading = false;
  location: Location;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private locationApi: LocationApi,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const locationId = this.route.snapshot.paramMap.get('id');

    this.locationForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      description: this.formBuilder.control(''),
      lattitude: this.formBuilder.control(0),
      longitude: this.formBuilder.control(0),
      medias: this.formBuilder.array([])
    });

    if (locationId) {
      this.locationApi.findById(locationId, {include: ['medias']}).subscribe((location: Location) => {
        this.location = location;

        if (location.medias.length > 0) {
          this.location.medias.forEach(media => {
            this.insertMedia(media);
          });
        }

        this.locationForm.setValue(this.location);
      });
    }
  }

  submit() {
    if (this.locationForm.invalid) {
      this.snackBar.open('Champs requis manquants', null, {
        duration: 2000,
      });

      return;
    }

    this.isLoading = true;
    console.log(this.location)
    this.location = Object.assign(this.location, this.locationForm.value);
console.log(this.location)
    this.locationApi.replaceOrCreate(this.location).subscribe((location: Location) => {
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

  private insertMedia(media) {
    const mediaArray = this.locationForm.controls.medias as FormArray;

    mediaArray.insert(mediaArray.length, this.formBuilder.group({
      name: [media.name, Validators.required],
      url: [media.url, Validators.required],
    }));
  }

}
