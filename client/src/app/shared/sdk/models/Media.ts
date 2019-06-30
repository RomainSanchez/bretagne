/* tslint:disable */

declare var Object: any;
export interface MediaInterface {
  "url"?: string;
  "name": string;
  "file"?: any;
  "id"?: number;
  "location_id"?: number;
}

export class Media implements MediaInterface {
  "url": string;
  "name": string;
  "file": any;
  "id": number;
  "location_id": number;
  constructor(data?: MediaInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Media`.
   */
  public static getModelName() {
    return "Media";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Media for dynamic purposes.
  **/
  public static factory(data: MediaInterface): Media{
    return new Media(data);
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
      name: 'Media',
      plural: 'media',
      path: 'media',
      idName: 'id',
      properties: {
        "url": {
          name: 'url',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "file": {
          name: 'file',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "location_id": {
          name: 'location_id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
