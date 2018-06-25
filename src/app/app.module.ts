import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTreeModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
} from '@angular/material';
import { HomePageComponent } from './home-page/home-page.component';
import { TagsComponent } from './tags/tags.component';
import { ModulesComponent } from './modules/modules.component';
import { CreateModulesComponent } from './modules/create-modules/create-modules.component';
import { ViewModulesComponent } from './modules/view-modules/view-modules.component';
import { CreateTagsComponent } from './tags/create-tags/create-tags.component';
import { ViewTagsComponent } from './tags/view-tags/view-tags.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { fakeBackendProvider } from './helpers/fakeBackendFactory';
import { LoginComponent } from './login/login.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'modules', component: ModulesComponent },
  { path: 'tags/create-tags', component: CreateTagsComponent },
  { path: 'tags/view-tags', component: ViewTagsComponent },
  { path: 'modules/create-modules', component: CreateModulesComponent },
  { path: 'modules/view-modules', component: ViewModulesComponent },
  { path: 'upload-video', component: UploadVideoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    HomePageComponent,
    TagsComponent,
    ModulesComponent,
    CreateModulesComponent,
    ViewModulesComponent,
    CreateTagsComponent,
    ViewTagsComponent,
    FileUploadComponent,
    LoginComponent,
    UploadVideoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatProgressBarModule, 
    MatProgressSpinnerModule,   
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
