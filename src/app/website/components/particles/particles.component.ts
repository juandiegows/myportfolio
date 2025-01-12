import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
declare var particlesJS: any;

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.scss'],
  standalone: false,
})
export class ParticlesComponent implements OnInit {
  config: any = {};

  constructor(private readonly http: HttpClient, private readonly setting: SettingService) {}

  ngOnInit(): void {
    this.loadParticlesConfig();
    this.setting.color$.subscribe((color) => {
      this.updateParticleColors(color);
    });
  }

  private async loadParticlesConfig(): Promise<void> {
  
      const rootStyles = getComputedStyle(document.documentElement);
      let lineColor = rootStyles.getPropertyValue('--colorPrimary').trim();
      this.http.get<any>('assets/particles.json').subscribe({
        next: (config) => {
          this.config = config;
          this.updateParticleColors(lineColor);
          particlesJS('particles-js',   this.config);
        },
        error: (error) => {
          console.error('Error loading particles config:', error);
        },
      });

  }

 updateParticleColors(color: string): void {
    const hexColor = this.rgbToHex(color);
    if (this.isValidHex(hexColor)) {
      this.config.particles.line_linked.color = hexColor;
      this.config.particles.color.value = hexColor;
      particlesJS('particles-js', this.config);
    }
  }

  private rgbToHex(rgb: string): string {
    // Extraer los valores numéricos de la cadena `rgb`
    const rgbValues = rgb.match(/\d+/g);

    if (!rgbValues || rgbValues.length !== 3) {
      throw new Error('Formato RGB inválido');
    }

    // Convertir cada componente a hexadecimal
    const [r, g, b] = rgbValues.map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }

  private isValidHex(color: string): boolean {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color);
  }
}
