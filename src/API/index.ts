/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */

import axios, { AxiosError } from "axios";
import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

export const baseUrl = "https://bahg-back.icrcompany.net/api/v1/";
export const fileURL = "https://bahg-back.icrcompany.net/storage/";



export const useFetch = <T>(url: string, key: string, enabled?: boolean) => {
  const [cookies] = useCookies(["token"], { doNotParse: true });
  const navigate = useNavigate();

  const [isEnabled, setIsEnabled] = useState(enabled);

  useEffect(() => {
    if (enabled === undefined) setIsEnabled(true);
  }, []);

  const fetchData = async (): Promise<T> => {
    const response = await axios.get<T>(`${baseUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  };

  const query = useQuery<T, AxiosError>(key, fetchData, {
    enabled: isEnabled,
    onError: (error) => {
      const err = error as AxiosError;
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/login");
      }
    },
  });

  return { query, setIsEnabled, isEnabled };
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface InputFile {
  name: string;
  value: string;
  type: string;
}

export type FilesState = Record<string, File>;
type ObjectState = Record<string, {}>;

type CheckedArray = Record<string, string[]>;

type SelectedOption = {
  value: string;
  label: string;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const usePOST = <FormDataType extends Record<string, any>>(
  initialData: FormDataType,
  actionSuccess: (data: any | undefined) => void,
  actionError: (error: any | undefined) => void
) => {
  const [cookies] = useCookies(["token"], {
    doNotParse: true,
  });
  const [formData, setFormData] = useState<FormDataType>(initialData);
  const [images, setImages] = useState<FilesState>({});
  const [viewfile, setViewFile] = useState<string>();
  const [viewFiles, setViewFiles] = useState<InputFile[]>([]);
  const [checkedArray, setCheckedArray] = useState<CheckedArray>({});

  const prepareFormData = useCallback(() => {
    const formDataToSend = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value as string | Blob);
    }

    if (checkedArray) {
      for (const [key, value] of Object.entries(checkedArray)) {
        for (let i = 0; i < value.length; i++) {
          formDataToSend.append(key, value[i]);
        }
      }
    }

    if (images) {
      for (const [key, value] of Object.entries(images)) {
        formDataToSend.append(`images[${key}]`, value);
      }
    }

    return formDataToSend;
  }, [formData, checkedArray, images]);

  const mutation = useMutation(
    async (url: string) => {
      const formDataToSend = prepareFormData();
      const res = await axios.post(`${baseUrl}${url}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
        },
      });
      return res;
    },

    {
      onSuccess: (data) => {
        actionSuccess(data);
      },
      onError: (error) => {
        actionError(error);
      },
    }
  );

  const handleSubmit = (url: string) => {
    mutation.mutate(url);
  };

  const handleChangeSelect = (
    selected: SelectedOption | SelectedOption[],
    active: { name: string }
  ) => {
    setFormData((prev) => ({
      ...prev,
      ["option_" + active.name]: selected,
      [active.name]: Array.isArray(selected)
        ? selected.map((e) => e.value)
        : selected.value,
    }));
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files, checked } = event.target;
    let currentValue: string | File | boolean | undefined;

    if (type === "file") {
      let file = (currentValue = files ? files[0] : undefined);
      const showfile = URL.createObjectURL(file as Blob | MediaSource);
      setViewFile(showfile);
      event.target.value = "";
    } else if (type === "checkbox") {
      currentValue = checked;
    } else {
      currentValue = value;
    }
    setFormData((prev) => ({ ...prev, [name]: currentValue }));
  };

  const handleChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeArrayFiles = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    const newFilesObject: FilesState = {};

    if (files) {
      const currentImagesCount = Object.keys(images).length;
      for (let i = 0; i < files.length; i++) {
        newFilesObject[`${currentImagesCount + i}`] = files[i];
      }

      setImages((prevImages) => ({
        ...prevImages,
        ...newFilesObject,
      }));

      const urlImages: InputFile[] = [];
      for (let i = 0; i < files.length; i++) {
        if (!files[i]) continue;
        urlImages.push({
          name: files[i].name,
          value: URL.createObjectURL(files[i]),
          type: files[i].type,
        });
      }

      setViewFiles((prev) => [...prev, ...urlImages]);

      event.target.value = "";
    }
  };

  const handleCheckedArray = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked, name } = e.target;
    if (checked) {
      setCheckedArray((prev) => ({
        ...prev,
        [name]: prev[name] ? [...prev[name], value] : [value],
      }));
    } else {
      setCheckedArray((prev) => ({
        ...prev,
        [name]: prev[name].filter((p) => p !== value),
      }));
    }
  };

  return {
    handleSubmit,
    formData,
    setFormData,
    handleChangeInput,
    handleChangeTextArea,
    handleChangeArrayFiles,
    images,
    viewFiles,
    viewfile,
    setImages,
    handleCheckedArray,
    handleChangeSelect,
    mutation,
    setViewFile,
  };
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const useDelete = (
  actionSuccess: () => void,
  actionError: () => void
) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"], {
    doNotParse: true,
  });
  const mutation = useMutation(
    (url: string) =>
      axios
        .delete(baseUrl + url, {
          headers: {
            Authorization: "Bearer " + cookies.token,
            Accept: "application/json",
          },
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        actionSuccess();
      },
      onError: (error) => {
        actionError();
      },
    }
  );

  const deleteItem = (url: string) => {
    mutation.mutate(url);
  };

  return { deleteItem, mutation };
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useFilter = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);

  const handleParamsClick = (
    name: string,
    value: string | string[] | number
  ) => {
    if (Array.isArray(value)) {
      if (value.length > 0) searchParams.set(name, value.join(","));
      else searchParams.delete(name);
    } else if (value) {
      searchParams.set(name, value.toString());
    }
    const newUrl = `${pathname}?${searchParams.toString()}`;
    navigate(newUrl);
  };

  const handleParamDelete = (name: string) => {
    searchParams.delete(name);
    const newUrl = `${pathname}?${searchParams.toString()}`;
    navigate(newUrl);
  };

  const handleParamsDeleteAll = () => {
    const newUrl = `${pathname}`;
    navigate(newUrl);
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    handleParamsClick("page", selectedItem.selected + 1);
  };

  return {
    searchParams,
    handlePageClick,
    handleParamsClick,
    handleParamDelete,
    handleParamsDeleteAll,
  };
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const logoutRequest = async (url: string, token: string): Promise<void> => {
  await axios.post(
    `${baseUrl}${url}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useLogout = (actionError: () => void) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"], {
    doNotParse: true,
  });

  const mutation = useMutation<void, Error, string>({
    mutationFn: (url) => logoutRequest(url, cookies.token),
    onSuccess: () => {
      removeCookie("token");
      window.location.reload();
    },
    onError: (error) => {
      actionError();
    },
  });

  return mutation;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface UseCloseReturnType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mouse: React.RefObject<HTMLDivElement>;
}

export const useClose = (): UseCloseReturnType => {
  const [open, setOpen] = useState<boolean>(false);
  const mouse = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (mouse.current && !mouse.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return { open, setOpen, mouse };
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RequireAuth: React.FC<{
  children: ReactElement<any, any> | null;
}> = ({ children }) => {
  const [cookies] = useCookies(["token"], { doNotParse: true });
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate("/auth/login");
    }
  }, [cookies.token, navigate]);

  return children;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const clickZoomInImage = (event: React.MouseEvent<HTMLImageElement>) => {
  event.preventDefault();
  const target = event.target as HTMLImageElement;
  if (target.requestFullscreen) {
    target.requestFullscreen();
  }
};
