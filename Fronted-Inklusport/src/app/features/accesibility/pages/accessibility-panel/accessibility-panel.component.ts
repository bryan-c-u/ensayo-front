import { Component, signal, computed } from '@angular/core';

export type ContrasteType = 'BAJO' | 'MEDIO' | 'ALTO';

@Component({
  selector: 'app-accessibility-panel',
  standalone: true,
  templateUrl: './accessibility-panel.component.html',
  styleUrls: ['./accessibility-panel.component.scss']
})
export class AccessibilityPanelComponent {
  contraste = signal<ContrasteType>('MEDIO');
  notifSonoras = signal<boolean>(false);
  feedbackHaptico = signal<boolean>(false);
  tamanoFuente = signal<number>(50);

  currentTheme = computed(() => {
    const c = this.contraste();
    if (c === 'ALTO') {
      return {
        bgGeneral: '#000000',
        bgTarjeta: '#121212',
        textoPrincipal: '#FFFFFF',
        textoSecundario: '#E0E0E0',
        bordeTarjeta: '1px solid #333333',
        boxShadow: 'none',
        bgPreviewBox: '#1F1F1F',
        bgTarjetaOpcion: '#1A1A1A',
        colorTextoPreviewMain: '#FFFFFF',
        colorTextoPreviewSub: '#CCCCCC'
      };
    } else if (c === 'BAJO') {
      return {
        bgGeneral: '#F9FAFB',
        bgTarjeta: '#FFFFFF',
        textoPrincipal: '#6B7280',
        textoSecundario: '#9CA3AF',
        bordeTarjeta: '1px solid #E5E7EB',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
        bgPreviewBox: '#F3F4F6',
        bgTarjetaOpcion: '#FFFFFF',
        colorTextoPreviewMain: '#1F2937',
        colorTextoPreviewSub: '#4B5563'
      };
    }
    return {
      bgGeneral: '#F9FAFB',
      bgTarjeta: '#FFFFFF',
      textoPrincipal: '#1F2937',
      textoSecundario: '#4B5563',
      bordeTarjeta: 'none',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
      bgPreviewBox: '#F3F4F6',
      bgTarjetaOpcion: '#FFFFFF',
      colorTextoPreviewMain: '#1F2937',
      colorTextoPreviewSub: '#4B5563'
    };
  });

  setContraste(val: ContrasteType) {
    this.contraste.set(val);
  }

  toggleNotifSonoras() {
    this.notifSonoras.update(v => !v);
  }

  handleToggleHaptico() {
    this.feedbackHaptico.update(v => !v);
    if (this.feedbackHaptico() && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  onTamanoFuenteChange(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    this.tamanoFuente.set(val);
  }

  handleGuardarCambios() {
    console.log({
      contraste: this.contraste(),
      notifSonoras: this.notifSonoras(),
      feedbackHaptico: this.feedbackHaptico(),
      tamanoFuente: this.tamanoFuente()
    });
    alert('¡Configuración guardada!');
  }
}