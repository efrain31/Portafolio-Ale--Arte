// scripts/update-data-working.ts
import fs from 'fs';
import path from 'path';

console.log('🔄 ACTUALIZANDO src/data/data.ts...\n');

// 1. Verificar resultados
const resultsFile = 'upload-results.json';
if (!fs.existsSync(resultsFile)) {
    console.error('❌ ERROR: Ejecuta primero upload-final-working.ts');
    process.exit(1);
}

const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
const images = results.images || [];

if (images.length === 0) {
    console.error('❌ No hay imágenes para actualizar');
    process.exit(1);
}

console.log(`📊 ${images.length} URLs disponibles\n`);

// 2. Leer data.ts (CORREGIDO: usa src/data/data.ts)
const dataPath = path.join(process.cwd(), 'src', 'data', 'data.ts');
if (!fs.existsSync(dataPath)) {
    console.error(`❌ ERROR: No se encontró ${dataPath}`);
    console.log('   Verifica que el archivo exista en src/data/data.ts');
    process.exit(1);
}

let content = fs.readFileSync(dataPath, 'utf8');
const original = content;

// 3. Hacer backup (en src/data/backups/)
const backupDir = path.join(process.cwd(), 'src', 'data', 'backups');
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

const backupName = `data-backup-${Date.now()}.ts`;
const backupPath = path.join(backupDir, backupName);
fs.writeFileSync(backupPath, original);
console.log(`💾 Backup: src/data/backups/${backupName}\n`);

// 4. Reemplazar URLs
let updated = 0;
let notFound = 0;

console.log('🔄 Reemplazando...\n');
images.forEach((item: any, i: number) => {
    const { localPath, blobUrl } = item;
    
    // Mostrar progreso
    if ((i + 1) % 20 === 0) {
        console.log(`   ${i + 1}/${images.length} procesadas`);
    }
    
    // Buscar y reemplazar
    if (content.includes(`"${localPath}"`)) {
        // Escapar caracteres especiales para regex
        const escapedPath = localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        content = content.replace(new RegExp(`"${escapedPath}"`, 'g'), `"${blobUrl}"`);
        updated++;
        
        if (updated <= 3) {
            console.log(`✅ ${localPath}`);
            console.log(`   → ${blobUrl.substring(0, 70)}...`);
        }
    } else if (content.includes(`'${localPath}'`)) {
        // Escapar caracteres especiales para regex
        const escapedPath = localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        content = content.replace(new RegExp(`'${escapedPath}'`, 'g'), `'${blobUrl}'`);
        updated++;
        
        if (updated <= 3) {
            console.log(`✅ ${localPath}`);
            console.log(`   → ${blobUrl.substring(0, 70)}...`);
        }
    } else {
        notFound++;
        if (notFound <= 3) {
            console.log(`⚠️  No encontrada: ${localPath}`);
        }
    }
});

// 5. Guardar
fs.writeFileSync(dataPath, content);

// 6. Resultados
console.log('\n🎉 ¡ACTUALIZACIÓN COMPLETADA!');
console.log('════════════════════════════════════════');
console.log(`📊 URLs actualizadas: ${updated}/${images.length}`);
console.log(`📊 URLs no encontradas: ${notFound}`);
console.log(`📁 Archivo actualizado: src/data/data.ts`);
console.log(`💾 Backup: src/data/backups/${backupName}`);
console.log(`📄 Resultados: upload-results.json`);

console.log('\n✅ PASOS SIGUIENTES:');
console.log('   1. npm run dev');
console.log('   2. Verifica que las imágenes se vean');
console.log('   3. Si hay problemas, restaura el backup:');
console.log(`      cp src/data/backups/${backupName} src/data/data.ts`);

// Verificación adicional
console.log('\n🔍 VERIFICACIÓN RÁPIDA:');
const blobUrls = (content.match(/blob\.vercel-storage\.com/g) || []).length;
console.log(`   • URLs de Blob en el archivo: ${blobUrls}`);