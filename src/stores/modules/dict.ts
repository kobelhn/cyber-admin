import { defineStore } from "pinia";
import { getAllDictTypesApi, getDictItemsApi } from "@/api/modules/system/dict-type";
import piniaPersistConfig from "@/stores/helper/persist";

export const useDictStore = defineStore({
  id: "cyber-dicts",
  state: (): {
    dictTypes: Record<string, any>;
    dictValues: Record<string, any>;
  } => ({
    dictTypes: {},
    dictValues: {}
  }),
  actions: {
    async setDictTypes() {
      const { data } = await getAllDictTypesApi();
      data.forEach((dictType: any) => {
        this.dictTypes[dictType.code] = dictType;
      });
    },
    async getDictItemsByCode(code: string) {
      // 如果不存在或者超过30分钟则重新获取
      if (!this.dictValues[code] || Date.now() - this.dictValues[code].timestamp > 30 * 60 * 1000) {
        const { data } = await getDictItemsApi({
          typeId: this.dictTypes[code].id,
          page: 1,
          pageSize: 100
        });
        this.dictValues[code] = {
          timestamp: Date.now(),
          data: data.items.map(({ label, value }) => ({
            label,
            value
          }))
        };
      }
      return this.dictValues[code].data;
    },
    emptyDicts() {
      this.dictTypes = {};
      this.dictValues = {};
    }
  },
  persist: piniaPersistConfig("cyber-dicts")
});
