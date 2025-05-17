import { GlobalError } from "react-hook-form/dist/types";

export type ObjectRecursiveOf<T> = { [key: string]: ObjectRecursiveOf<T> | T };

export type ErrorsHookForm = Record<string, GlobalError> & GlobalError;

export type ErrorHookForm = GlobalError;
