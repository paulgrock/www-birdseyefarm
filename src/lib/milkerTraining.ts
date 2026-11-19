import type { MilkerTrainingSlot } from '../types/sanity'

const TIME_ZONE = 'America/Los_Angeles'

const dayFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  weekday: 'short',
  month: 'short',
  day: 'numeric',
})

const timeFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  hour: 'numeric',
  minute: '2-digit',
})

export function formatLength(hours: number): string {
  return `${hours} ${hours === 1 ? 'hr' : 'hrs'}`
}

/** "Sat, Dec 6 · 9:00 AM (2 hrs)" in Pacific time, whatever zone the build runs in. */
export function formatSlot(slot: MilkerTrainingSlot): string {
  const start = new Date(slot.start)
  const length =
    typeof slot.lengthHours === 'number'
      ? ` (${formatLength(slot.lengthHours)})`
      : ''
  return `${dayFormat.format(start)} · ${timeFormat.format(start)}${length}`
}

/** Slots that start after `now`, earliest first. */
export function upcomingSlots(
  slots: MilkerTrainingSlot[] | null | undefined,
  now: Date = new Date()
): MilkerTrainingSlot[] {
  return (slots ?? [])
    .filter((slot) => new Date(slot.start).getTime() > now.getTime())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
}
