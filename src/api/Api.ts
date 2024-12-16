/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  /** ID */
  pk?: number;
  /**
   * Email адрес
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 255
   */
  password: string;
  /**
   * First name
   * @maxLength 100
   */
  first_name?: string | null;
  /**
   * Last name
   * @maxLength 100
   */
  last_name?: string | null;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

export interface Reconstruction {
  /** ID */
  pk?: number;
  /** Status */
  status?: "draft" | "deleted" | "created" | "completed" | "rejected";
  /**
   * Creation date
   * @format date-time
   */
  creation_date?: string;
  /**
   * Apply date
   * @format date-time
   */
  apply_date?: string | null;
  /**
   * End date
   * @format date-time
   */
  end_date?: string | null;
  /**
   * Creator
   * @format email
   * @minLength 1
   */
  creator?: string;
  /** Moderator */
  moderator?: string;
  /**
   * Place
   * @maxLength 100
   */
  place?: string | null;
  /** Fundraising */
  fundraising?: number | null;
}

export interface Work {
  /** ID */
  pk?: number;
  /**
   * Title
   * @minLength 1
   * @maxLength 100
   */
  title: string;
  /**
   * Description
   * @minLength 1
   */
  description?: string;
  /**
   * Price
   * @min -2147483648
   * @max 2147483647
   */
  price?: number;
  /**
   * Imageurl
   * @format uri
   * @maxLength 200
   */
  imageurl?: string | null;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags api
     * @name ApiUserList
     * @request GET:/api/user/
     * @secure
     */
    apiUserList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/api/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Функция регистрации новых пользователей Если пользователя c указанным в request email ещё нет, в БД будет добавлен новый пользователь.
     *
     * @tags api
     * @name ApiUserCreate
     * @summary Регистрация
     * @request POST:/api/user/
     * @secure
     */
    apiUserCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Метод для получения данных о пользователе по его ID.
     *
     * @tags api
     * @name ApiUserRead
     * @summary Получение данных пользователя
     * @request GET:/api/user/{id}/
     * @secure
     */
    apiUserRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Функция обновления данных существующего пользователя. Обновляет информацию пользователя по ID, переданному в URL.
     *
     * @tags api
     * @name ApiUserUpdate
     * @summary Обновление данных пользователя
     * @request PUT:/api/user/{id}/
     * @secure
     */
    apiUserUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags api
     * @name ApiUserPartialUpdate
     * @request PATCH:/api/user/{id}/
     * @secure
     */
    apiUserPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags api
     * @name ApiUserDelete
     * @request DELETE:/api/user/{id}/
     * @secure
     */
    apiUserDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @summary Аутентификация
     * @request POST:/login/
     * @secure
     */
    loginCreate: (
      data: {
        email: string;
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          pk: any;
          email: string;
          password: string;
        },
        any
      >({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags logout
     * @name LogoutCreate
     * @summary Деавторизация
     * @request POST:/logout/
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  reconstruction = {
    /**
     * No description
     *
     * @tags reconstruction
     * @name ReconstructionDraftCreate
     * @summary Добавление в заявку-черновик
     * @request POST:/reconstruction/draft/
     * @secure
     */
    reconstructionDraftCreate: (
      data: {
        /** ID работы */
        work_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/reconstruction/draft/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  reconstructions = {
    /**
     * No description
     *
     * @tags reconstructions
     * @name ReconstructionsList
     * @summary Список реконструкций
     * @request GET:/reconstructions/
     * @secure
     */
    reconstructionsList: (
      query?: {
        status?: string;
        apply_date?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          reconstructions?: {
            pk?: number;
            status?: string;
            creation_date?: string;
            apply_date?: string;
            end_date?: string;
            creator?: string;
            moderator?: number;
            place?: string;
            fundraising?: number;
          }[];
        },
        any
      >({
        path: `/reconstructions/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reconstructions
     * @name ReconstructionsRead
     * @summary Одна реконструкция
     * @request GET:/reconstructions/{id}/
     * @secure
     */
    reconstructionsRead: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          reconstruction?: {
            pk?: number;
            status?: string;
            creation_date?: string;
            apply_date?: string;
            end_date?: string;
            creator?: string;
            moderator?: number;
            place?: string;
            fundraising?: number;
          };
          works?: {
            pk?: number;
            title?: string;
            description?: string;
            price?: number;
            imageurl?: string;
          }[];
        },
        any
      >({
        path: `/reconstructions/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reconstructions
     * @name ReconstructionsUpdate
     * @summary Изменение деталей заявки на реконструкцию
     * @request PUT:/reconstructions/{id}/
     * @secure
     */
    reconstructionsUpdate: (id: string, data: Reconstruction, params: RequestParams = {}) =>
      this.request<Reconstruction, any>({
        path: `/reconstructions/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reconstructions
     * @name ReconstructionsDelete
     * @summary Удаление заявки на реконструкцию
     * @request DELETE:/reconstructions/{id}/
     * @secure
     */
    reconstructionsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/reconstructions/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags reconstructions
     * @name ReconstructionsCreateUpdate
     * @summary Формирование заявки создателем
     * @request PUT:/reconstructions/{id}/create/
     * @secure
     */
    reconstructionsCreateUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/reconstructions/${id}/create/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags reconstructions
     * @name ReconstructionsFinishUpdate
     * @summary Завершить/отклонить модератором
     * @request PUT:/reconstructions/{id}/finish/
     * @secure
     */
    reconstructionsFinishUpdate: (
      id: string,
      data: {
        status: "completed" | "rejected";
      },
      params: RequestParams = {},
    ) =>
      this.request<Reconstruction, void>({
        path: `/reconstructions/${id}/finish/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags reconstructions
     * @name ReconstructionsSpaceUpdate
     * @summary Изменить объем работы в заявке на реконструкцию
     * @request PUT:/reconstructions/{reconstruction_id}/space/{work_id}/
     * @secure
     */
    reconstructionsSpaceUpdate: (
      reconstructionId: string,
      workId: string,
      query?: {
        /** Объем работы */
        space?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/reconstructions/${reconstructionId}/space/${workId}/`,
        method: "PUT",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags reconstructions
     * @name ReconstructionsSpaceDelete
     * @summary Удалить работу из заявки
     * @request DELETE:/reconstructions/{reconstruction_id}/space/{work_id}/
     * @secure
     */
    reconstructionsSpaceDelete: (reconstructionId: string, workId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/reconstructions/${reconstructionId}/space/${workId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  works = {
    /**
     * No description
     *
     * @tags works
     * @name WorksList
     * @summary Список реконструкционных работ
     * @request GET:/works/
     * @secure
     */
    worksList: (
      query?: {
        /** Вид работы */
        work_title?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          works?: {
            pk?: number;
            title?: string;
            description?: string;
            price?: number;
            imageurl?: string;
          }[];
          draft_reconstruction_id?: number;
          count_of_works?: number;
        },
        any
      >({
        path: `/works/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags works
     * @name WorksCreate
     * @summary Добавление работы
     * @request POST:/works/
     * @secure
     */
    worksCreate: (data: Work, params: RequestParams = {}) =>
      this.request<Work, any>({
        path: `/works/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags works
     * @name WorksRead
     * @summary Одна работа
     * @request GET:/works/{id}/
     * @secure
     */
    worksRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/works/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags works
     * @name WorksChangeUpdate
     * @summary Изменение работы
     * @request PUT:/works/{id}/change/
     * @secure
     */
    worksChangeUpdate: (id: string, data: Work, params: RequestParams = {}) =>
      this.request<Work, any>({
        path: `/works/${id}/change/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags works
     * @name WorksDeleteDelete
     * @summary Удаление работы
     * @request DELETE:/works/{id}/delete/
     * @secure
     */
    worksDeleteDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/works/${id}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags works
     * @name WorksImageCreate
     * @summary Добавление изображения
     * @request POST:/works/{id}/image/
     * @secure
     */
    worksImageCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/works/${id}/image/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
}
