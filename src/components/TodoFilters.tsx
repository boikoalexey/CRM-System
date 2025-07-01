import type { Filter } from '../types'
import { Button } from 'antd'

type Props = {
  current: Filter
  onChange: (filter: Filter) => void
  counts?: {
    all?: number
    inWork?: number
    completed?: number
  }
}

export function TodoFilters({ current, onChange, counts }: Props) {
  const filters = [
    { key: 'all', label: 'Все', count: counts?.all },
    { key: 'inWork', label: 'В работе', count: counts?.inWork },
    { key: 'completed', label: 'Сделано', count: counts?.completed },
  ] as const

  return (
    <div className="status-filters-wrapper">
      {filters.map(({ key, label, count }) => (
        <Button
          key={key}
          onClick={() => onChange(key)}
          variant="link"
          color={current === key ? 'primary' : 'default'}
        >
          {label} ({count ?? '-'})
        </Button>
      ))}
    </div>
  )
}