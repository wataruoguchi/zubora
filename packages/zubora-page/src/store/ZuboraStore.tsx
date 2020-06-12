import { createContext } from 'react';
import { observable } from 'mobx';

class ZuboraStore {
  @observable code = '';
  @observable result = '';
}

export const ZuboraStoreContext = createContext(new ZuboraStore());
