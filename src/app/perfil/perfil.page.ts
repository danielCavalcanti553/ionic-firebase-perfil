import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Perfil } from 'src/model/perfil';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  formGroup : FormGroup;
  idUser : string;
  perfil : Perfil = new Perfil();
  imagem : any; // <---

  constructor(private formBuild : FormBuilder,
    private auth :  AngularFireAuth,
    private db: AngularFirestore,
    public fireStorage : AngularFireStorage,
    private loadingController : LoadingController) {  // <---

    this.formGroup = this.formBuild.group({
      nome : ['',Validators.required],
      sobrenome : ['',Validators.required],
      telefone : ['',Validators.required],
      email : ['',Validators.required]
    });
    
    this.auth.user.subscribe(resp =>{
      this.idUser = resp.uid;
      this.loadPerfil();
      this.downloadImage();
    });
  }

  ngOnInit() {
   
  }

  loadPerfil(){
    this.db.collection("perfil") // Seleciona a coleção cliente
    .doc(this.idUser).get().subscribe(response=>{ // .doc seleciona o cliente com base no id
   
      if(response.exists==false){
        this.nPerfil();
      }else{
        this.perfil.setPerfil(response.data());
      }
    })
  }

  nPerfil(){
    let json = {
      nome : "",
      sobrenome : "",
      telefone : "",
      email : ""
    }
    this.db.collection('perfil').doc(this.idUser).set(json).then(() =>{})
  }

  atualizar(){

    this.db.collection('perfil') 
      .doc(this.idUser) 
        .set(this.formGroup.value) 
          .then(() =>{
            console.log('Atualizado com sucesso')
          }).catch(()=>{
            console.log('Erro ao Atualizar'); 
          })
  }

  enviaArquivo(event){
    // Pega o arquivo 
    this.imagem = event.srcElement.files[0];
    this.uploadStorage();
  }

  async uploadStorage(){

    let loading = await this.loadingController.create({
      message: 'Carregando!',
      duration: 2000
    });

    await loading.present();
    
    let urlImage = this.fireStorage.storage.ref().child(`perfil/${this.idUser}.jpg`);
      urlImage.put(this.imagem).then(resp => {
        this.downloadImage();
        loading.onDidDismiss();
    });
    
  }

  async downloadImage(){

    let loading = await this.loadingController.create({
      message: 'Carregando!',
      duration: 2000
    });

    await loading.present();

    let ref = this.fireStorage.storage.ref().child(`perfil/${this.idUser}.jpg`);
    ref.getDownloadURL().then(url=> {
        this.imagem = url;
        loading.onDidDismiss();
    });
  
  }

  



}
