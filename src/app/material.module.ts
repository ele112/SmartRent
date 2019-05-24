import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        MatToolbarModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatFormFieldModule,
        MatStepperModule,
        MatButtonModule,
        MatRadioModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatFormFieldModule,
        MatStepperModule,
        MatButtonModule,
        MatRadioModule,
        MatProgressSpinnerModule
    ],
    providers: [ MatDatepickerModule ],
})

export class MaterialModule { }