import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { clock } from './reducer'

@NgModule({
    imports: [StoreModule.provideStore({ clock})]
})
export class AppStoreModule {
}