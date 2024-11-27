import type { QuickLinkType } from '@/types/QuickLinkType'
import { ref, watch, type Ref } from 'vue'

export default class QuickLinkConfigService {
  public constructor() {
    const storageLinks = localStorage.getItem('links')
    if (storageLinks != null) {
      const parsedLinks = JSON.parse(storageLinks) as QuickLinkType[]
      this.links.value = parsedLinks
    }

    watch(this.links, this._linksWatcher)
  }

  public links: Ref<QuickLinkType[]> = ref<QuickLinkType[]>([])

  private _linksWatcher(newLinks: QuickLinkType[]) {
    console.log('links updated', newLinks)
    const storageLinks = JSON.stringify(newLinks)
    localStorage.setItem('links', storageLinks)
  }

  public addLink(item: QuickLinkType) {
    this.links.value = [...this.links.value, item]
  }

  public deleteLink(item: QuickLinkType) {
    this.links.value = this.links.value.filter(
      (link) => !(link.name == item.name && link.url == item.url),
    )
  }
}
