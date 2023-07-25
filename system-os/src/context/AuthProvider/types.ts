export interface IUser{
    id?: string
    name?: string
    email?: string
    cpf?: string
}

export interface IContext extends IUser{
    authenticate: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, name: string, cpf: string) => Promise<void>
}

export interface IAuthProvider{
    children: JSX.Element;
}