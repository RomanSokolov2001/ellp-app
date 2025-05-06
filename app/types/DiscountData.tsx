import DiscountCategory from "./DiscountCategory";

export class DiscountData {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public imageUrl: string,
      public location: string[],
      public discount: string,
      public industry: DiscountCategory,
    ) {}
  }