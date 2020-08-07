export interface CRUD {
    elementList: any[];
    currentElementIndex: number;

    entityQuery: object;
    addQuery: object;
    updateQuery: object;
    deleteQuery: object;

    selectElement(event: any): null;
    addElement(event: any): null;
    updateElement(event: any): null;
    deleteElement(event: any): null;
}