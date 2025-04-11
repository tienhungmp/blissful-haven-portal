
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthTokens, LoginCredentials, RegisterCredentials, AuthState, UserRole } from '@/types/auth';
import { post } from '@/lib/api';
import { toast } from 'sonner';

// Initial authentication state
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; tokens: AuthTokens } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create auth context
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing tokens on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedTokens = localStorage.getItem('auth_tokens');
      const storedUser = localStorage.getItem('auth_user');
      
      if (storedTokens && storedUser) {
        try {
          const tokens = JSON.parse(storedTokens) as AuthTokens;
          const user = JSON.parse(storedUser) as User;
          
          // Here you could add token validation or refresh logic
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user, tokens },
          });
        } catch (error) {
          console.error('Failed to parse stored auth data:', error);
          localStorage.removeItem('auth_tokens');
          localStorage.removeItem('auth_user');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await post<{ user: User; tokens: AuthTokens }>('/auth/login', credentials);
      
      if (response.success && response.data) {
        const { user, tokens } = response.data;
        
        // Store tokens and user in localStorage
        localStorage.setItem('auth_tokens', JSON.stringify(tokens));
        localStorage.setItem('auth_user', JSON.stringify(user));
        
        // Update auth state
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, tokens },
        });
        
        toast.success('Đăng nhập thành công');
        return;
      }
      
      throw new Error(response.error || 'Đăng nhập thất bại');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng nhập thất bại';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    }
  };

  // Register function
  const register = async (credentials: RegisterCredentials) => {
    dispatch({ type: 'AUTH_START' });
    try {
      // Validate password match
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Mật khẩu không khớp');
      }
      
      const response = await post<{ user: User; tokens: AuthTokens }>('/auth/register', credentials);
      
      if (response.success && response.data) {
        const { user, tokens } = response.data;
        
        // Store tokens and user in localStorage
        localStorage.setItem('auth_tokens', JSON.stringify(tokens));
        localStorage.setItem('auth_user', JSON.stringify(user));
        
        // Update auth state
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, tokens },
        });
        
        toast.success('Đăng ký thành công');
        return;
      }
      
      throw new Error(response.error || 'Đăng ký thất bại');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng ký thất bại';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_tokens');
    localStorage.removeItem('auth_user');
    dispatch({ type: 'LOGOUT' });
    toast.success('Đã đăng xuất thành công');
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Check if user has required role
  const checkRole = (roles: UserRole[]): boolean => {
    if (!state.user) return false;
    return roles.includes(state.user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
        checkRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
