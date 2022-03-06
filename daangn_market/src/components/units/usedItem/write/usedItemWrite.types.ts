import { Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { IQuery } from "../../../../commons/types/generated/types";

export interface FormValues {
  name?: string;
  price?: number;
  remarks?: string;
  contents?: string;
}

export interface IProductWriteProps {
  isEdit: boolean;
  data: Pick<IQuery, "fetchUseditem">;
}

export interface IProductWriteUIProps {
  isEdit: boolean;
  data: Pick<IQuery, "fetchUseditem">;
  register: UseFormRegister<FieldValues>;
  formState: FormState<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onClickSubmit: (data: FormValues) => void;
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  tag: string;
  setTag: Dispatch<SetStateAction<string>>;
}

export interface IupdateVariables {
  updateUseditemInput: {
    name?: string;
    remarks?: string;
    price?: number;
    contents?: string;
    images?: string[];
    tags?: string[];
  };
  useditemId: string;
}
