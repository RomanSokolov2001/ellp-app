export class EventData {
    constructor(
      public id: string,
      public productUrl: string,
      public title: string,
      public imageUrl: any,
      public location: string[],
      public date: string,
      public description: any,
      public category: any,
      public discount?: string,
      public price?: string,
      public inStock?: boolean,
      public stock?: number
    ) {}
  }