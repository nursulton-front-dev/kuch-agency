import { cn } from '@/lib/utils'
test('cn joins truthy classes and dedupes falsy', () => {
  expect(cn('a', false && 'b', 'c', undefined)).toBe('a c')
})
