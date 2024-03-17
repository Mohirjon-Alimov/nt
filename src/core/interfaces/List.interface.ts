export interface ListMetadata {
    count?: number;
    pages?: number;
    currentPage?: number;
}
export interface ListInterface<T> {
    items: Array<T>;
    meta: ListMetadata;
}
