export interface Categoria {
    IDcat: string
    Nome: string
    Info: string
    Img: string
}

export interface Prodotto {
    IDprod: string
    Nome: string
    Prezzo: number
    Sconto: number
    Img: string
    Kcal: number
    Categoria: string
}

export interface Ordine {
    IDordine: number
    NomeOrdinatario: string
    NomeProdotto: string
}

export interface Utente {
    ID: string
    Permesso: "admin" | "user"
    Username: string
    Psw: string
}