/* tslint:disable */
import {
  Media
} from '../index';

declare var Object: any;
export interface LocationInterface {
  "lattitude": string;
  "longitude": string;
  "name": string;
  "decription"?: string;
  "id"?: number;
  medias?: Media[];
}

export class Location implements LocationInterface {
  "lattitude": string;
  "longitude": string;
  "name": string;
  "decription": string;
  "id": number;
  medias: Media[];
  constructor(data?: LocationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Location`.
   */
  public static getModelName() {
    return "Location";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Location for dynamic purposes.
  **/
  public static factory(data: LocationInterface): Location{
    return new Location(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Location',
      plural: 'Locations',
      path: 'Locations',
      idName: 'id',
      properties: {
        "lattitude": {
          name: 'lattitude',
          type: 'string'
        },
        "longitude": {
          name: 'longitude',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "decription": {
          name: 'decription',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        medias: {
          name: 'medias',
          type: 'Media[]',
          model: 'Media',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'location_id'
        },
      }
    }
  }
}
