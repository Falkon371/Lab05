import DataModel from '../schemas/data.schema';
import {IData, Query} from "../models/data.model";

export default class DataService {

public async createData(dataParams: IData) {
   try {
       const dataModel = new DataModel(dataParams);
       await dataModel.save();
   } catch (error) {
       console.error('Wystąpił błąd podczas tworzenia danych:', error);
       throw new Error('Wystąpił błąd podczas tworzenia danych');
   }
}

public async get(deviceID: string){
    try{
        const limit = 1;
        const data = await DataModel.find({deviceId: deviceID}, {__v:0, __id:0}).limit(limit).sort({$natural:-1})
        return data
    }catch(error){
        throw new Error(`Wystąpił błąd: ${error}`)
    }
}

   public async getAllNewest() {
        const latestData: Array<IData | { deviceId: number }> = [];

       
            await Promise.all(
                Array.from({ length: 17 }, async (_, i) => {
                    try {
                        const latestEntry = await DataModel.findOne({ deviceId: i }, { __v: 0, _id: 0 }).sort({ $natural: -1 });
                        if (latestEntry) {
                            latestData.push(latestEntry);
                        } else {
                            latestData.push({ deviceId: i });
                        }
                    } catch (error) {
                        console.error(`Błąd podczas pobierania danych dla urządzenia ${i}: ${error}`);
                        latestData.push({
                            deviceId: 0
                        });
                    }
                })
            );
      

        return latestData;
    }

    public async deleteData(deviceID: string){
        try{
        const usun = await DataModel.deleteMany({deviceId: deviceID});
        console.log(`Dane dla urządzenia o ID ${deviceID} zostały pomyślnie usunięte.`);
        } catch (error) {
            console.error(`Błąd podczas usuwania danych dla urządzenia o ID ${deviceID}: ${error}`);
            throw new Error(`Błąd podczas usuwania danych dla urządzenia o ID ${deviceID}`);
    }
}

public async query(deviceID: string) {
   try {
       const data = await DataModel.find({deviceId: deviceID}, { __v: 0, _id: 0 });
       return data;
    } catch (error) {
        throw new Error(`Query failed: ${error}`);
    }
 }
 }
 