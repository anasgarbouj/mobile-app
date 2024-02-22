export interface IResponse<T> {
    data?: T[] | T,
    info: string
}

export interface PResponse<T> {
    count: number,
    data?: T[] | T,
    info: string,
    next?: string,
    previous?: string
}