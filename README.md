# Brochure - Aplicación Angular

La aplicación **Brochure** es una solución completa de desarrollo territorial con una interfaz moderna construida en Angular. Esta aplicación está diseñada para mostrar los servicios integrales de una empresa de desarrollo territorial especializada en consultoría, proyectos de vivienda e infraestructura.

## 🏢 Acerca de la Empresa

**Empresa de Desarrollo Territorial DONMATÍAS** - Transformando Territorios

Somos una entidad pública estratégica, conformada por la ESP Servidonmatías S.A.S. y el Fondo de Vivienda de Donmatías - FOVIS, que lidera proyectos de desarrollo territorial en Antioquia y Colombia.

### Misión
Ser el referente en Colombia en ejecución de proyectos territoriales, reconocidos por la excelencia, la transparencia y la capacidad de transformar territorios con resultados tangibles, innovadores y sostenibles.

### Visión
Gestionar y ejecutar proyectos estratégicos con altos estándares técnicos, financieros y sociales, que fortalezcan las capacidades institucionales, mejoren la calidad de vida de la población y contribuyan al cierre de brechas territoriales.

## 🚀 Características Principales

### Servicios Destacados

- **Servicios Integrales de Consultoría**
  - Consultoría Territorial y Ordenamiento
  - Interventoría Técnica de Obras
  - Gestión Documental y Archivo
  - Fortalecimiento Institucional

- **Proyectos de Vivienda y Optimización Urbana**
  - Vivienda de Interés Social
  - Diseño Arquitectónico
  - Redes de Acueducto y Alcantarillado
  - Modernización Tecnológica

- **Infraestructura y Vías**
  - Pavimentación
  - Mantenimiento Vial
  - Conectividad Rural
  - Señalización

## 🛠️ Tecnologías Utilizadas

- **Angular 19.2.0** - Framework principal
- **Angular Material** - Componentes UI
- **TypeScript** - Lenguaje de programación
- **RxJS** - Programación reactiva
- **EmailJS** - Servicio de envío de emails
- **PDF Viewer** - Visualización de documentos

## 📦 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd brochure
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación en modo desarrollo:**
   ```bash
   npm start
   ```
   
   O usando Angular CLI:
   ```bash
   ng serve
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```
   
   O usando Angular CLI:
   ```bash
   ng build
   ```

Una vez que el servidor esté ejecutándose, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cuando modifiques cualquier archivo fuente.

## 🔧 Scripts Disponibles

- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run watch` - Construye en modo watch para desarrollo
- `npm run lint` - Ejecuta el linter para verificar el código
- `npm run deploy:images` - Despliega las imágenes del proyecto

## 🌐 Estructura del Proyecto

```
src/
├── app/
│   ├── features/
│   │   ├── home/           # Página principal
│   │   ├── about/          # Acerca de nosotros
│   │   ├── services/       # Servicios
│   │   └── contact/        # Contacto
│   └── shared/
│       ├── components/     # Componentes compartidos
│       ├── data/          # Datos estáticos
│       └── interfaces/    # Interfaces TypeScript
```

## 📞 Contacto

- **Ubicación:** Calle 9 sur # 79C - 139, Medellín, Antioquia
- **Teléfono:** +57 313-681-7407
- **Email:** [Empresadedesarrollotorritorial@gmail.com](mailto:Empresadedesarrollotorritorial@gmail.com)

## 📝 Funcionalidades de la Aplicación

### Páginas Principales
- **Inicio:** Presentación de la empresa y servicios destacados
- **Acerca de:** Historia, misión, visión y valores de la empresa
- **Servicios:** Catálogo completo de servicios ofrecidos
- **Contacto:** Formulario de contacto integrado con EmailJS

### Características Técnicas
- **Diseño Responsive:** Adaptado para dispositivos móviles, tablets y desktop
- **Navegación Intuitiva:** Sistema de rutas bien estructurado
- **Formularios Reactivos:** Validación en tiempo real
- **Optimización de Imágenes:** Soporte para WebP y optimización automática
- **Componentes Reutilizables:** Arquitectura modular y escalable

## 🎨 Diseño y UX

La aplicación utiliza Material Design 3 con:
- Gradientes modernos y colores corporativos
- Animaciones suaves y transiciones
- Tipografía optimizada para legibilidad
- Iconografía consistente con Material Icons

## 📱 Compatibilidad

- **Navegadores:** Chrome, Firefox, Safari, Edge (últimas versiones)
- **Dispositivos:** Responsive design para móviles, tablets y desktop
- **Accesibilidad:** Cumple con estándares WCAG 2.1

## 🔒 Configuración de Seguridad

El proyecto incluye configuración para:
- Validación de formularios
- Sanitización de datos
- Protección contra XSS
- Configuración segura de EmailJS

## 📊 Rendimiento

- **Lazy Loading:** Carga diferida de módulos
- **Optimización de Bundle:** Construcción optimizada para producción
- **Compresión de Imágenes:** Procesamiento automático de imágenes
- **Tree Shaking:** Eliminación de código no utilizado

## 🧪 Pruebas

### Pruebas Unitarias
Para ejecutar las pruebas unitarias con [Karma](https://karma-runner.github.io), usa el siguiente comando:

```bash
ng test
```

### Pruebas End-to-End
Para pruebas end-to-end (e2e), ejecuta:

```bash
ng e2e
```

Angular CLI no incluye un framework de pruebas end-to-end por defecto. Puedes elegir uno que se adapte a tus necesidades.

## 🛠️ Scaffolding de Código

Angular CLI incluye herramientas poderosas de scaffolding. Para generar un nuevo componente, ejecuta:

```bash
ng generate component nombre-del-componente
```

Para una lista completa de esquemas disponibles (como `components`, `directives`, o `pipes`), ejecuta:

```bash
ng generate --help
```

## 📚 Recursos Adicionales

Para más información sobre el uso de Angular CLI, incluyendo referencias detalladas de comandos, visita la página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

---

**Desarrollado con ❤️ para el desarrollo territorial de Colombia**

*Transformamos necesidades en soluciones sostenibles, construyendo bienestar y confianza mediante una gestión profesional y transparente.*
