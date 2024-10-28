export interface User {
    id: string;
    username: string;
    email: string;
}

export interface Game {
    id: string;
    name: string;
    creator: string;
}

export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => void;
}