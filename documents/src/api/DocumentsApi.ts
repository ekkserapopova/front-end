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

export interface Applications {
  /** Application id */
  application_id?: number;
  /**
   * Date of application creation
   * @format date-time
   */
  date_of_application_creation?: string;
  /**
   * Date of application acceptance
   * @format date-time
   */
  date_of_application_acceptance?: string | null;
  /**
   * Date of application completion
   * @format date-time
   */
  date_of_application_completion?: string | null;
  /**
   * New surname
   * @minLength 1
   * @maxLength 50
   */
  new_surname: string;
  /**
   * Reason for change
   * @minLength 1
   */
  reason_for_change: string;
  /** Application status */
  application_status?: "created" | "in_progress" | "completed" | "canceled" | "deleted";
  /** Client id */
  client_id: number;
  /** Moderator id */
  moderator_id: number;
}

export interface Documents {
  /** Document id */
  document_id?: number;
  /**
   * Document title
   * @minLength 1
   * @maxLength 100
   */
  document_title: string;
  /**
   * Document name
   * @minLength 1
   * @maxLength 100
   */
  document_name: string;
  /** Document overview */
  document_overview?: string;
  /** Document description */
  document_description?: string;
  /**
   * Document image
   * @minLength 1
   * @maxLength 10000
   */
  document_image?: string;
  /** Document price */
  document_price: number;
  /** Document status */
  document_status: "active" | "deleted";
}

export interface User {
  /** ID */
  id?: number;
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
  /**
   * Последний вход
   * @format date-time
   */
  last_login?: string | null;
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
   * @maxLength 150
   */
  password: string;
  /**
   * Имя
   * @minLength 1
   * @maxLength 150
   */
  first_name: string;
  /**
   * Фамилия
   * @minLength 1
   * @maxLength 150
   */
  last_name: string;
  /**
   * Отчетсво
   * @minLength 1
   * @maxLength 150
   */
  otchestvo: string;
  /**
   * Паспортные данные(серия и номер)
   * @minLength 1
   * @maxLength 11
   */
  pasport: string;
  /** Активен ли пользователь? */
  is_active?: boolean;
  /** @uniqueItems true */
  groups?: number[];
  /** @uniqueItems true */
  user_permissions?: number[];
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
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000", withCredentials:true });
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
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Documents API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  applications = {
    /**
     * @description Возвращает список заявок
     *
     * @tags applications
     * @name ApplicationsList
     * @request GET:/applications/
     * @secure
     */
    applicationsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/applications/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Возвращает информацию об одной заявке
     *
     * @tags applications
     * @name ApplicationsRead
     * @request GET:/applications/{id}/
     * @secure
     */
    applicationsRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/applications/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Возвращает информацию об одной заявке
     *
     * @tags applications
     * @name ApplicationsUpdate
     * @request PUT:/applications/{id}/
     * @secure
     */
    applicationsUpdate: (id: string, data: Applications, params: RequestParams = {}) =>
      this.request<Applications, any>({
        path: `/applications/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает информацию об одной заявке
     *
     * @tags applications
     * @name ApplicationsDelete
     * @request DELETE:/applications/{id}/
     * @secure
     */
    applicationsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/applications/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Обновляет информацию о документе клиент
     *
     * @tags applications
     * @name ApplicationsPutClientUpdate
     * @request PUT:/applications/{id}/put/client/
     * @secure
     */
    applicationsPutClientUpdate: (id: string, data: Applications, params: RequestParams = {}) =>
      this.request<Applications, any>({
        path: `/applications/${id}/put/client/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет информацию о документе модератор
     *
     * @tags applications
     * @name ApplicationsPutModeratorUpdate
     * @request PUT:/applications/{id}/put/moderator/
     * @secure
     */
    applicationsPutModeratorUpdate: (id: string, data: Applications, params: RequestParams = {}) =>
      this.request<Applications, any>({
        path: `/applications/${id}/put/moderator/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  documents = {
    /**
     * @description Возвращает список активных документов
     *
     * @tags documents
     * @name DocumentsList
     * @request GET:/documents/
     * @secure
     */
    documentsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/documents/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Возвращает список активных документов
     *
     * @tags documents
     * @name DocumentsCreate
     * @request POST:/documents/
     * @secure
     */
    documentsCreate: (data: Documents, params: RequestParams = {}) =>
      this.request<Documents, any>({
        path: `/documents/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавляет новую заявку
     *
     * @tags documents
     * @name DocumentsApplicationCreate
     * @request POST:/documents/application/{id}/
     * @secure
     */
    documentsApplicationCreate: (id: string, data: Applications, params: RequestParams = {}) =>
      this.request<Applications, any>({
        path: `/documents/application/${id}/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags documents
     * @name DocumentsRead
     * @request GET:/documents/{id}/
     * @secure
     */
    documentsRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/documents/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags documents
     * @name DocumentsUpdate
     * @request PUT:/documents/{id}/
     * @secure
     */
    documentsUpdate: (id: string, data: Documents, params: RequestParams = {}) =>
      this.request<Documents, any>({
        path: `/documents/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags documents
     * @name DocumentsDelete
     * @request DELETE:/documents/{id}/
     * @secure
     */
    documentsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/documents/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  documentsApplicaions = {
    /**
     * No description
     *
     * @tags documents_applicaions
     * @name DocumentsApplicaionsDelete
     * @request DELETE:/documents_applicaions/{document_id}/{application_id}/
     * @secure
     */
    documentsApplicaionsDelete: (documentId: string, applicationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/documents_applicaions/${documentId}/${applicationId}/`,
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
     * @request POST:/login
     * @secure
     */
    loginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/login`,
        method: "POST",
        body: data,
        secure: true,
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
     * @request POST:/logout
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserList
     * @request GET:/user/
     * @secure
     */
    userList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Функция регистрации новых пользователей Если пользователя c указанным в request email ещё нет, в БД будет добавлен новый пользователь.
     *
     * @tags user
     * @name UserCreate
     * @request POST:/user/
     * @secure
     */
    userCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserRead
     * @request GET:/user/{id}/
     * @secure
     */
    userRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserUpdate
     * @request PUT:/user/{id}/
     * @secure
     */
    userUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserPartialUpdate
     * @request PATCH:/user/{id}/
     * @secure
     */
    userPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserDelete
     * @request DELETE:/user/{id}/
     * @secure
     */
    userDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
