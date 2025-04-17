import { ReactNode } from "react";

interface userDataType{
    name:string;
    email:string;
    gender:string;
    status:string;
}
interface userType{
    id:number;
    name:string;
    email:string;
    gender:string;
    status:string;
}
interface paginationTypes {
    total: number;
    pages: number;
    page:  number;
    limit: number;
    links: Links;
}

interface Links {
    previous: string|null;
    current:  string;
    next:     string|null;
}
interface paginationProps{
    pagination:paginationTypes;
    handlePageChange: (id: number) => void
}
interface PageButtonProps{
    onClick:() => void;
    disabled:boolean;
   children: ReactNode;
}
interface pageNumberProps{
    pagination:{
        total: number;
        pages: number;
        page:  number;
        limit: number;
        links:{previous: string|null;
            current:  string;
            next:     string|null;
        }};
    handlePageChange:(id: number) => void
}
interface searchProps{
    handleSearch:(text: string) => Promise<void>;
}
interface tableProps{
    header:{
        id: number;
        title: string;
        selector: string;
        }[],
    data: userType[]|undefined
}
export type{userType,userDataType,paginationProps,PageButtonProps,pageNumberProps,searchProps,tableProps}