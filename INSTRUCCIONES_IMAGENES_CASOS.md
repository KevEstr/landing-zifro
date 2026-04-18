# Instrucciones para Imágenes de Casos de Éxito

## 📸 Imágenes Necesarias

Necesitas agregar 3 imágenes en la carpeta `public/images/`:

### 1. Hotel Guacarí
**Archivo**: `public/images/case-hotel-guacari.jpg`
- **Qué mostrar**: Foto del hotel, recepción, o captura del sistema de reservas
- **Dimensiones recomendadas**: 1200x900px (ratio 4:3)
- **Formato**: JPG o PNG
- **Peso máximo**: 500KB (optimizar para web)

### 2. Academia Ritmo & Volley
**Archivo**: `public/images/case-academia-ritmo.jpg`
- **Qué mostrar**: Foto de la academia, clases, o captura del sistema de asistencia
- **Dimensiones recomendadas**: 1200x900px (ratio 4:3)
- **Formato**: JPG o PNG
- **Peso máximo**: 500KB (optimizar para web)

### 3. Distribuidora Sandwich Express
**Archivo**: `public/images/case-sandwich-express.jpg`
- **Qué mostrar**: Foto de productos, operación, o captura del sistema de ventas
- **Dimensiones recomendadas**: 1200x900px (ratio 4:3)
- **Formato**: JPG o PNG
- **Peso máximo**: 500KB (optimizar para web)

## 🎨 Recomendaciones de Diseño

### Opción 1: Fotos Reales
- Foto del negocio o instalaciones
- Foto del equipo trabajando
- Foto de productos/servicios

### Opción 2: Screenshots del Sistema
- Captura de pantalla del dashboard
- Captura de una funcionalidad clave
- Mockup del sistema en uso

### Opción 3: Composición Mixta
- Foto del negocio + overlay del sistema
- Collage de fotos + logo del cliente
- Foto con elementos gráficos

## 🛠️ Herramientas para Optimizar Imágenes

### Online (Gratis):
- **TinyPNG**: https://tinypng.com/ (reduce peso sin perder calidad)
- **Squoosh**: https://squoosh.app/ (optimizador de Google)
- **Compressor.io**: https://compressor.io/

### Redimensionar:
- **Canva**: https://canva.com (gratis, fácil de usar)
- **Photopea**: https://photopea.com (Photoshop online gratis)

## 📝 Cómo Agregar las Imágenes

1. Optimiza tus imágenes (máximo 500KB cada una)
2. Renómbralas exactamente como se indica arriba
3. Colócalas en la carpeta `public/images/`
4. ¡Listo! Se mostrarán automáticamente

## 🎯 Alternativa Temporal

Si no tienes las imágenes ahora, puedes usar placeholders temporales:

```typescript
// En components/results-section.tsx, cambia las rutas a:
image: "https://picsum.photos/seed/hotel/1200/900"
image: "https://picsum.photos/seed/academia/1200/900"
image: "https://picsum.photos/seed/sandwich/1200/900"
```

Esto mostrará imágenes placeholder hasta que tengas las reales.

## ✅ Checklist

- [ ] Imagen Hotel Guacarí (1200x900px, <500KB)
- [ ] Imagen Academia Ritmo & Volley (1200x900px, <500KB)
- [ ] Imagen Sandwich Express (1200x900px, <500KB)
- [ ] Imágenes optimizadas con TinyPNG
- [ ] Imágenes colocadas en `public/images/`
- [ ] Verificar que se muestren correctamente en la página

## 💡 Tips Profesionales

1. **Consistencia**: Usa el mismo estilo para las 3 imágenes (todas fotos, o todas screenshots)
2. **Calidad**: Imágenes nítidas y bien iluminadas
3. **Branding**: Si tienes logos de los clientes, inclúyelos
4. **Privacidad**: Asegúrate de tener permiso para usar las imágenes
5. **Optimización**: Siempre optimiza para web (TinyPNG es tu amigo)

## 🚀 Resultado Final

Las imágenes se mostrarán en cards con:
- Badge de industria en la esquina superior izquierda
- Overlay sutil con el color del proyecto
- Hover effect suave
- Responsive en todos los dispositivos

¡Las imágenes harán que tus casos de éxito se vean mucho más profesionales y creíbles!
