// scripts/upload-final-working.ts
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

console.log('🚀 UPLOAD FINAL FUNCIONAL\n');

// Leer .env limpio
const envPath = path.join(process.cwd(), '.env');
const content = fs.readFileSync(envPath, 'utf8').trim();
console.log(`📄 .env: "${content}"`);

// Extraer token
const TOKEN = content.replace('aleIMG_READ_WRITE_TOKEN=', '').trim();
console.log(`✅ Token: ${TOKEN.substring(0, 30)}...\n`);

// Lista de carpetas
const FOLDERS = [
    'dataale/FOTOGRAFIAS/JPG',
    'dataale/FOTOGRAFIAS/FOOD',
    'dataale/FOTOGRAFIAS/PHOTOSHOOT', 
    'dataale/FOTOGRAFIAS/STILLS PDCA',
    'dataale/FOTOGRAFIAS/STUDIO',
    'dataale/SOBREMI/SHOOTINGS MODELAJE/CANTADRINK',
    'dataale/SOBREMI/SHOOTINGS MODELAJE/MARUATHA',
    'dataale/SOBREMI/SHOOTINGS MODELAJE/PROYECTOCATRINA',
    'dataale/TRABAJOS/ART',
    'dataale/TRABAJOS/PUBLICIDAD',
    'dataale/TRABAJOS/RESTAURACIONES',
];

async function main() {
    console.log('🧪 Probando token...');
    
    try {
        // Prueba simple
        const test = await put('test-connection.txt', Buffer.from('test'), {
            access: 'public',
            token: TOKEN
        });
        console.log(`✅ Token válido! ${test.url}\n`);
    } catch (error: any) {
        console.error(`❌ Token inválido: ${error.message}`);
        console.log('\n🔧 Verifica en Vercel:');
        console.log('   1. ¿Creaste el almacenamiento Blob?');
        console.log('   2. ¿El token es correcto?');
        console.log('   3. ¿El token ha expirado?');
        return;
    }
    
    const results = [];
    let count = 0;
    let success = 0;
    
    console.log(`📂 Procesando ${FOLDERS.length} carpetas...\n`);
    
    for (const folder of FOLDERS) {
        const folderPath = path.join(process.cwd(), 'public', 'images', folder);
        
        if (!fs.existsSync(folderPath)) {
            console.log(`⚠️  No existe: ${folder}`);
            continue;
        }
        
        const files = fs.readdirSync(folderPath);
        const images = files.filter(f => /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/i.test(f));
        
        if (images.length === 0) {
            console.log(`📁 ${folder} - 0 imágenes`);
            continue;
        }
        
        console.log(`📂 ${folder} - ${images.length} imágenes`);
        
        for (const image of images) {
            count++;
            const imagePath = path.join(folderPath, image);
            const blobPath = `images/${folder}/${image}`;
            
            try {
                console.log(`   [${count}] ${image}`);
                
                const fileContent = fs.readFileSync(imagePath);
                const { url } = await put(blobPath, fileContent, {
                    access: 'public',
                    token: TOKEN
                });
                
                results.push({
                    localPath: `/images/${folder}/${image}`,
                    blobUrl: url
                });
                
                success++;
                console.log(`   ✅ ${url.substring(0, 60)}...`);
                
                // Pequeña pausa
                await new Promise(resolve => setTimeout(resolve, 50));
                
            } catch (error: any) {
                console.log(`   ❌ Error: ${error.message}`);
            }
        }
        
        console.log('');
    }
    
    // Guardar resultados
    fs.writeFileSync(
        'upload-results.json',
        JSON.stringify({
            date: new Date().toISOString(),
            totalProcessed: count,
            successful: success,
            images: results
        }, null, 2)
    );
    
    console.log('🎉 ¡SUBIDA COMPLETADA!');
    console.log('════════════════════════════════════════');
    console.log('📊 RESULTADOS:');
    console.log(`   • Imágenes procesadas: ${count}`);
    console.log(`   • Subidas exitosas: ${success}`);
    console.log(`   • Fallos: ${count - success}`);
    console.log(`\n🗂️  Archivo: upload-results.json`);
    
    if (results.length > 0) {
        console.log('\n🔗 URLs de ejemplo:');
        results.slice(0, 3).forEach((item, i) => {
            console.log(`${i + 1}. ${item.blobUrl}`);
        });
        
        console.log('\n📝 Para actualizar data.ts, ejecuta:');
        console.log('   npx tsx scripts/update-data-working.ts');
    }
}

main().catch(error => {
    console.error('🔥 ERROR:', error);
});