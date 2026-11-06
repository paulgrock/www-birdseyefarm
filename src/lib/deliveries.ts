import type { DeliveriesPage, DeliveryItem } from '../types/sanity'

/**
 * Parse a legacy text option like "Now-and-Then Eggs ($8/doz)" into an item.
 * Options without a "($price/unit)" suffix get no price.
 */
export function parseLegacyOption(option: string, index: number): DeliveryItem {
  const match = option.match(
    /^(.*?)\s*\(\$(\d+(?:\.\d{1,2})?)\s*(?:\/\s*([^)]+))?\)\s*$/
  )
  if (!match) {
    return { _key: `legacy-${index}`, name: option.trim(), price: null }
  }
  return {
    _key: `legacy-${index}`,
    name: match[1].trim(),
    price: Number(match[2]),
    unit: match[3]?.trim(),
  }
}

/** Structured items if present, otherwise items parsed from the old text options. */
export function getDeliveryItems(page: DeliveriesPage | null): DeliveryItem[] {
  if (page?.items && page.items.length > 0) return page.items
  return (page?.options ?? [])
    .filter((option) => option.trim().toLowerCase() !== 'other')
    .map(parseLegacyOption)
}

export function formatPrice(price: number): string {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`
}
