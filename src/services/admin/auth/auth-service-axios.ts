import { ApiResponse, CustomAxiosRequestConfig } from "./../../types";
import { Service } from "@/services/service";
import {
  CreateSessionDTO,
  IAuthService,
  RecoverPasswordDTO,
  SessionDTO,
  UserInfoDTO,
} from "./auth.type";
import { CallbackFns } from "@/services/types";
import { AxiosInstance } from "axios";

export class AuthServiceAxios extends Service implements IAuthService {
  private readonly instance: AxiosInstance;

  constructor(baseUrl: string, instance: AxiosInstance) {
    super(`${baseUrl}/auth`);
    this.instance = instance;
  }

  public async createSession(
    data: CreateSessionDTO,
    callbackFns?: CallbackFns<SessionDTO>
  ): Promise<SessionDTO> {
    const config: CustomAxiosRequestConfig = {
      skipAuthInterceptor: true,
    };
    try {
      const response = await this.instance.post<ApiResponse<SessionDTO>>(
        `${this.baseUrl}/token`,
        data,
        config
      );
      callbackFns?.onSuccess?.(response.data.data);
      return response.data.data;
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }

  public async refreshSession(
    refreshToken: string,
    callbackFns?: CallbackFns<SessionDTO>
  ): Promise<SessionDTO> {
    try {
      const config: CustomAxiosRequestConfig = {
        skipAuthInterceptor: true,
      };
      const response = await this.instance.post<ApiResponse<SessionDTO>>(
        `${this.baseUrl}/refresh-token`,
        { refreshToken },
        config
      );
      callbackFns?.onSuccess?.(response.data.data);
      return response.data.data;
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }

  public async sendRecoverPasswordEmail(
    email: string,
    callbackFns?: CallbackFns<void>
  ): Promise<void> {
    try {
      const config: CustomAxiosRequestConfig = {
        skipAuthInterceptor: true,
      };
      await this.instance.post<void>(
        `${this.baseUrl}/recover-password/send`,
        { email },
        config
      );
      callbackFns?.onSuccess?.();
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }

  public async recoverPassword(
    data: RecoverPasswordDTO,
    callbackFns?: CallbackFns<void>
  ): Promise<void> {
    try {
      const config: CustomAxiosRequestConfig = {
        skipAuthInterceptor: true,
      };
      await this.instance.post<void>(
        `${this.baseUrl}/recover-password`,
        data,
        config
      );
      callbackFns?.onSuccess?.();
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }

  public async validateRecoverPasswordToken(
    token: string,
    callbackFns?: CallbackFns<void>
  ): Promise<void> {
    try {
      const config: CustomAxiosRequestConfig = {
        skipAuthInterceptor: true,
      };
      await this.instance.get<void>(
        `${this.baseUrl}/recover-password/validate?token=${token}`,
        config
      );
      callbackFns?.onSuccess?.();
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }

  public async getUserInfo(
    callbackFns?: CallbackFns<UserInfoDTO>
  ): Promise<UserInfoDTO> {
    try {
      const response = await this.instance.get<ApiResponse<UserInfoDTO>>(
        `${this.baseUrl}/user-info`
      );
      callbackFns?.onSuccess?.(response.data.data);
      return response.data.data;
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }
}
