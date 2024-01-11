import Area from '../model/area.model.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const areaAsignada = async (req, res) => {
  try {
    const areasJsonPath = resolve(__dirname, '../../api/areas.json');
    const areasData = JSON.parse(await fs.readFile(areasJsonPath, 'utf-8'));

    for (const area of areasData) {
      const existingArea = await Area.findOne({ nombre: area.nombre });

      if (!existingArea) {
        const newArea = new Area(area);
        await newArea.save();
      }
    }

    const areaFindAll = await Area.find();
    res.status(200).json({ message: 'Áreas asignadas correctamente', areas: areaFindAll });
    
    
  } catch (error) {
    console.error('Error al asignar áreas:', error);
    // Puedes lanzar el error nuevamente si es necesario
    throw error;
  }
};

