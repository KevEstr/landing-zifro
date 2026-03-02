# Script para eliminar imágenes antiguas ya no utilizadas
# Ejecutar desde la raíz del proyecto: .\cleanup-old-images.ps1

Write-Host "🧹 Limpiando imágenes antiguas..." -ForegroundColor Cyan

$imagesToDelete = @(
    "public\images\hero-landscape.jpg",
    "public\images\agents-illustration.jpg",
    "public\images\services-web.jpg",
    "public\images\services-automation.jpg",
    "public\images\results-landscape.jpg",
    "public\images\case-ecommerce.jpg",
    "public\images\case-health.jpg",
    "public\images\case-logistics.jpg",
    "public\images\contact-illustration.jpg"
)

$deletedCount = 0
$notFoundCount = 0

foreach ($image in $imagesToDelete) {
    if (Test-Path $image) {
        Remove-Item $image -Force
        Write-Host "✅ Eliminado: $image" -ForegroundColor Green
        $deletedCount++
    } else {
        Write-Host "⚠️  No encontrado: $image" -ForegroundColor Yellow
        $notFoundCount++
    }
}

Write-Host ""
Write-Host "📊 Resumen:" -ForegroundColor Cyan
Write-Host "   Eliminados: $deletedCount" -ForegroundColor Green
Write-Host "   No encontrados: $notFoundCount" -ForegroundColor Yellow
Write-Host ""
Write-Host "✨ ¡Limpieza completada!" -ForegroundColor Cyan
