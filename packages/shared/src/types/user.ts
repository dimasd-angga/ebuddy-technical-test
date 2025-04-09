export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface BaseUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  createdAt?: FirestoreTimestamp | Date;
  updatedAt?: FirestoreTimestamp | Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  usersList: User[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
  loading: boolean;
  error: string | null;
}
