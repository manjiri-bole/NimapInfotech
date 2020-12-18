import { Component } from '@angular/core';
import { TranslationService } from './shared/services/translation.service';
import { locale as selectedLanguage } from './../assets/i18n/en';
// import { locale as selectedLanguage } from './../assets/i18n/hi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private translationService: TranslationService
  ) {
   
    this.translationService.loadTranslations(selectedLanguage);

  }

  title = 'MedRevo';
}
