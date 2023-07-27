import type { EquipmentModel } from 'src/lib/core/models/equipment';
import client from 'src/lib/server/prismic/prismicClient';
import { mapPrismicEquipment } from './equipmentMappers';

class EquipmentService {
  static async getAllEquipment(): Promise<EquipmentModel[] | null> {
    const data = await client.getAllByType('equipment');

    if (!data) return null;

    return data.map(d => (mapPrismicEquipment(d.data)));
  }
}

export default EquipmentService;
