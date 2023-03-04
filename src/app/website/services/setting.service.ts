import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SettingService {


  lang: Lang = Lang.es;
  private _lang = new BehaviorSubject<Lang>(this.lang);
  lang$ = this._lang.asObservable();

  setLang(lang: Lang) {
    this.GetLangText(lang).subscribe(data => {
      this.data = data;
      this.lang = lang;
      this._lang.next(lang);
    });

  }


  mode: Mode = Mode.dark;
  private _mode = new BehaviorSubject<Mode>(this.mode);
  mode$ = this._mode.asObservable();

  setMode(mode: Mode) {
    this.mode = mode;
    this._mode.next(mode);
  }

  data: any = {
    "navigation": {
      "home": "Inicio ",
      "about_me": "Sobre mi",
      "services": "Servicios",
      "skills": "Habilidades",
      "projects": "Proyectos",
      "blog": "Blog",
      "contact_me": "Contáctame"
    },
    "introduction": {
      "hello": "Hola, Mi nombre es",
      "Iam": "Soy",
      "roles": ["Desarrollador web",
        "Desarrollador móvil",
        "Desarrollador full stack",
        "Desarrollador backend",
        "Analista de datos",
        "Desarrollador Vue.js",
        "Desarrollador Angular",
        "Desarrollador .NET",
        "Diseñador UX/UI"
      ],
      "achievements": "Logros destacados",
      "achievements1": "Campeón de worldskills colombia",
      "achievements2": "Campeón de worldskills chile",
      "achievements3": "SubCampeón de worldskills American",
      "achievements4": "Medalla de excelencia worldskils special edition"
    },
    "about_me": {
      "title": "Sobre mi",
      "info": "<p>Soy Juan Diego, un apasionado desarrollador de software especializado en desarrollo web y móvil.</p><p>Representé a Colombia en la competencia WorldSkills 2022 y gané una medalla de excelencia gracias a mis habilidades y conocimientos en diferentes lenguajes de programación, diseño de API, SQL y patrones de diseño.</p>  <p>Me encanta aprender nuevas herramientas y actualizarme día a día con las últimas novedades en tecnología.  Si quieres saber más sobre mi experiencia laboral, echa un vistazo a mi perfil de <a style='color: var(--colorPrimary);' href='https://www.linkedin.com/in/juandiegows/' target='_blank' class='link'>LinkedIn</a> o sigue bajando y mira algunos de mis trabajos.</p>"
    },
    "services": {
      "title": "Mis Servicios",
      "services": [
        {
          "title": "Diseño y Desarrollo Web",
          "description": "Diseño y Desarrollo Web personalizado, creando sitios modernos, intuitivos y optimizados para motores de búsqueda (SEO), adaptados a las necesidades de cada cliente.",
          "link": ""
        },
        {
          "title": "Apps Móviles",
          "description": "Desarrollo de aplicaciones móviles personalizada para android, Adaptada a la necesita de cliente.",
          "link": ""
        }, {
          "title": "Desarrollo de escritorio",
          "description": "Desarrollo de programas de escritorio personalizados, adaptados a las necesidades de cada cliente. Creo programas de escritorio de alta calidad, fáciles de usar.",
          "link": ""
        }, {
          "title": "Software a la medida",
          "description": "Creo la solución que necesita tu negocio, esto incluye todo el ciclo de desarrollo desde al analisis de requerimiento hasta mantenimiento.",
          "link": ""
        }, {
          "title": "Clases",
          "description": "Doy clases personales para aquellas personas que necesita reforzar conocimientos o aprender nuevas tecnnologia.",
          "link": "https://www.tusclases.co/profesores/juan-diego-mejia-maestre.htm"
        }, {
          "title": "Bases de datos",
          "description": "Creacion y administrador de bases de datos",
          "link": ""
        }
      ],
      "nameButtom": "Ver resultado"
    },
    "client": {
      "title": "Clientes",
      "clients": [
        {
          "name": "Lazos de Dignidad",
          "imgSrc": "/assets/img/Icons/client/Lazos de dignidad.svg",
          "tools": ["php", "MVC", "JQuery", "CSS", "HTML", "POO"],
          "count": 5,
          "year": 2020,
          "url": "https://lazosdedignidad.org/"
        },
        {
          "name": "Monnerverse",
          "imgSrc": "/assets/img/Icons/client/monnerverse.svg",
          "tools": ["Vue.js", "Javascript", "CSS", "HTML"],
          "count": 4,
          "year": 2022,
          "url": "https://www.monnerverse.com/"
        },
        {
          "name": "Vittoria Pizzeria",
          "imgSrc": "/assets/img/Icons/client/vittoria Pizzeria Trattoria.svg",
          "tools": ["Angular", "TypeScript", "SCSS", "HTML"],
          "count": 2,
          "year": 2023,
          "url": "https://vittoriapizzeriaytrattoria.com/"
        }

      ],
      "btnVisit": "Visitar",
      "btnDetails": "Detalles"
    }, "skills": {
      "title": "Mis habilidades",
      "skills": [
        {
          "name": "C#",
          "urlImg": "/assets/img/Icons/skills/Csharp.svg",
          "description": "Es un lenguaje de programación orientado a objetos y de propósito general desarrollado por Microsoft. Se utiliza principalmente para desarrollar aplicaciones de escritorio, móviles, web y juegos. C# se basa en el marco .NET y ofrece características avanzadas como la recolección automática de basura y la administración de memoria."
        },
        {
          "name": "Java",
          "urlImg": "/assets/img/Icons/skills/java.svg",
          "description": "Es un lenguaje de programación orientado a objetos utilizado para desarrollar aplicaciones empresariales, móviles y juegos. Se basa en la máquina virtual Java (JVM) para la portabilidad y ofrece características de alto nivel como la recolección automática de basura y el manejo de excepciones"
        },
        {
          "name": "Php",
          "urlImg": "/assets/img/Icons/skills/php.svg",
          "description": "Es un lenguaje de programación web ampliamente utilizado. Permite crear aplicaciones web dinámicas y personalizadas. Es fácil de usar y tiene una gran comunidad de desarrolladores."
        },
        {
          "name": "Javascript",
          "urlImg": "/assets/img/Icons/skills/js.svg",
          "description": "Es un lenguaje de programación utilizado para desarrollar aplicaciones web interactivas. Se ejecuta en el navegador del usuario y agrega interactividad a las páginas web. Es esencial para cualquier desarrollador web moderno."
        },
        {
          "name": "Vue.js",
          "urlImg": "/assets/img/Icons/skills/vue.svg",
          "description": "Es un framework de JavaScript para construir interfaces de usuario interactivas y aplicaciones de una sola página. Proporciona un enfoque basado en componentes para la creación de aplicaciones web, lo que permite una mayor modularidad y reutilización de código. Es altamente adaptable y fácil de integrar con otras bibliotecas de JavaScript."
        },
        {
          "name": "Angular",
          "urlImg": "/assets/img/Icons/skills/angular.svg",
          "description": "Es un framework de JavaScript para crear aplicaciones web y móviles híbridas. Utiliza TypeScript para una mayor eficiencia y es altamente escalable. Tiene una gran comunidad de desarrolladores y herramientas para el desarrollo moderno."
        },
        {
          "name": "Kotlin",
          "urlImg": "/assets/img/Icons/skills/kotlin.svg",
          "description": "Es un lenguaje de programación utilizado para desarrollar aplicaciones para Android, servidores y la web. Es seguro, interoperable y conciso. Compatible con las herramientas de desarrollo populares y una comunidad en crecimiento."
        },
        {
          "name": "CSS",
          "urlImg": "/assets/img/Icons/skills/css.svg",
          "description": "Es un lenguaje de hojas de estilo en cascada utilizado en el desarrollo web para describir la presentación visual de documentos HTML y XML. Aunque no se considera un lenguaje de programación completo, es esencial para la creación de sitios web modernos y atractivos. Es compatible con todos los navegadores web modernos."
        },
        {
          "name": "HTML",
          "urlImg": "/assets/img/Icons/skills/html.svg",
          "description": "Es un lenguaje de marcado utilizado para crear páginas web y otros documentos. Proporciona una estructura para el contenido y utiliza etiquetas para definir el significado de cada elemento. Es esencial para el desarrollo web y compatible con todos los navegadores modernos."
        },
        {
          "name": "Android Studio",
          "urlImg": "/assets/img/Icons/skills/android_studio.svg",
          "description": "Es el IDE oficial para el desarrollo de aplicaciones Android, creado por Google. Proporciona un editor de código, un depurador y emuladores de dispositivos, entre otras herramientas. Es compatible con Java, Kotlin y otros lenguajes de programación."
        },
        {
          "name": "SQL Server",
          "urlImg": "/assets/img/Icons/skills/sql_server.svg",
          "description": "Es un RDBMS creado por Microsoft para la gestión y análisis de datos. Proporciona características como soporte para transacciones, consultas complejas y seguridad de datos. Ampliamente utilizado en empresas para almacenar y analizar grandes cantidades de datos."
        },
        {
          "name": "MySQL",
          "urlImg": "/assets/img/Icons/skills/mysql.svg",
          "description": "Es un sistema de gestión de bases de datos relacionales de código abierto, utilizado para almacenar y administrar datos en aplicaciones web. Proporciona características como soporte para transacciones, consultas complejas, escalabilidad, seguridad de datos y alta disponibilidad. Es ampliamente utilizado en aplicaciones web de todo el mundo."
        },
        {
          "name": "SQLite",
          "urlImg": "/assets/img/Icons/skills/sqlite.svg",
          "description": "Es un motor de base de datos relacional ligero y sin servidor, utilizado para almacenar y administrar datos localmente. Fácil de integrar en aplicaciones, proporciona soporte para transacciones, consultas complejas y seguridad de datos. Compatible con la mayoría de los sistemas operativos."
        },
        {
          "name": "Figma",
          "urlImg": "/assets/img/Icons/skills/figma.svg",
          "description": "Es una herramienta basada en la nube para el diseño de UI/UX. Permite la colaboración en tiempo real y la creación de diseños interactivos y prototipos. Proporciona herramientas de diseño vectorial, bibliotecas de componentes reutilizables y una plataforma de colaboración en equipo."
        },
        {
          "name": "Ubuntu",
          "urlImg": "/assets/img/Icons/skills/ubuntu.svg",
          "description": "Es un sistema operativo de código abierto y gratuito, basado en Linux. Fácil de instalar y utilizar, viene con una amplia gama de aplicaciones y herramientas preinstaladas. Popular entre los usuarios de Linux por su facilidad de uso y soporte comunitario activo."
        },
        {
          "name": "Visual Studio",
          "urlImg": "/assets/img/Icons/skills/visual studio 2022.svg",
          "description": "Es un IDE de Microsoft. Ofrece herramientas para desarrollar aplicaciones en varias plataformas y lenguajes. Es utilizado por desarrolladores para crear aplicaciones de escritorio, web y móviles."
        },
        {
          "name": "Visual Studio Code",
          "urlImg": "/assets/img/Icons/skills/visual studio code.svg",
          "description": "Es un editor de código gratuito y multiplataforma de Microsoft. Tiene herramientas avanzadas como Git y autocompletado de código. Es popular entre los desarrolladores por su facilidad de uso y extensiones disponibles."
        },
        {
          "name": "React",
          "urlImg": "/assets/img/Icons/skills/react.svg",
          "description": "Es una biblioteca de JavaScript para construir interfaces de usuario. Utiliza un enfoque basado en componentes para crear aplicaciones web escalables y reutilizables. React es muy popular y cuenta con una gran comunidad de desarrolladores y bibliotecas de código abierto."
        },
        {
          "name": "Node.js",
          "urlImg": "/assets/img/Icons/skills/nodejs.svg",
          "description": "Es un entorno de tiempo de ejecución de JavaScript construido sobre el motor V8 de Google Chrome. Permite a los desarrolladores ejecutar JavaScript en el lado del servidor para crear aplicaciones web escalables y de alto rendimiento. Node.js cuenta con una gran comunidad y un ecosistema rico en bibliotecas y herramientas."
        },
        {
          "name": "Git",
          "urlImg": "/assets/img/Icons/skills/git.svg",
          "description": "Es un sistema de control de versiones de software utilizado para rastrear los cambios en el código fuente durante el desarrollo de software. Git es altamente eficiente y proporciona una mayor colaboración en equipo y seguimiento de cambios en el código fuente. Es ampliamente utilizado en la industria del desarrollo de software."
        }
      ]
    }
  };

  GetLangText(lang: Lang) {
    return this.http.get<any>(`/assets/lang/lang.${lang.toString()}.json`);
  }
  constructor(private http: HttpClient) { }

}
export enum Lang {
  en = "en",
  es = "es"
}
export enum Mode {
  dark = "dark",
  light = "ligth"
}
