export interface CRUD {
    elementList: any[];
    currentElementIndex: number;

    entityQuery: object;
    addQuery: object;
    updateQuery: object;
    deleteQuery: object;

    selectElement(event: any): void;
    addElement(event: any): void;
    updateElement(event: any): void;
    deleteElement(event: any): void;
}