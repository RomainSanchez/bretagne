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
  location: Location = new Location();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private locationApi: LocationApi,
    private mediaApi: MediaApi,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const locationId = this.route.snapshot.paramMap.get('id');

    this.locationForm = this.formBuilder.group({
      id: this.formBuilder.control(''),
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
    this.location = Object.assign(this.location, this.locationForm.value);

    this.locationApi.replaceOrCreate(this.location).subscribe((location: Location) => {
      this.location = location;
      const medias = this.locationForm.value.medias;

      if (medias.length < 1) {
        this.isLoading = false;

        return;
      }

      medias.forEach((media: Media, index: number) => {
        media.location_id = location.id;

        this.mediaApi.replaceOrCreate(media).subscribe(() => {
          if (index === medias.length - 1) {
            this.isLoading = false;

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
      id: [null],
      location_id: [''],
      name: ['', Validators.required],
      url: ['', Validators.required],
    }));
  }

  removeMedia(index): void {
    const mediaArray = this.locationForm.controls.medias as FormArray;
    const media = mediaArray.value[index];

    this.mediaApi.deleteById(media.id).subscribe(() => {
      mediaArray.removeAt(index);

      this.snackBar.open('Média supprimé', null, {
        duration: 1300,
      });
    });
  }

  private insertMedia(media) {
    delete media.file;
    const mediaArray = this.locationForm.controls.medias as FormArray;

    mediaArray.insert(mediaArray.length, this.formBuilder.group({
      id: [media.id],
      location_id: [media.location_id],
      name: [media.name, Validators.required],
      url: [media.url, Validators.required],
    }));
  }

}
