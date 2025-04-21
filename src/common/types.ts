import React, { ReactNode } from "react";

export interface UserData {
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface User extends UserData {
  id: number;
}
export interface Users extends UserData {
  id?: number|null;
}

export interface Pagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
  links: {
    previous: string | null;
    current: string;
    next: string | null;
  };
}

export interface PaginationProps {
  pagination: Pagination|undefined;
  handlePageChange: (page: number) => void;
}

export interface PageButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}

export interface PageNumberProps {
  pagination: Pagination;
  handlePageChange: (page: number) => void;
}

export interface SearchProps {
  handleSearch: (text: string) => Promise<void>;
}

export interface Column<T> {
  id: number;
  title: string;
  selector?: keyof T;
  cell?: (row: T) => ReactNode;
}

export interface TableProps {
  header: Column<T>[];
  data: T[] | undefined;
}

export interface AxiosProps {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body?: object | null;
  headers?: Record<string, string> | undefined;
}

export interface UseAxiosReturn {
  callApi: <T = any>(props: AxiosProps) => Promise<T>;
  isLoading: boolean;
}

export interface ApiResponse<T> {
  data: {
    data: T;
    meta?: {
      pagination?: Pagination;
    };
  };
  status: number;
}

export interface FormProps{
  formArray:{
    id: number;
    name: string;
    type: string;
    categories?: string[];
  }[]|null;
  formData: UserData;
  setFormData:React.Dispatch<React.SetStateAction<Users>>
  onClick:() => Promise<void>;
  isLoading:boolean;
  isEdit?:boolean;
  handleModal?:() => void;
} 

export interface ModalProps{
  handleModal?:() => void;
  children:ReactNode
}
