import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { IonicModule } from '@ionic/angular';
import { DomSanitizerPipe } from '../pipes/dom-sanitizer.pipe';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapsComponent } from './maps/maps.component';



@NgModule({
  declarations: [PostsComponent, PostComponent, AvatarSelectorComponent, MapsComponent],
  exports:[
    PostsComponent,
    AvatarSelectorComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
