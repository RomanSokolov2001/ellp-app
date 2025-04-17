export default class Category {
    id: number;
    parentId: number | null;
    name: string;
    description: string | null;

    constructor(category: { id: number; parentId: number | null; name: string; description: string | null }) {
        this.id = category.id;
        this.parentId = category.parentId;
        this.name = category.name;
        this.description = category.description;
    }
}