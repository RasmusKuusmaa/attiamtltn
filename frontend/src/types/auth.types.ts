export interface LoginResponse{
    token:string;
}

export interface ErrorResponse{
    message: string;
    timestamp?: string;
    status?: number;
    error?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}