export interface User {
  id: number;
  nome: string;
  email: string;
  cargo?: string;
  role: string;
  status: boolean;
  createdAt?: string;
}

export interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  status: 'DRAFT' | 'PUBLISHED';
  autorId: number;
  categoriaId: number;
  resumo?: string;
  capaUrl?:string;
  publicadoEm?: string;
  createdAt?: string;
  autor?: User;
  categoria?: Categoria;
}

export interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
  ativo: boolean;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
}

export interface CreatePostRequest {
  titulo: string;
  conteudo: string;
  categoriaId: number;
  resumo?: string;
  status?: 'DRAFT' | 'PUBLISHED';
  capaUrl?: string;
}

export interface CreateCategoriaRequest {
  nome: string;
}

export interface UpdateUserRequest {
  nome?: string;
  email?: string;
  senha?: string;
}

export interface CreateUserRequest {
  nome: string;
  email: string;
  senha: string;
  cargo: string;
  role: 'ADMIN' | 'EDITOR' | 'AUTOR';
  ativo?: boolean;
}

export interface UpdateProfileRequest {
  nome?: string;
  cargo?: string;
}

export interface ChangePasswordRequest {
  novaSenha: string;
}
