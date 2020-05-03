export interface ResponsePosts {
    ok: boolean;
    pagina: number;
    posts: Post[];
  }

export interface Post {
imgs?: any[];
_id?: string;
mensaje?: string;
coords?: string;
usuario?: Usuario;
created?: string;
__v?: number;
}

export interface Usuario {
avatar?: string;
_id?: string;
nombre?: string;
email?: string;
__v?: number;
password: string;
}