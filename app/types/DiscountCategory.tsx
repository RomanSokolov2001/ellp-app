export default class DiscountCategory {
    id: number;
    name: string;

    constructor(category: { id: number; name: string;}) {
        this.id = category.id;
        this.name = category.name;
    }
}