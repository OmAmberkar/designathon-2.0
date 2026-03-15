import type gsap from "gsap";

export interface TlCardHandle {
  animate: () => gsap.core.Timeline;
  element: HTMLDivElement | null;
}

export interface OrangeRectHandle {
  animate: () => gsap.core.Tween;
}

// Backend-Compatible Auth and PS Selection Types
export interface User {
  email: string;
  team_id: string;  // Using snake_case to match backend
  name: string;
}

export interface ProblemStatement {
  id: string;        // Using lowercase to match backend
  capacity: number;  // Using lowercase to match backend
  title?: string;
  description?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  assignedPS: ProblemStatement | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  setAssignedPS: (ps: ProblemStatement) => void;
}

export interface PSSelectionState {
  problemStatements: ProblemStatement[];
  selectedPS: ProblemStatement | null;
  isLoading: boolean;
  errorMessage: string;
  isAssigning: boolean;
}

// Backend API Request/Response Types
export interface AuthRequest {
  email: string;
  password: string;  // This is the encrypted Team ID
}

export interface AuthResponse {
  message: string;
  user: User;
  access_token: string;
}

export interface PSAssignRequest {
  team_id: string;
  problem_statement_id: string;
}

export interface PSAssignResponse {
  message: string;
  success: boolean;
}

export interface GetPSRequest {
  teamID: string;  // Using camelCase as this might be expected
}

export interface ApiError {
  detail: string;
}

// Space theme animation states
export type AnimationState = 'idle' | 'loading' | 'success' | 'error';
