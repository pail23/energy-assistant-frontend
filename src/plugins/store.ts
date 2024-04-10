import { reactive } from 'vue';

interface Store {
  isInStandaloneMode: boolean;
  navigationMenuSize: number;
  apiInitialized: boolean;
  apiBaseUrl: string;
  dialogActive: boolean;
  prevScrollPos?: number;
  prevScrollName?: string;
}

export const store: Store = reactive({
  isInStandaloneMode: false,
  navigationMenuSize: 300,
  apiInitialized: false,
  apiBaseUrl: '',
  dialogActive: false,
  prevScrollPos: undefined,
  prevScrollName: undefined,
});
