export class Perfil{

    nome : string;
    sobrenome : string;
    email : string;
    telefone : string;

    setPerfil(obj : any){
        this.nome = obj.nome;
        this.sobrenome = obj.sobrenome;
        this.email = obj.email;
        this.telefone = obj.telefone;
    }
}