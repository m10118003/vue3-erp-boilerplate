import type { App } from 'vue'
import * as ElIcons from '@element-plus/icons-vue'

export function setElIcons(app:App<Element>){
    for(const name in ElIcons){
        app.component(name,(ElIcons as any)[name])
    }
}

