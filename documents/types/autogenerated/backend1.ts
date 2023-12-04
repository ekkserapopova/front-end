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
