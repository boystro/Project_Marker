import {
  isDateStyleType,
  isTimeStyleType,
  type DateStyleType,
  type Hour12Type,
  type TimeStyleType,
} from '@/types/DateTimeFormatOptionTypes'
import { ref, watch, type Ref, type WatchHandle } from 'vue'

export default class DateTimeConfigService {
  constructor() {
    // Initialize Time Style
    const storageTimeStyle = localStorage.getItem('time-style') ?? undefined
    if (isTimeStyleType(storageTimeStyle)) this.timeStyle.value = storageTimeStyle as TimeStyleType

    // Initialize Date Style
    const storageDateStyle = localStorage.getItem('date-style') ?? undefined
    if (isDateStyleType(storageDateStyle ?? undefined))
      this.dateStyle.value = storageDateStyle as DateStyleType

    // Initialize Hour-12
    const storageHour12 = localStorage.getItem('hour-12') ?? undefined
    this.hour12.value = storageHour12 == '1'

    // Initialize Watchers
    this._timeStyleWatchHandle = watch(this.timeStyle, this._timeStyleWatcher)
    this._dateStyleWatchHandle = watch(this.dateStyle, this._dateStyleWatcher)
    this._hour12WatchHandle = watch(this.hour12, this._hour12Watcher)
  }

  private _timeStyleWatchHandle: WatchHandle
  private _dateStyleWatchHandle: WatchHandle
  private _hour12WatchHandle: WatchHandle

  public timeStyle: Ref<TimeStyleType> = ref(undefined)
  public dateStyle: Ref<DateStyleType> = ref(undefined)
  public hour12: Ref<Hour12Type> = ref(undefined)

  private _timeStyleWatcher(newTimeStyle: TimeStyleType) {
    localStorage.setItem('time-style', newTimeStyle ?? '--undefined--')
  }

  private _dateStyleWatcher(newDateStyle: DateStyleType) {
    localStorage.setItem('date-style', newDateStyle ?? '--undefined--')
  }

  private _hour12Watcher(newHour12: Hour12Type) {
    localStorage.setItem('hour-12', newHour12 ? '1' : '0')
  }
}
