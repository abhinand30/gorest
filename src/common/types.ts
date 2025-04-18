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
        links:{previous: string | null;
            current:  string | null;
            next:     string | null;
        }|undefined};
    handlePageChange:(id: number) => void
}
interface searchProps{
    handleSearch:(text: string) => Promise<void>;
}
interface column<T>{
    id:number;
    selector?:string;
    title:string;
    cell?:(arg:T)=>ReactNode
}
interface tableProps{
        header:column<T>[];
    data: userType[]|undefined
}
interface axiosProps{
    url:string;
    method:string;
    body?:object| null;
    headers?:{Authorization:string}|null;
}

interface useAxiosTypes{
    response: {
        data: {
            meta: {   pagination:{
                total: number;
                pages: number;
                page:  number;
                limit: number;
                links:{previous: string;
                    current:  string;
                    next:     string;
                }}; };
            data: userType[];
        };
        status?: number;
    }|;
    
     callApi:(props: axiosProps) => Promise<void>;
     error:{status?: number}|;
     isLoading?:boolean;
}
interface addUserAxiosType{

}
export type{addUserAxiosType,axiosProps,useAxiosTypes,paginationTypes,userType,userDataType,paginationProps,PageButtonProps,pageNumberProps,searchProps,tableProps}