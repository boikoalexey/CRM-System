export function validateTitle(title: string): string | null {
  const trimmed = title.trim()

  if (trimmed === '') {
    return 'Это поле не может быть пустым'
  }

  if (trimmed.length < 2) {
    return 'Минимальная длина текста — 2 символа'
  }

  if (trimmed.length > 64) {
    return 'Максимальная длина текста — 64 символа'
  }

  return null
}